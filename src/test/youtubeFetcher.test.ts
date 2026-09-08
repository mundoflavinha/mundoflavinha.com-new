import { describe, expect, it, vi, afterEach } from "vitest";
import { fetchChannelVideos, ORCAMENTO_PADRAO_SUBREQUISICOES } from "@/lib/youtubeFetcher";

/**
 * Reproduz o incidente de produção: um canal com playlists o bastante faz o
 * pipeline (1 chamada por página de upload + 1 por página de playlists + 1
 * POR PLAYLIST) passar de 50 subrequisições — o teto do plano Free da
 * Cloudflare Pages Functions. O sintoma real foi um 502 genérico da borda,
 * não um erro do nosso `catch` — a função estourava antes do nosso próprio
 * tratamento de erro rodar. Ver o comentário sobre `criarOrcamento` em
 * youtubeFetcher.ts para a explicação completa.
 */

const respostaJson = (body: unknown) =>
  new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });

const item = (id: string, publishedAt: string) => ({
  contentDetails: { videoId: id, videoPublishedAt: publishedAt },
  snippet: { title: `Vídeo ${id}`, publishedAt, thumbnails: {} },
});

/** Canal com 45 playlists — bastante para estourar o orçamento de 40. */
const NUM_VIDEOS = 10;
const NUM_PLAYLISTS = 45;

function instalarFetchMock() {
  const chamadas: string[] = [];

  const mock = vi.fn(async (input: string | URL) => {
    const url = new URL(input);
    chamadas.push(url.pathname + url.search);
    const path = url.pathname.split("/").pop();

    if (path === "channels") {
      return respostaJson({
        items: [{ id: "canal1", contentDetails: { relatedPlaylists: { uploads: "UUuploads" } } }],
      });
    }

    if (path === "playlistItems" && url.searchParams.get("playlistId") === "UUuploads") {
      const itens = Array.from({ length: NUM_VIDEOS }, (_, i) => item(`v${i}`, `2026-01-${10 + i}T00:00:00Z`));
      return respostaJson({ items: itens }); // 1 página só — cabe em maxResults=50
    }

    if (path === "playlists") {
      const itens = Array.from({ length: NUM_PLAYLISTS }, (_, i) => ({
        id: `pl${i}`,
        snippet: { title: `Categoria ${i}` },
      }));
      return respostaJson({ items: itens }); // 1 página só — 45 < 50
    }

    if (path === "playlistItems") {
      // cada playlist marca 1 vídeo já existente no upload, pra dar pra
      // conferir se a categoria "pegou" ou ficou de fora pelo orçamento
      const playlistId = url.searchParams.get("playlistId")!;
      const i = Number(playlistId.replace("pl", ""));
      return respostaJson({ items: [item(`v${i % NUM_VIDEOS}`, "2026-01-01T00:00:00Z")] });
    }

    throw new Error(`URL inesperada no mock: ${url.toString()}`);
  });

  vi.stubGlobal("fetch", mock);
  return { mock, chamadas };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchChannelVideos — orçamento de subrequisições", () => {
  it("nunca ultrapassa o orçamento, mesmo com um canal grande o bastante para estourá-lo sem defesa", async () => {
    const { mock } = instalarFetchMock();

    await fetchChannelVideos({
      apiKey: "chave-fake",
      handle: "mundoflavinha",
      maxResults: Infinity,
    });

    expect(mock.mock.calls.length).toBeLessThanOrEqual(ORCAMENTO_PADRAO_SUBREQUISICOES);

    // 45 playlists pedidas > o que sobra de orçamento — sem a defesa, isto
    // seria 1 (canal) + 1 (upload) + 1 (lista de playlists) + 45 = 48
    // chamadas SÓ NESTE CENÁRIO PEQUENO. Um canal real, com mais vídeos (mais
    // páginas de upload) e mais playlists, passaria de 50 com folga.
    expect(mock.mock.calls.length).toBeLessThan(1 + 1 + 1 + NUM_PLAYLISTS);
  });

  it("prioriza os vídeos: a lista sai completa mesmo quando as categorias são cortadas", async () => {
    instalarFetchMock();

    const resultado = await fetchChannelVideos({
      apiKey: "chave-fake",
      handle: "mundoflavinha",
      maxResults: Infinity,
    });

    // O orçamento corta CATEGORIAS antes de cortar VÍDEOS — a lista de
    // vídeos em si nunca deveria encolher por causa do orçamento.
    expect(resultado.videos).toHaveLength(NUM_VIDEOS);
  });

  it("degrada as categorias sem lançar erro — nem toda playlist cabe no orçamento", async () => {
    instalarFetchMock();

    const resultado = await fetchChannelVideos({
      apiKey: "chave-fake",
      handle: "mundoflavinha",
      maxResults: Infinity,
    });

    // "Todos" sempre presente; o resto é o que coube. Com 45 playlists e
    // orçamento pra só ~37 delas (40 - 1 canal - 1 upload - 1 lista de
    // playlists), a contagem real de categorias fica ABAIXO de 45 — a prova
    // de que o corte aconteceu sem quebrar a função.
    expect(resultado.categories[0]).toBe("Todos");
    expect(resultado.categories.length).toBeGreaterThan(1);
    expect(resultado.categories.length).toBeLessThan(1 + NUM_PLAYLISTS);
  });

  it("não faz nenhuma chamada além do necessário quando o canal é pequeno", async () => {
    const chamadas: string[] = [];
    const mock = vi.fn(async (input: string | URL) => {
      const url = new URL(input);
      chamadas.push(url.pathname);
      const path = url.pathname.split("/").pop();

      if (path === "channels") {
        return respostaJson({
          items: [{ id: "canal1", contentDetails: { relatedPlaylists: { uploads: "UUuploads" } } }],
        });
      }
      if (path === "playlistItems" && url.searchParams.get("playlistId") === "UUuploads") {
        return respostaJson({ items: [item("v0", "2026-01-01T00:00:00Z")] });
      }
      if (path === "playlists") {
        return respostaJson({ items: [{ id: "pl0", snippet: { title: "Única categoria" } }] });
      }
      if (path === "playlistItems") {
        return respostaJson({ items: [item("v0", "2026-01-01T00:00:00Z")] });
      }
      throw new Error(`inesperado: ${url}`);
    });
    vi.stubGlobal("fetch", mock);

    const resultado = await fetchChannelVideos({ apiKey: "k", handle: "mundoflavinha", maxResults: Infinity });

    // canal (1) + upload (1) + lista de playlists (1) + 1 playlist = 4.
    // Um canal pequeno não deveria ficar perto do teto de 40.
    expect(mock.mock.calls.length).toBe(4);
    expect(resultado.videos).toHaveLength(1);
    expect(resultado.categories).toEqual(["Todos", "Única categoria"]);
  });
});
