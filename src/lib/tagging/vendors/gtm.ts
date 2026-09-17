import { anexarScript, dataLayer } from "./globais";

/**
 * Container do GTM, injetado SÓ depois de consentimento.
 *
 * Nunca no template (carregaria antes da escolha) e sem o `<noscript>` com
 * iframe do snippet oficial (carrega sem passar por JavaScript nenhum — logo,
 * sem passar pelo consentimento).
 */

let injetado = false;

export function injetarGtm(gtmId: string): void {
  if (injetado) return;
  injetado = true;

  // `gtm.start` ANTES do script: ao carregar, o container já encontra o
  // `consent update` empilhado, e nenhuma tag decide com o default.
  dataLayer().push({ "gtm.start": Date.now(), event: "gtm.js" });
  anexarScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
}

export function empurrarNoDataLayer(dados: Record<string, unknown>): void {
  dataLayer().push(dados);
}
