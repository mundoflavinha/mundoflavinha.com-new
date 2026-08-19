import type { PagesFunction } from "@cloudflare/workers-types";
// Extensão .js explícita: ver comentário equivalente em functions/api/lead.ts.
import { fetchChannelVideos } from "../../src/lib/youtubeFetcher.js";

interface Env {
  YOUTUBE_API_KEY: string;
  YOUTUBE_CHANNEL_ID?: string;
  YOUTUBE_HANDLE?: string;
  YOUTUBE_MAX_RESULTS?: string;
}

const json = (body: unknown, status: number, extraHeaders?: Record<string, string>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method !== "GET") {
    return json({ error: "Method not allowed" }, 405, { Allow: "GET" });
  }
  return onRequestGet(context);
};

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const apiKey = env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.error("YOUTUBE_API_KEY não configurada");
    return json({ error: "Não foi possível carregar os vídeos." }, 500);
  }

  try {
    const data = await fetchChannelVideos({
      apiKey,
      channelId: env.YOUTUBE_CHANNEL_ID,
      handle: env.YOUTUBE_HANDLE || "mundoflavinha",
      maxResults: Number(env.YOUTUBE_MAX_RESULTS) || Infinity,
    });

    // Cache na CDN da Cloudflare: a maioria das visitas nem chega a chamar o
    // YouTube. Resolve cota/custo (o motivo original da issue #4) e reduz o
    // risco de timeout da function numa janela sem cache — o pipeline
    // encadeia várias chamadas (canal -> playlists -> itens de cada playlist).
    return json(data, 200, { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" });
  } catch (err) {
    console.error("falha ao buscar vídeos do YouTube", err);
    return json({ error: "Não foi possível carregar os vídeos." }, 502);
  }
};
