export type { ChannelVideo, ChannelVideosResult } from "./youtubeFetcher";
import type { ChannelVideo, ChannelVideosResult } from "./youtubeFetcher";

/**
 * A busca de verdade (chamadas ao YouTube, com a chave da API) roda em
 * functions/api/videos.ts, no servidor — nunca aqui. Este arquivo só chama o
 * próprio domínio. Ver issue #4: a chave já esteve embutida no bundle público
 * porque este código antes lia `import.meta.env.VITE_YOUTUBE_API_KEY` e
 * chamava googleapis.com direto do navegador.
 */

/** IDs do YouTube são 11 caracteres de base64url. */
const ID_VALIDO = /^[A-Za-z0-9_-]{11}$/;

const ehVideo = (valor: unknown): valor is ChannelVideo => {
  if (typeof valor !== "object" || valor === null) return false;
  const v = valor as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    ID_VALIDO.test(v.id) &&
    typeof v.title === "string" &&
    typeof v.publishedAt === "string" &&
    Array.isArray(v.categories) &&
    v.categories.every((c) => typeof c === "string")
  );
};

const ehResposta = (valor: unknown): valor is ChannelVideosResult => {
  if (typeof valor !== "object" || valor === null) return false;
  const v = valor as Record<string, unknown>;
  return (
    Array.isArray(v.videos) &&
    v.videos.every(ehVideo) &&
    Array.isArray(v.categories) &&
    v.categories.every((c) => typeof c === "string")
  );
};

/**
 * Busca e VALIDA a resposta de `/api/videos`.
 *
 * JSON vindo da rede é dado não confiável, mesmo vindo do nosso próprio
 * endpoint — o tipo TypeScript da function some em runtime. Quem chama esta
 * função recebe um `ChannelVideosResult` de verdade ou uma exceção, nunca um
 * objeto com o shape errado passando despercebido.
 */
export const getChannelVideos = async (signal?: AbortSignal): Promise<ChannelVideosResult> => {
  const resposta = await fetch("/api/videos", { signal });

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os vídeos do YouTube.");
  }

  const json: unknown = await resposta.json();
  if (!ehResposta(json)) {
    throw new Error("A resposta do servidor veio em formato inesperado.");
  }

  return json;
};
