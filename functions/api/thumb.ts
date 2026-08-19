import type { PagesFunction } from "@cloudflare/workers-types";

/**
 * Serve a miniatura de um vídeo do YouTube pelo NOSSO domínio.
 *
 * Por que existe: `/api/videos` devolvia `thumbnailUrl` apontando direto para
 * `i.ytimg.com`, então o navegador de quem abrisse /videos baixava as imagens
 * do Google — entregando IP, user-agent e Referer — antes de qualquer clique ou
 * aceite. O facade do player não cobria isso: ele adia o iframe, não as
 * miniaturas. `loading="lazy"` também não resolve; só posterga o que está
 * abaixo da dobra.
 *
 * O que este handler NÃO faz, de propósito:
 *
 *   - não aceita URL do cliente. Recebe só o ID do vídeo e monta o upstream a
 *     partir de uma constante. Aceitar URL transformaria isto num proxy aberto,
 *     útil para mascarar tráfego de terceiros atrás do nosso domínio;
 *   - não repassa cookies, cabeçalhos nem query do visitante ao Google;
 *   - não devolve o que não for imagem, nem acima do limite de tamanho.
 */

/** IDs do YouTube são 11 caracteres de base64url. Estreito de propósito. */
const ID_VALIDO = /^[A-Za-z0-9_-]{11}$/;

/** Do maior para o menor: nem todo vídeo tem maxres. */
const QUALIDADES = ["maxresdefault", "hqdefault", "mqdefault", "default"] as const;

const TAMANHO_MAXIMO_BYTES = 2 * 1024 * 1024;
const TIMEOUT_MS = 5_000;

const json = (body: unknown, status: number, extraHeaders?: Record<string, string>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });

const buscarUpstream = async (id: string) => {
  for (const qualidade of QUALIDADES) {
    const controle = new AbortController();
    const alarme = setTimeout(() => controle.abort(), TIMEOUT_MS);
    try {
      const resposta = await fetch(`https://i.ytimg.com/vi/${id}/${qualidade}.jpg`, {
        signal: controle.signal,
        // Sem credenciais e sem Referer: o Google não deve receber nada do
        // visitante através desta ponte, só o pedido do nosso servidor.
        redirect: "follow",
      });
      if (!resposta.ok) continue;

      const tipo = resposta.headers.get("content-type") ?? "";
      if (!tipo.startsWith("image/")) continue;

      const tamanho = Number(resposta.headers.get("content-length") ?? "0");
      if (tamanho > TAMANHO_MAXIMO_BYTES) continue;

      const bytes = await resposta.arrayBuffer();
      // O YouTube devolve 200 com um placeholder cinza de 120x90 quando a
      // qualidade pedida não existe. O corte por tamanho o descarta e cai para
      // a próxima qualidade.
      if (bytes.byteLength > TAMANHO_MAXIMO_BYTES || bytes.byteLength < 1024) continue;

      return { bytes, tipo };
    } catch {
      continue;
    } finally {
      clearTimeout(alarme);
    }
  }
  return null;
};

export const onRequest: PagesFunction = async (context) => {
  if (context.request.method !== "GET") {
    return json({ error: "Method not allowed" }, 405, { Allow: "GET" });
  }
  return onRequestGet(context);
};

export const onRequestGet: PagesFunction = async ({ request }) => {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!ID_VALIDO.test(id)) {
    return json({ error: "id inválido" }, 400);
  }

  const imagem = await buscarUpstream(id);
  if (!imagem) {
    return json({ error: "Não foi possível carregar a miniatura." }, 502);
  }

  // Miniatura de vídeo publicado praticamente não muda. Cache longo na CDN faz
  // a maioria das visitas nem chegar a esta função — o custo de banda e
  // invocação fica restrito ao primeiro acesso de cada vídeo.
  return new Response(imagem.bytes, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=86400, max-age=3600",
      "Content-Type": imagem.tipo,
    },
  });
};
