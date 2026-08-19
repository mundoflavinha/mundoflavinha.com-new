import type { PagesFunction } from "@cloudflare/workers-types";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type { z } from "zod";
import {
  getConsentTexts,
  type AcaoConsentimento,
  type Finalidade,
  // Extensão .js explícita: package.json tem "type": "module", e sob ESM
  // nativo do Node/Workers um import relativo sem extensão falha com
  // ERR_MODULE_NOT_FOUND (é o arquivo compilado .js que existe em runtime,
  // mesmo a fonte sendo .ts — convenção padrão de projeto ESM/NodeNext).
} from "../../src/lib/consent.js";
import { payloadSchema, legacySchema } from "../../src/lib/leadSchema.js";

interface Env {
  DATABASE_URL: string;
  THROTTLE_PEPPER?: string;
}

// Instanciado explicitamente: `ReturnType<typeof neon>` sobre uma função
// genérica não instanciada resolve para os CONSTRAINTS dos type params
// (`NeonQueryFunction<boolean, boolean>`), não para os defaults (`false,
// false`) — e o `sql` de verdade, criado com `neon(url)` dentro do handler,
// vem tipado `<false, false>`. Passar um nos parâmetros do outro quebra por
// causa do método `transaction` (contravariante nos type params).
type Sql = NeonQueryFunction<false, false>;

/** Sem pepper o hash de um IPv4 é reversível por força bruta em segundos. */
const JANELA_SEGUNDOS = 600; // 10 min
const LIMITE_POR_IP = 8;
const LIMITE_POR_EMAIL = 3;

const MIN_PREENCHIMENTO_MS = 2_000;
const MAX_PREENCHIMENTO_MS = 12 * 60 * 60 * 1000;

type EventoConsentimento = { finalidade: Finalidade; acao: AcaoConsentimento; texto: string };

/**
 * Web Crypto (`crypto.subtle`), não `node:crypto`: é global nativo do runtime
 * de Workers, sem exigir a flag `nodejs_compat` nem puxar os tipos globais do
 * Node (que colidiriam com Request/Response de @cloudflare/workers-types —
 * ver tsconfig.functions.json). Mesmo algoritmo (SHA-256 de `pepper:valor`,
 * hex, primeiros 32 chars): saída idêntica à versão anterior.
 */
const hashBucket = async (pepper: string, prefixo: string, valor: string) => {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${pepper}:${valor}`));
  const hex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${prefixo}:${hex.slice(0, 32)}`;
};

const getIp = (request: Request): string | null => {
  // CF-Connecting-IP é o cabeçalho que a própria Cloudflare garante conter o
  // IP real do visitante — não pode ser forjado pelo cliente. Os outros dois
  // seguem como fallback (útil rodando fora da borda da Cloudflare).
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();

  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || null;
};

const originPermitida = (request: Request): boolean => {
  const origin = request.headers.get("origin") || request.headers.get("referer");
  // Chamadas server-to-server e curl não mandam Origin; não é sinal de ataque
  // por si só, e as demais camadas (honeypot, throttle, Zod) seguem valendo.
  if (!origin) return true;

  try {
    const { hostname } = new URL(origin);
    return (
      hostname === "mundoflavinha.com" ||
      hostname === "www.mundoflavinha.com" ||
      hostname.endsWith(".pages.dev") ||
      hostname === "localhost" ||
      hostname === "127.0.0.1"
    );
  } catch {
    return false;
  }
};

const json = (body: unknown, status: number, extraHeaders?: Record<string, string>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });

/** Sucesso falso: o bot não aprende que foi barrado e não tenta variar a tática. */
const sucessoSilencioso = () => json({ ok: true }, 201);

async function estourouLimite(sql: Sql, pepper: string, ip: string | null, email: string): Promise<boolean> {
  const buckets = [await hashBucket(pepper, "email", email)];
  if (ip) buckets.push(await hashBucket(pepper, "ip", ip));

  // jsonb em vez de text[]: não depende de como o driver HTTP do Neon
  // serializa um array JS para tipo array do Postgres.
  const rows = (await sql`
    insert into request_throttle (bucket, janela_inicio, hits)
    select
      b,
      to_timestamp(floor(extract(epoch from now()) / ${JANELA_SEGUNDOS}) * ${JANELA_SEGUNDOS}),
      1
    from jsonb_array_elements_text(${JSON.stringify(buckets)}::jsonb) as b
    on conflict (bucket, janela_inicio)
      do update set hits = request_throttle.hits + 1
    returning bucket, hits
  `) as Array<{ bucket: string; hits: number }>;

  return rows.some(
    (row) =>
      (row.bucket.startsWith("ip:") && row.hits > LIMITE_POR_IP) ||
      (row.bucket.startsWith("email:") && row.hits > LIMITE_POR_EMAIL),
  );
}

