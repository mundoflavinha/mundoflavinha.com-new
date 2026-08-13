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

const getBestThumbnailUrl = (snippet: YouTubeSnippet) =>
  snippet.thumbnails.maxres?.url ||
  snippet.thumbnails.standard?.url ||
  snippet.thumbnails.high?.url ||
  snippet.thumbnails.medium?.url ||
  snippet.thumbnails.default?.url ||
  "";

const requestYouTube = async <T>(path: string, params: Record<string, string | number>) => {
  const url = new URL(`${YOUTUBE_API_BASE_URL}/${path}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`YouTube API respondeu ${response.status} em ${path}`);
  }

  return response.json() as Promise<T>;
};

const getChannelDetails = async (apiKey: string, channelId: string | undefined, handle: string) => {
  const params = channelId
    ? { part: "contentDetails", id: channelId, key: apiKey }
    : { part: "contentDetails", forHandle: handle, key: apiKey };

  const data = await requestYouTube<YouTubeChannelResponse>("channels", params);
  const channel = data.items?.[0];

  if (!channel) {
    throw new Error("Canal do YouTube não encontrado.");
  }

  return channel;
};

const getChannelPlaylists = async (apiKey: string, channelId: string) => {
  const playlists: NonNullable<YouTubePlaylistResponse["items"]> = [];
  let pageToken: string | undefined;

  do {
    const data = await requestYouTube<YouTubePlaylistResponse>("playlists", {
      part: "snippet",
      channelId,
      maxResults: 50,
      ...(pageToken ? { pageToken } : {}),
      key: apiKey,
    });

    playlists.push(...(data.items || []));
    pageToken = data.nextPageToken;
  } while (pageToken);

  return playlists;
};

const getPlaylistItems = async (apiKey: string, playlistId: string, maxResults: number) => {
  const items: NonNullable<YouTubePlaylistItemsResponse["items"]> = [];
  let pageToken: string | undefined;

  do {
    const remainingResults = maxResults - items.length;
    const pageSize = Number.isFinite(maxResults) ? Math.min(50, remainingResults) : 50;

    if (pageSize <= 0) {
      break;
    }

    const data = await requestYouTube<YouTubePlaylistItemsResponse>("playlistItems", {
      part: "snippet,contentDetails",
      playlistId,
      maxResults: pageSize,
      ...(pageToken ? { pageToken } : {}),
      key: apiKey,
    });

    items.push(...(data.items || []));
    pageToken = data.nextPageToken;
  } while (pageToken && items.length < maxResults);

  return items;
};

export const fetchChannelVideos = async (config: YouTubeFetchConfig): Promise<ChannelVideosResult> => {
  const { apiKey, channelId, handle, maxResults } = config;

  const channel = await getChannelDetails(apiKey, channelId, handle);
  const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;

  const [uploadItems, playlists] = await Promise.all([
    getPlaylistItems(apiKey, uploadsPlaylistId, maxResults),
    getChannelPlaylists(apiKey, channel.id),
  ]);

  const playlistItems = await Promise.all(
    playlists.map(async (playlist) => ({
      title: playlist.snippet.title,
      items: await getPlaylistItems(apiKey, playlist.id, 50),
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
        thumbnailUrl: getBestThumbnailUrl(item.snippet),
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
