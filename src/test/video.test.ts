import { describe, expect, it, vi } from "vitest";
import { criarRastreador, interpretarMensagem } from "@/lib/video/rastreioYouTube";

describe("interpretarMensagem (protocolo do embed)", () => {
  it("lê mudança de estado", () => {
    expect(interpretarMensagem(JSON.stringify({ event: "onStateChange", info: 1 }))).toEqual({ estado: 1 });
  });
  it("lê tempo e duração", () => {
    expect(
      interpretarMensagem(JSON.stringify({ event: "infoDelivery", info: { currentTime: 30, duration: 120, playerState: 1 } })),
    ).toEqual({ estado: 1, tempoAtual: 30, duracao: 120 });
  });
  it("ignora lixo sem lançar", () => {
    expect(interpretarMensagem("não é json")).toBeNull();
    expect(interpretarMensagem({ event: "outra" })).toBeNull();
    expect(interpretarMensagem(null)).toBeNull();
  });
});

describe("criarRastreador", () => {
  const nomes = (emitir: ReturnType<typeof vi.fn>) =>
    emitir.mock.calls.map(([e]) => (e.nome === "video_progressed" ? `${e.nome}:${e.video.percentual}` : e.nome));

  it("montar o player sem tocar NÃO é video_started", () => {
    const emitir = vi.fn();
    const ler = criarRastreador({ videoId: "v", titulo: "t" }, emitir);
    ler({ estado: -1, duracao: 100 });
    ler({ estado: 5 });
    expect(emitir).not.toHaveBeenCalled();
  });

  it("sequência completa: started, 25/50/75, completed — cada um uma vez", () => {
    const emitir = vi.fn();
    const ler = criarRastreador({ videoId: "v", titulo: "t" }, emitir);
    ler({ duracao: 100 });
    ler({ estado: 1, tempoAtual: 0 });
    ler({ tempoAtual: 26 });
    ler({ tempoAtual: 27 });
    ler({ tempoAtual: 80 }); // salto: 50 e 75 juntos
    ler({ estado: 2 });
    ler({ estado: 1 }); // retomar não reinicia
    ler({ estado: 0, tempoAtual: 100 });
    ler({ estado: 1, tempoAtual: 0 }); // reassistir não reemite
    ler({ estado: 0 });
    expect(nomes(emitir)).toEqual([
      "video_started",
      "video_progressed:25",
      "video_progressed:50",
      "video_progressed:75",
      "video_completed",
    ]);
  });

  it("não emite progressed de 100 — o fim é video_completed", () => {
    const emitir = vi.fn();
    const ler = criarRastreador({ videoId: "v", titulo: "t" }, emitir);
    ler({ estado: 1, duracao: 10, tempoAtual: 10 });
    expect(nomes(emitir).some((n) => n.endsWith(":100"))).toBe(false);
  });
});
