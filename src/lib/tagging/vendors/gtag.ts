import type { SinaisConsentModeV2 } from "../consentimento";
import { anexarScript } from "./globais";

/**
 * Google tag (gtag.js) para GA4 em modo `direct`.
 */

export function atualizarConsentMode(sinais: SinaisConsentModeV2): void {
  window.gtag?.("consent", "update", sinais);
}

const configurados = new Set<string>();

export function ligarGa4(measurementId: string): void {
  // `ga-disable-<ID>` é o opt-out oficial do gtag: com ele em true, a
  // biblioteca não envia NENHUM hit — nem page_view, nem enhanced measurement,
  // nem ping sem cookie. Revogação volta a pô-lo em true; reconcessão, aqui.
  window[`ga-disable-${measurementId}`] = false;

  if (configurados.has(measurementId)) return;
  configurados.add(measurementId);

  anexarScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`);
  window.gtag?.("js", new Date());
  window.gtag?.("config", measurementId);
}

/**
 * Revogação com gtag.js JÁ carregado nesta página.
 *
 * Só mandar `consent update: denied` NÃO basta: o gtag passaria a enviar pings
 * sem cookie — que é o Advanced Consent Mode, exatamente o que este desenho
 * rejeitou. `ga-disable` corta tudo.
 */
export function desligarGa4(measurementId: string): void {
  window[`ga-disable-${measurementId}`] = true;
}

export function enviarEventoGa4(nome: string, parametros: Record<string, string | number>): void {
  window.gtag?.("event", nome, parametros);
}
