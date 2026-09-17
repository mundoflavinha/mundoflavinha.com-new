import {
  algumConsentimentoDeMedicao,
  NADA_CONSENTIDO,
  sinaisDoGoogle,
  type EstadoDeConsentimento,
} from "../consentimento";
import type { ConfiguracaoDeTagging } from "../configuracao";
import { paraDataLayer } from "../traducao";
import { atualizarConsentMode } from "../vendors/gtag";
import { empurrarNoDataLayer, injetarGtm } from "../vendors/gtm";
import type { AdaptadorDeTagging } from "./tipos";

/**
 * Modo `gtm`: o site só alimenta o `dataLayer`; o container distribui.
 *
 * O que o código garante:
 *   - nenhum request ao GTM antes de Estatísticas OU Publicidade;
 *   - o container encontra os sinais do Consent Mode v2 já atualizados;
 *   - eventos de negócio só entram no dataLayer com consentimento vigente.
 *
 * O que o código NÃO garante, e fica na configuração do container (ver
 * checklist no README): que cada tag dentro dele exija o consentimento certo.
 * Com o container carregado porque a pessoa aceitou só Estatísticas, uma tag
 * da Meta sem "consent check" de ad_storage dispararia do mesmo jeito.
 */
export function criarAdaptadorGtm(configuracao: Extract<ConfiguracaoDeTagging, { modo: "gtm" }>): AdaptadorDeTagging {
  let estado: EstadoDeConsentimento = NADA_CONSENTIDO;

  return {
    modo: "gtm",

    aplicarConsentimento(novo) {
      estado = novo;
      atualizarConsentMode(sinaisDoGoogle(novo));

      // Evento próprio para o container reagir a mudanças — em especial à
      // REVOGAÇÃO, que tags não-Google (Meta) precisam tratar com
      // `fbq('consent','revoke')` num trigger deste evento. Sem isto, o GTM
      // não teria como saber que a pessoa voltou atrás no meio da página.
      empurrarNoDataLayer({
        event: "consent_updated",
        consent: { analytics: novo.analytics ? "granted" : "denied", marketing: novo.marketing ? "granted" : "denied" },
      });

      if (algumConsentimentoDeMedicao(novo)) injetarGtm(configuracao.gtmId);
    },

    enviar(evento) {
      if (!algumConsentimentoDeMedicao(estado)) return;
      empurrarNoDataLayer(paraDataLayer(evento));
    },
  };
}
