import type { EstadoDeConsentimento } from "../consentimento";
import type { EventoRegistrado } from "../eventos";

/**
 * Contrato de distribuição. Um adaptador por modo; exatamente UM ativo por
 * página. É isso que torna "GTM + GA4 direto" impossível em tempo de
 * execução, além de inválido na configuração.
 */
export interface AdaptadorDeTagging {
  readonly modo: "direct" | "gtm" | "disabled";
  /** Chamado a cada decisão do CMP — inclusive negação e revogação. */
  aplicarConsentimento(estado: EstadoDeConsentimento): void;
  /**
   * Eventos anteriores a qualquer consentimento são DESCARTADOS, não
   * enfileirados — nos dois modos. Enfileirar faria o GTM, ao carregar depois
   * do aceite, reprocessar conversões que aconteceram antes dele.
   */
  enviar(evento: EventoRegistrado): void;
}
