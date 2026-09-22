import { anexarScript, type Fbq } from "./globais";

/**
 * Meta Pixel em modo `direct`.
 *
 * O Pixel NÃO PODE SER DESCARREGADO: remover a tag não desfaz um script já
 * avaliado. `fbq('consent','revoke')` é o único freio para um Pixel carregado.
 */

/** Fila equivalente ao snippet oficial — o fbevents.js reprocessa `fbq.queue` ao carregar. */
function criarFila(): void {
  if (window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue?.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;

  window.fbq = fbq;
  window._fbq = window._fbq ?? fbq;
}

const inicializados = new Set<string>();

export function ligarMetaPixel(pixelId: string): void {
  criarFila();
  // `grant` antes de `init`: sem concessão explícita o Pixel inicia restrito.
  window.fbq?.("consent", "grant");

  if (inicializados.has(pixelId)) return;
  inicializados.add(pixelId);

  anexarScript("https://connect.facebook.net/en_US/fbevents.js");
  window.fbq?.("init", pixelId);
  window.fbq?.("track", "PageView");
}

export function desligarMetaPixel(): void {
  // Sem Pixel carregado não há o que revogar — e criar a fila só para isso
  // seria definir `fbq` para quem nunca consentiu.
  if (typeof window.fbq !== "function") return;
  window.fbq("consent", "revoke");
}

export function enviarEventoMeta(nome: string, parametros: Record<string, string | number>, eventId: string): void {
  // `eventID` no 4º argumento: é a chave de deduplicação com a Conversions API,
  // se ela vier. Custa nada agora e evita redesenhar o evento depois.
  window.fbq?.("track", nome, parametros, { eventID: eventId });
}
