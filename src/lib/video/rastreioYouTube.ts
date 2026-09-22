import * as tagging from "../tagging";
import { MARCOS_DE_PROGRESSO, type MarcoDeProgresso } from "../tagging/eventos";

/**
 * Rastreio de reprodução de vídeos do YouTube → eventos de domínio.
 *
 * POR QUE postMessage E NÃO `youtube.com/iframe_api`: o script oficial é uma
 * requisição a youtube.com, fora do domínio nocookie que a Política promete, e
 * pode levar cookies de quem está logado no YouTube. O embed com
 * `enablejsapi=1` já conversa por postMessage — é o mesmo canal que o script
 * oficial usa por baixo.
 *
 * RISCO ACEITO: o formato das mensagens não é documentado publicamente. Se o
 * YouTube mudar, o efeito é PARAR DE MEDIR vídeo — nada vaza, nada quebra na
 * página. `interpretarMensagem` isola o formato e tem teste.
 *
 * Só roda depois que o iframe existe, e o iframe só existe com consentimento
 * de Conteúdo externo. Se os eventos chegam a algum provider é decisão da
 * camada de tagging, com o consentimento de medição.
 */

const ORIGEM_DO_PLAYER = "https://www.youtube-nocookie.com";

/** Estados do player: -1 não iniciado, 0 fim, 1 tocando, 2 pausa, 3 buffer, 5 carregado. */
export type LeituraDoPlayer = { estado?: number; tempoAtual?: number; duracao?: number };

export function interpretarMensagem(dados: unknown): LeituraDoPlayer | null {
  let msg: unknown = dados;
  if (typeof dados === "string") {
    try {
      msg = JSON.parse(dados);
    } catch {
      return null;
    }
  }
  if (!msg || typeof msg !== "object") return null;
  const { event, info } = msg as { event?: unknown; info?: unknown };

  if (event === "onStateChange" && typeof info === "number") return { estado: info };

  if ((event === "infoDelivery" || event === "initialDelivery") && info && typeof info === "object") {
    const i = info as Record<string, unknown>;
    const leitura: LeituraDoPlayer = {};
    if (typeof i.playerState === "number") leitura.estado = i.playerState;
    if (typeof i.currentTime === "number") leitura.tempoAtual = i.currentTime;
    if (typeof i.duration === "number" && i.duration > 0) leitura.duracao = i.duration;
    return Object.keys(leitura).length > 0 ? leitura : null;
  }
  return null;
}

type DadosDoVideo = { videoId: string; titulo: string };

/**
 * Máquina de estados PURA. Cada evento sai no máximo uma vez por montagem do
 * player — reassistir sem recarregar não infla os números.
 */
export function criarRastreador(video: DadosDoVideo, emitir: (evento: tagging.EventoDeDominio) => void) {
  let duracao: number | undefined;
  let iniciado = false;
  let concluido = false;
  const marcosEmitidos = new Set<MarcoDeProgresso>();

  const base = () => ({ provedor: "youtube" as const, videoId: video.videoId, titulo: video.titulo, duracaoSegundos: duracao });

  return (leitura: LeituraDoPlayer) => {
    if (leitura.duracao) duracao = Math.round(leitura.duracao);

    // "Iniciado" é o player TOCANDO, não o iframe montado: autoplay bloqueado
    // pelo navegador não conta como vídeo assistido.
    if (leitura.estado === 1 && !iniciado) {
      iniciado = true;
      emitir({ nome: "video_started", video: base() });
    }
    if (!iniciado || concluido) return;

    if (leitura.tempoAtual !== undefined && duracao) {
      const percentual = (leitura.tempoAtual / duracao) * 100;
      for (const marco of MARCOS_DE_PROGRESSO) {
        if (percentual >= marco && !marcosEmitidos.has(marco)) {
          marcosEmitidos.add(marco);
          emitir({ nome: "video_progressed", video: { ...base(), percentual: marco } });
        }
      }
    }

    if (leitura.estado === 0) {
      concluido = true;
      emitir({ nome: "video_completed", video: base() });
    }
  };
}

/** Parâmetros que o embed precisa para conversar. Aplicar ANTES de montar o iframe. */
export function urlComApiDeMensagens(src: string): string {
  const url = new URL(src);
  url.searchParams.set("enablejsapi", "1");
  url.searchParams.set("origin", window.location.origin);
  return url.toString();
}

/** Liga um iframe já montado ao rastreador. Retorna a função de limpeza. */
export function acompanharVideoDoYouTube(iframe: HTMLIFrameElement, video: DadosDoVideo): () => void {
  const processar = criarRastreador(video, tagging.track);
  let respondeu = false;

  const aoReceber = (evento: MessageEvent) => {
    if (evento.origin !== ORIGEM_DO_PLAYER || evento.source !== iframe.contentWindow) return;
    const leitura = interpretarMensagem(evento.data);
    if (!leitura) return;
    respondeu = true;
    processar(leitura);
  };

  // O player só começa a mandar estado depois de receber "listening". Como o
  // iframe pode ainda estar carregando, insiste até a primeira resposta.
  const pedirEstado = () =>
    iframe.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: video.videoId, channel: "widget" }), ORIGEM_DO_PLAYER);

  let tentativas = 0;
  const insistir = window.setInterval(() => {
    if (respondeu || ++tentativas > 20) return window.clearInterval(insistir);
    pedirEstado();
  }, 500);

  window.addEventListener("message", aoReceber);
  iframe.addEventListener("load", pedirEstado);

  return () => {
    window.clearInterval(insistir);
    window.removeEventListener("message", aoReceber);
    iframe.removeEventListener("load", pedirEstado);
  };
}
