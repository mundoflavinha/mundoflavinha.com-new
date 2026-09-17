import { criarAdaptadorDesligado } from "./adaptadores/desligado";
import { criarAdaptadorDireto } from "./adaptadores/direto";
import { criarAdaptadorGtm } from "./adaptadores/gtm";
import type { AdaptadorDeTagging } from "./adaptadores/tipos";
import { configuracaoEmExecucao } from "./config";
import type { ConfiguracaoDeTagging } from "./configuracao";
import { estadoDasCategorias, NADA_CONSENTIDO, type EstadoDeConsentimento } from "./consentimento";
import type { EventoDeDominio, EventoRegistrado } from "./eventos";

/**
 * API pública da camada de tagging.
 *
 *   componente → tagging.track(evento de domínio) → adaptador do modo → provider
 *
 * Nenhum componente importa de `vendors/` ou `adaptadores/`, nem chama
 * `gtag`, `fbq` ou `dataLayer.push`. Teste em src/test/tagging.test.ts.
 */

export type { EventoDeDominio } from "./eventos";
export type { EstadoDeConsentimento } from "./consentimento";

export function criarAdaptador(configuracao: ConfiguracaoDeTagging): AdaptadorDeTagging {
  switch (configuracao.modo) {
    case "direct":
      return criarAdaptadorDireto(configuracao);
    case "gtm":
      return criarAdaptadorGtm(configuracao);
    case "disabled":
      return criarAdaptadorDesligado();
  }
}

let adaptador: AdaptadorDeTagging | null = null;
let estado: EstadoDeConsentimento = NADA_CONSENTIDO;
let superficiePermiteMarketing = false;

const adaptadorAtual = () => (adaptador ??= criarAdaptador(configuracaoEmExecucao()));

const novoId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

/**
 * Liga a camada ao CMP. `enableMarketing` é por SUPERFÍCIE: o site público
 * passa `true`; uma futura área logada passaria `false`, porque o cookie do
 * CMP pode ser compartilhado entre subdomínios.
 */
export function initConsent({ enableMarketing = false }: { enableMarketing?: boolean } = {}) {
  superficiePermiteMarketing = enableMarketing;
  const aplicar = ({ cookie }: { cookie: { categories?: string[] } }) => {
    estado = estadoDasCategorias(cookie.categories ?? [], { superficiePermiteMarketing });
    adaptadorAtual().aplicarConsentimento(estado);
  };
  return { onConsent: aplicar, onChange: aplicar };
}

export function track(evento: EventoDeDominio): void {
  const registrado = { ...evento, id: novoId() } as EventoRegistrado;
  adaptadorAtual().enviar(registrado);
}

/** Leitura do estado — para quem precisa decidir o que COLETAR (ex.: atribuição). */
export const consentimentoAtual = (): EstadoDeConsentimento => estado;
