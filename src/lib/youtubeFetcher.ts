/**
 * Pipeline de busca de vídeos do canal — channels.list → playlists.list →
 * playlistItems.list. TypeScript puro, sem `import.meta.env`, sem imports de
 * React: precisa ser importável tanto do bundle do Vite quanto de `api/`
 * (function serverless), do mesmo jeito que `src/lib/consent.ts` já é hoje.
 *
 * A chave da API NUNCA deve ser lida aqui — quem chama passa em `config.apiKey`.
 * Ler diretamente de `import.meta.env.VITE_*` embutiria a chave no bundle
 * público de novo, que é exatamente o problema que este arquivo resolve.
 */

const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";

/**
 * Orçamento de SUBREQUISIÇÕES, não de vídeos.
 *
 * Cloudflare Workers/Pages Functions no plano Free limitam a 50 subrequests
 * por invocação. Este pipeline faz 1 chamada por página de 50 itens da
 * playlist de uploads, MAIS 1 chamada por página de playlists do canal, MAIS
 * 1 chamada POR PLAYLIST (para montar as categorias) — sem limite, isso
 * cresce junto com o canal. Foi exatamente isso que aconteceu: o canal cresceu
 * (mais vídeos = mais páginas de upload; mais playlists = mais categorias) até
 * passar de 50 chamadas nesta função específica, e só nesta — `/api/thumb` e
 * `/api/lead`, que não têm esse padrão de leque, continuaram respondendo
 * normalmente. O sintoma foi um 502 genérico da borda da Cloudflare, não um
 * erro do nosso `catch` (que devolve JSON) — a função estourou o limite antes
 * do nosso próprio tratamento de erro entrar em ação.
 *
 * A defesa é um orçamento COMPARTILHADO entre todas as chamadas desta
 * invocação: cada uma decrementa o mesmo contador, e quem for chamar de novo
 * confere antes se ainda sobra saldo. Ao esgotar, a função para de pedir mais
 * — sem lançar erro — e devolve o que já tem. Prioridade succeeds: os vídeos
 * (a lista em si) são buscados ANTES das categorias, então um canal grande
 * degrada primeiro as categorias (menos playlists cobertas, "Todos" sempre
 * presente) e só depois, num caso bem mais extremo, a lista de vídeos.
 */
export const ORCAMENTO_PADRAO_SUBREQUISICOES = 40;

const criarOrcamento = (limite: number) => {
  let restante = limite;
  return {
    podeChamar: () => restante > 0,
    consumir: () => {
      restante -= 1;
    },
  };
};

type Orcamento = ReturnType<typeof criarOrcamento>;

type YouTubeThumbnail = {
  url: string;
  width?: number;
  height?: number;
};

type YouTubeSnippet = {
  title: string;
  description?: string;
  publishedAt: string;
  channelTitle?: string;
  thumbnails: {
    default?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
    standard?: YouTubeThumbnail;
    maxres?: YouTubeThumbnail;
  };
  resourceId?: {
    videoId?: string;
  };
};

type YouTubeChannelResponse = {
  items?: Array<{
    id: string;
    contentDetails: {
      relatedPlaylists: {
        uploads: string;
      };
    };
  }>;
};

type YouTubePlaylistResponse = {
  nextPageToken?: string;
  items?: Array<{
    id: string;
    snippet: {
      title: string;
    };
  }>;
};

type YouTubePlaylistItemsResponse = {
  nextPageToken?: string;
  items?: Array<{
    contentDetails?: {
      videoId?: string;
      videoPublishedAt?: string;
    };
    snippet: YouTubeSnippet;
  }>;
};

export type ChannelVideo = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  url: string;
  embedUrl: string;
  categories: string[];
};

export type ChannelVideosResult = {
  categories: string[];
  videos: ChannelVideo[];
};

export type YouTubeFetchConfig = {
  apiKey: string;
  channelId?: string;
  handle: string;
  maxResults: number;
};

