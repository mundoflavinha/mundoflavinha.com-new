export type { ChannelVideo, ChannelVideosResult } from "./youtubeFetcher";
import type { ChannelVideosResult } from "./youtubeFetcher";

/**
 * A busca de verdade (chamadas ao YouTube, com a chave da API) roda em
 * api/videos.ts, no servidor — nunca aqui. Este arquivo só chama o próprio
 * domínio. Ver issue #4: a chave já esteve embutida no bundle público porque
 * este código antes lia `import.meta.env.VITE_YOUTUBE_API_KEY` e chamava
 * googleapis.com direto do navegador.
 */
export const getChannelVideos = async (): Promise<ChannelVideosResult> => {
  const response = await fetch("/api/videos");

  if (!response.ok) {
    throw new Error("Não foi possível carregar os vídeos do YouTube.");
  }

  return response.json();
};
