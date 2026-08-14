import type { VercelRequest, VercelResponse } from "@vercel/node";
// Extensão .js explícita: ver comentário equivalente em api/lead.ts.
import { fetchChannelVideos } from "../src/lib/youtubeFetcher.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.error("YOUTUBE_API_KEY não configurada");
    return res.status(500).json({ error: "Não foi possível carregar os vídeos." });
  }

  try {
    const data = await fetchChannelVideos({
      apiKey,
      channelId: process.env.YOUTUBE_CHANNEL_ID,
      handle: process.env.YOUTUBE_HANDLE || "mundoflavinha",
      maxResults: Number(process.env.YOUTUBE_MAX_RESULTS) || Infinity,
    });

    // Cache na CDN da Vercel: a maioria das visitas nem chega a chamar o
    // YouTube. Resolve cota/custo (o motivo original da issue #4) e reduz o
    // risco de timeout da function numa janela sem cache — o pipeline
    // encadeia várias chamadas (canal -> playlists -> itens de cada playlist).
    res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=3600");
    return res.status(200).json(data);
  } catch (err) {
    console.error("falha ao buscar vídeos do YouTube", err);
    return res.status(502).json({ error: "Não foi possível carregar os vídeos." });
  }
}