/** Purga oportunista: evita criar um cron job e mais um segredo só para isso. */
async function purgarThrottleEventualmente(sql: Sql) {
  if (Math.random() > 0.02) return;
  try {
    await sql`delete from request_throttle where janela_inicio < now() - interval '2 hours'`;
  } catch (err) {
    console.error("purga do throttle falhou", err);
  }
}

async function gravar(
  sql: Sql,
  params: {
    email: string;
    nome: string | null;
    whatsapp: string | null;
    faixaEtaria: string | null;
    perfil: string | null;
    optInEmail: boolean;
    optInWhatsapp: boolean;
    eventos: EventoConsentimento[];
    versao: string;
    origem: string;
    material: string | null;
    ip: string | null;
    userAgent: string | null;
  },
) {
  const {
    email,
    nome,
    whatsapp,
    faixaEtaria,
    perfil,
    optInEmail,
    optInWhatsapp,
    eventos,
    versao,
    origem,
    material,
    ip,
    userAgent,
  } = params;

  const eventosJson = JSON.stringify(eventos);

  // CTE gravante: o driver HTTP do Neon não abre transação interativa, então não
  // dá para pegar o id num INSERT e usar noutro statement de forma atômica.
  // CTEs gravantes sempre executam, mesmo quando não referenciadas pela query final.
  if (material) {
    await sql`
      with c as (
        insert into contacts (email, nome, whatsapp, faixa_etaria, perfil,
                              opt_in_email, opt_in_email_em, opt_in_whatsapp, opt_in_whatsapp_em)
        values (${email}, ${nome}, ${whatsapp}, ${faixaEtaria}, ${perfil},
                ${optInEmail}, case when ${optInEmail} then now() end,
                ${optInWhatsapp}, case when ${optInWhatsapp} then now() end)
        on conflict (email) do update set
          nome = coalesce(excluded.nome, contacts.nome),
          whatsapp = coalesce(excluded.whatsapp, contacts.whatsapp),
          faixa_etaria = coalesce(excluded.faixa_etaria, contacts.faixa_etaria),
          perfil = coalesce(excluded.perfil, contacts.perfil),
          opt_in_email = contacts.opt_in_email or excluded.opt_in_email,
          opt_in_whatsapp = contacts.opt_in_whatsapp or excluded.opt_in_whatsapp,
          opt_in_email_em = case when excluded.opt_in_email and not contacts.opt_in_email
                                 then now() else contacts.opt_in_email_em end,
          opt_in_whatsapp_em = case when excluded.opt_in_whatsapp and not contacts.opt_in_whatsapp
                                    then now() else contacts.opt_in_whatsapp_em end,
          updated_at = now()
        returning id
      ),
      ev as (
        insert into consent_events (contact_id, finalidade, acao, versao, texto, origem, ip, user_agent)
        select c.id, e.finalidade, e.acao, ${versao}, e.texto, ${origem}, ${ip}::inet, ${userAgent}
        from c, jsonb_to_recordset(${eventosJson}::jsonb)
          as e(finalidade text, acao text, texto text)
      )
      insert into material_requests (contact_id, material, origem)
      select c.id, ${material}, ${origem} from c
    `;
    return;
  }

  await sql`
    with c as (
      insert into contacts (email, nome, whatsapp, faixa_etaria, perfil,
                            opt_in_email, opt_in_email_em, opt_in_whatsapp, opt_in_whatsapp_em)
      values (${email}, ${nome}, ${whatsapp}, ${faixaEtaria}, ${perfil},
              ${optInEmail}, case when ${optInEmail} then now() end,
              ${optInWhatsapp}, case when ${optInWhatsapp} then now() end)
      on conflict (email) do update set
        nome = coalesce(excluded.nome, contacts.nome),
        whatsapp = coalesce(excluded.whatsapp, contacts.whatsapp),
        faixa_etaria = coalesce(excluded.faixa_etaria, contacts.faixa_etaria),
        perfil = coalesce(excluded.perfil, contacts.perfil),
        opt_in_email = contacts.opt_in_email or excluded.opt_in_email,
        opt_in_whatsapp = contacts.opt_in_whatsapp or excluded.opt_in_whatsapp,
        opt_in_email_em = case when excluded.opt_in_email and not contacts.opt_in_email
                               then now() else contacts.opt_in_email_em end,
        opt_in_whatsapp_em = case when excluded.opt_in_whatsapp and not contacts.opt_in_whatsapp
                                  then now() else contacts.opt_in_whatsapp_em end,
        updated_at = now()
      returning id
    )
    insert into consent_events (contact_id, finalidade, acao, versao, texto, origem, ip, user_agent)
    select c.id, e.finalidade, e.acao, ${versao}, e.texto, ${origem}, ${ip}::inet, ${userAgent}
    from c, jsonb_to_recordset(${eventosJson}::jsonb)
      as e(finalidade text, acao text, texto text)
  `;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
  }
  return onRequestPost(context);
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!originPermitida(request)) {
    return json({ error: "Origem não permitida" }, 403);
  }

  // JSON malformado ou corpo ausente cai no mesmo "Dados inválidos" que um
  // payload que não bate com o schema — o Zod já cobria isso quando o corpo
  // vinha pronto de req.body; aqui o parse pode lançar antes de chegar lá.
  const body = await request
    .json()
    .catch(() => undefined);

  // `neon()` lança SÍNCRONO (não só na primeira query) quando a connection
  // string está ausente ou malformada — sem o try/catch aqui, isso escapava
  // como exceção não tratada e o Worker devolvia stack trace bruto ao
  // cliente em vez do JSON de erro padrão do resto deste endpoint.
  let sql: Sql;
  try {
    sql = neon(env.DATABASE_URL);
  } catch (err) {
    console.error("falha ao criar cliente Neon", err);
    return json({ error: "Não foi possível salvar seus dados. Tente novamente." }, 500);
  }
  const pepper = env.THROTTLE_PEPPER ?? "mundoflavinha-sem-pepper";

  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    const legacy = legacySchema.safeParse(body);
    if (!legacy.success) {
      return json({ error: "Dados inválidos" }, 400);
    }
    return handleLegacy(request, sql, pepper, legacy.data);
  }

  const data = parsed.data;

  // Honeypot preenchido ou preenchimento rápido/velho demais: sucesso falso.
  if (data.hp) return sucessoSilencioso();
  if (
    data.elapsedMs !== undefined &&
    (data.elapsedMs < MIN_PREENCHIMENTO_MS || data.elapsedMs > MAX_PREENCHIMENTO_MS)
  ) {
    return sucessoSilencioso();
  }

  const textos = getConsentTexts(data.consentVersion);
  if (!textos) {
    return json({ error: "Versão de consentimento desconhecida" }, 400);
  }

  // --- A partir daqui há I/O. ---
  const ip = getIp(request);
  const userAgent = request.headers.get("user-agent");

  try {
    if (await estourouLimite(sql, pepper, ip, data.email)) {
      return json({ error: "Muitas tentativas. Tente novamente em alguns minutos." }, 429);
    }

    const eventos: EventoConsentimento[] = [];

    if (data.type === "lead_magnet") {
      eventos.push({ finalidade: "entrega_material", acao: "concedido", texto: textos.entrega_material });
      eventos.push({
        finalidade: "email_marketing",
        acao: data.optInEmail ? "concedido" : "negado",
        texto: textos.email_marketing,
      });
    } else {
      eventos.push({
        finalidade: "email_marketing",
        acao: data.optInEmail ? "concedido" : "negado",
        texto: data.origem === "newsletter_compact" ? textos.newsletter_compact : textos.email_marketing,
      });
    }

    // Só registra a decisão sobre WhatsApp se a caixa chegou a ser exibida.
    if (data.whatsapp) {
      eventos.push({
        finalidade: "whatsapp_marketing",
        acao: data.optInWhatsapp ? "concedido" : "negado",
        texto: textos.whatsapp_marketing,
      });
    }

    await gravar(sql, {
      email: data.email,
      nome: data.nome ?? null,
      whatsapp: data.whatsapp ?? null,
      faixaEtaria: data.faixaEtaria ?? null,
      perfil: data.perfil ?? null,
      optInEmail: data.optInEmail,
      optInWhatsapp: data.optInWhatsapp,
      eventos,
      versao: data.consentVersion,
      origem: data.path ? `${data.origem}:${data.path}` : data.origem,
      material: data.type === "lead_magnet" ? data.material : null,
      ip,
      userAgent,
    });

    await purgarThrottleEventualmente(sql);
    return json({ ok: true }, 201);
  } catch (err) {
    console.error("falha ao gravar lead", err);
    return json({ error: "Não foi possível salvar seus dados. Tente novamente." }, 500);
  }
};

async function handleLegacy(request: Request, sql: Sql, pepper: string, data: z.infer<typeof legacySchema>) {
  const ip = getIp(request);
  const userAgent = request.headers.get("user-agent");

  try {
    if (await estourouLimite(sql, pepper, ip, data.email)) {
      return json({ error: "Muitas tentativas. Tente novamente em alguns minutos." }, 429);
    }

    await gravar(sql, {
      email: data.email,
      nome: data.nome ?? null,
      whatsapp: data.whatsapp ?? null,
      faixaEtaria: null,
      perfil: null,
      optInEmail: true,
      optInWhatsapp: false,
      eventos: [
        {
          finalidade: "email_marketing",
          acao: "concedido",
          texto:
            "[registro legado] Formulário enviado antes da atualização de consentimento; texto exibido não foi capturado.",
        },
      ],
      versao: "pre-lgpd",
      origem: "legacy",
      material: data.type === "lead_magnet" ? (data.material ?? "desconhecido") : null,
      ip,
      userAgent,
    });

    return json({ ok: true }, 201);
  } catch (err) {
    console.error("falha ao gravar lead (legado)", err);
    return json({ error: "Não foi possível salvar seus dados. Tente novamente." }, 500);
  }
}
