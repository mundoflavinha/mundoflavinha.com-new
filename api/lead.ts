import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";
import {
  FAIXA_ETARIA_VALUES,
  PERFIL_VALUES,
  getConsentTexts,
  type AcaoConsentimento,
  type Finalidade,
} from "../src/lib/consent";

const sql = neon(process.env.DATABASE_URL!);

/** Sem pepper o hash de um IPv4 é reversível por força bruta em segundos. */
const PEPPER = process.env.THROTTLE_PEPPER ?? "mundoflavinha-sem-pepper";

const JANELA_SEGUNDOS = 600; // 10 min
const LIMITE_POR_IP = 8;
const LIMITE_POR_EMAIL = 3;

const MIN_PREENCHIMENTO_MS = 2_000;
const MAX_PREENCHIMENTO_MS = 12 * 60 * 60 * 1000;

const ORIGENS = ["lead_magnet", "newsletter_full", "newsletter_compact"] as const;

const baseSchema = z.object({
  consentVersion: z.string().trim().min(1).max(20),
  email: z.string().trim().toLowerCase().email().max(254),
  nome: z.string().trim().min(1).max(200).optional(),
  whatsapp: z.string().trim().min(8).max(30).optional(),
  optInEmail: z.boolean(),
  optInWhatsapp: z.boolean(),
  path: z.string().trim().max(200).optional(),
  /** Honeypot: campo escondido. Qualquer conteúdo reprova. */
  hp: z.string().max(0).optional(),
  /** Tempo decorrido desde a renderização do formulário. Relativo, imune a relógio errado. */
  elapsedMs: z.number().int().nonnegative().optional(),
  faixaEtaria: z.enum(FAIXA_ETARIA_VALUES as unknown as [string, ...string[]]).optional(),
  perfil: z.enum(PERFIL_VALUES as unknown as [string, ...string[]]).optional(),
});

const newsletterSchema = baseSchema.extend({
  type: z.literal("newsletter"),
  origem: z.enum(["newsletter_full", "newsletter_compact"]),
});

const leadMagnetSchema = baseSchema.extend({
  type: z.literal("lead_magnet"),
  nome: z.string().trim().min(1).max(200),
  material: z.string().trim().min(1).max(200),
  origem: z.literal("lead_magnet"),
});

const payloadSchema = z
  .discriminatedUnion("type", [newsletterSchema, leadMagnetSchema])
  .refine((data) => !data.optInWhatsapp || !!data.whatsapp, {
    message: "optInWhatsapp exige whatsapp preenchido",
  });

/**
 * Shape antigo, aceito por UMA release.
 * Motivo: front e API sobem juntos, mas uma aba aberta há 20 minutos ainda tem
 * o bundle velho. Sem isso, esse envio vira 400 e o lead se perde em silêncio.
 * `idadeCrianca` é intencionalmente DESCARTADO — é justamente o dado que a
 * issue #3 mandou parar de coletar.
 */
const legacySchema = z.object({
  type: z.enum(["newsletter", "lead_magnet"]),
  nome: z.string().trim().max(200).optional(),
  email: z.string().trim().toLowerCase().email().max(254),
  whatsapp: z.string().trim().max(30).optional(),
  material: z.string().trim().max(200).optional(),
  consentimento: z.boolean().optional(),
});

type EventoConsentimento = { finalidade: Finalidade; acao: AcaoConsentimento; texto: string };

const hashBucket = (prefixo: string, valor: string) =>
  `${prefixo}:${createHash("sha256").update(`${PEPPER}:${valor}`).digest("hex").slice(0, 32)}`;

const getIp = (req: VercelRequest): string | null => {
  const real = req.headers["x-real-ip"];
  if (typeof real === "string" && real.trim()) return real.trim();

  const forwarded = req.headers["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const first = raw?.split(",")[0]?.trim();
  return first || null;
};

const originPermitida = (req: VercelRequest): boolean => {
  const origin = req.headers.origin || req.headers.referer;
  // Chamadas server-to-server e curl não mandam Origin; não é sinal de ataque
  // por si só, e as demais camadas (honeypot, throttle, Zod) seguem valendo.
  if (!origin) return true;

  try {
    const { hostname } = new URL(origin);
    return (
      hostname === "mundoflavinha.com" ||
      hostname === "www.mundoflavinha.com" ||
      hostname.endsWith(".vercel.app") ||
      hostname === "localhost" ||
      hostname === "127.0.0.1"
    );
  } catch {
    return false;
  }
};

/** Sucesso falso: o bot não aprende que foi barrado e não tenta variar a tática. */
const sucessoSilencioso = (res: VercelResponse) => res.status(201).json({ ok: true });

async function estourouLimite(ip: string | null, email: string): Promise<boolean> {
  const buckets = [hashBucket("email", email)];
  if (ip) buckets.push(hashBucket("ip", ip));

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
async function purgarThrottleEventualmente() {
  if (Math.random() > 0.02) return;
  try {
    await sql`delete from request_throttle where janela_inicio < now() - interval '2 hours'`;
  } catch (err) {
    console.error("purga do throttle falhou", err);
  }
}

async function gravar(params: {
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
}) {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // --- Checagens baratas primeiro: nada aqui toca o banco. ---
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!originPermitida(req)) {
    return res.status(403).json({ error: "Origem não permitida" });
  }

  const parsed = payloadSchema.safeParse(req.body);

  if (!parsed.success) {
    const legacy = legacySchema.safeParse(req.body);
    if (!legacy.success) {
      return res.status(400).json({ error: "Dados inválidos" });
    }
    return handleLegacy(req, res, legacy.data);
  }

  const data = parsed.data;

  // Honeypot preenchido ou preenchimento rápido/velho demais: sucesso falso.
  if (data.hp) return sucessoSilencioso(res);
  if (
    data.elapsedMs !== undefined &&
    (data.elapsedMs < MIN_PREENCHIMENTO_MS || data.elapsedMs > MAX_PREENCHIMENTO_MS)
  ) {
    return sucessoSilencioso(res);
  }

  const textos = getConsentTexts(data.consentVersion);
  if (!textos) {
    return res.status(400).json({ error: "Versão de consentimento desconhecida" });
  }

  // --- A partir daqui há I/O. ---
  const ip = getIp(req);
  const userAgent = typeof req.headers["user-agent"] === "string" ? req.headers["user-agent"] : null;

  try {
    if (await estourouLimite(ip, data.email)) {
      return res.status(429).json({ error: "Muitas tentativas. Tente novamente em alguns minutos." });
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

    await gravar({
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

    await purgarThrottleEventualmente();
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("falha ao gravar lead", err);
    return res.status(500).json({ error: "Não foi possível salvar seus dados. Tente novamente." });
  }
}

async function handleLegacy(
  req: VercelRequest,
  res: VercelResponse,
  data: z.infer<typeof legacySchema>,
) {
  const ip = getIp(req);
  const userAgent = typeof req.headers["user-agent"] === "string" ? req.headers["user-agent"] : null;

  try {
    if (await estourouLimite(ip, data.email)) {
      return res.status(429).json({ error: "Muitas tentativas. Tente novamente em alguns minutos." });
    }

    await gravar({
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

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("falha ao gravar lead (legado)", err);
    return res.status(500).json({ error: "Não foi possível salvar seus dados. Tente novamente." });
  }
}