const requestYouTube = async <T>(
  path: string,
  params: Record<string, string | number>,
  orcamento: Orcamento,
): Promise<T | null> => {
  if (!orcamento.podeChamar()) {
    return null;
  }
  orcamento.consumir();

  const url = new URL(`${YOUTUBE_API_BASE_URL}/${path}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    // Corpo do erro do Google ajuda a diferenciar chave inválida de
    // parâmetro inválido de canal/quota — ambos batem como HTTP 400/403.
    const bodyText = await response.text().catch(() => "");
    throw new Error(`YouTube API respondeu ${response.status} em ${path}: ${bodyText.slice(0, 300)}`);
  }

  return response.json() as Promise<T>;
};

const getChannelDetails = async (
  apiKey: string,
  channelId: string | undefined,
  handle: string,
  orcamento: Orcamento,
) => {
  // Tipado explicitamente porque a união dos dois objetos literais faz o TS
  // inferir `forHandle?: undefined` num ramo e `id?: undefined` no outro, o que
  // não casa com o Record<string, string | number> esperado.
  const params: Record<string, string | number> = channelId
    ? { part: "contentDetails", id: channelId, key: apiKey }
    : { part: "contentDetails", forHandle: handle, key: apiKey };

  // Sem orçamento nenhum, esta é a PRIMEIRA chamada da invocação — se ela não
  // couber, nada mais cabe também. É por isso que não checa `podeChamar()`
  // antes: se `orcamento` foi criado com limite > 0 (sempre é), esta chamada
  // sempre roda.
  const data = await requestYouTube<YouTubeChannelResponse>("channels", params, orcamento);
  const channel = data?.items?.[0];

  if (!channel) {
    throw new Error("Canal do YouTube não encontrado.");
  }

  return channel;
};

const getChannelPlaylists = async (apiKey: string, channelId: string, orcamento: Orcamento) => {
  const playlists: NonNullable<YouTubePlaylistResponse["items"]> = [];
  let pageToken: string | undefined;

  do {
    const data = await requestYouTube<YouTubePlaylistResponse>(
      "playlists",
      {
        part: "snippet",
        channelId,
        maxResults: 50,
        ...(pageToken ? { pageToken } : {}),
        key: apiKey,
      },
      orcamento,
    );

    if (!data) break; // orçamento esgotado no meio da paginação — para aqui, com o que já tem

    playlists.push(...(data.items || []));
    pageToken = data.nextPageToken;
  } while (pageToken && orcamento.podeChamar());

  return playlists;
};

const getPlaylistItems = async (apiKey: string, playlistId: string, maxResults: number, orcamento: Orcamento) => {
  const items: NonNullable<YouTubePlaylistItemsResponse["items"]> = [];
  let pageToken: string | undefined;

  do {
    const remainingResults = maxResults - items.length;
    const pageSize = Number.isFinite(maxResults) ? Math.min(50, remainingResults) : 50;

    if (pageSize <= 0) {
      break;
    }

    const data = await requestYouTube<YouTubePlaylistItemsResponse>(
      "playlistItems",
      {
        part: "snippet,contentDetails",
        playlistId,
        maxResults: pageSize,
        ...(pageToken ? { pageToken } : {}),
        key: apiKey,
      },
      orcamento,
    );

    if (!data) break; // orçamento esgotado no meio da paginação — para aqui, com o que já tem

    items.push(...(data.items || []));
    pageToken = data.nextPageToken;
  } while (pageToken && items.length < maxResults && orcamento.podeChamar());

  return items;
};

export const fetchChannelVideos = async (config: YouTubeFetchConfig): Promise<ChannelVideosResult> => {
  const { apiKey, channelId, handle, maxResults } = config;
  const orcamento = criarOrcamento(ORCAMENTO_PADRAO_SUBREQUISICOES);

  const channel = await getChannelDetails(apiKey, channelId, handle, orcamento);
  const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;

  /*
   * SEQUENCIAL, não Promise.all: os vídeos (uploadItems) importam mais que as
   * categorias — são o conteúdo em si, as categorias só organizam a galeria.
   * Buscando os vídeos primeiro, um canal grande o bastante para estourar o
   * orçamento perde categorias (playlists de menos, "Todos" continua valendo)
   * antes de perder vídeos. Em paralelo, os dois disputariam o mesmo
   * orçamento ao mesmo tempo e o resultado dependeria de timing de rede — não
   * dá pra garantir qual metade sobrevive.
   */
  const uploadItems = await getPlaylistItems(apiKey, uploadsPlaylistId, maxResults, orcamento);
  const playlists = orcamento.podeChamar() ? await getChannelPlaylists(apiKey, channel.id, orcamento) : [];

  const playlistItems = await Promise.all(
    playlists.map(async (playlist) => ({
      title: playlist.snippet.title,
      items: await getPlaylistItems(apiKey, playlist.id, 50, orcamento),
    })),
  );

  const categoriesByVideoId = new Map<string, string[]>();

  playlistItems.forEach((playlist) => {
    playlist.items.forEach((item) => {
      const videoId = item.contentDetails?.videoId || item.snippet.resourceId?.videoId;

      if (!videoId) {
        return;
      }

      const categories = categoriesByVideoId.get(videoId) || [];
      categoriesByVideoId.set(videoId, [...categories, playlist.title]);
    });
  });

  const videos = uploadItems
    .map((item) => {
      const id = item.contentDetails?.videoId || item.snippet.resourceId?.videoId;

      if (!id) {
        return null;
      }

      return {
        id,
        title: item.snippet.title,
        description: item.snippet.description || "",
        publishedAt: item.contentDetails?.videoPublishedAt || item.snippet.publishedAt,
        // Miniatura pelo NOSSO domínio, não por i.ytimg.com. Sem isto, abrir
        // /videos faz o navegador baixar dezenas de imagens do Google antes de
        // qualquer clique ou aceite — o facade do player adia o iframe, não as
        // miniaturas. Ver api/thumb.ts.
        thumbnailUrl: `/api/thumb?id=${encodeURIComponent(id)}`,
        url: `https://www.youtube.com/watch?v=${id}`,
        // nocookie = modo de privacidade ampliada do YouTube. O player só é
        // montado quando alguém abre o modal do vídeo (ver Videos.tsx).
        embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
        categories: categoriesByVideoId.get(id) || [],
      };
    })
    .filter((video): video is ChannelVideo => Boolean(video))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const categories = Array.from(new Set(videos.flatMap((video) => video.categories))).sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );

  return {
    categories: ["Todos", ...categories],
    videos,
  };
};
