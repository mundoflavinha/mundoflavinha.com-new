import { NADA_CONSENTIDO, sinaisDoGoogle, type EstadoDeConsentimento } from "../consentimento";
import type { ConfiguracaoDeTagging } from "../configuracao";
import { paraGa4, paraMeta } from "../traducao";
import { atualizarConsentMode, desligarGa4, enviarEventoGa4, ligarGa4 } from "../vendors/gtag";
import { desligarMetaPixel, enviarEventoMeta, ligarMetaPixel } from "../vendors/metaPixel";
import type { AdaptadorDeTagging } from "./tipos";

/**
 * Modo `direct`: o site fala com GA4 e Meta sem intermediário.
 *
 * Cada provider tem seu PRÓPRIO portão de consentimento:
 *   GA4  → Estatísticas (analytics)
 *   Meta → Publicidade (marketing)
 * Aceitar um não liga o outro.
 */
export function criarAdaptadorDireto(
  configuracao: Extract<ConfiguracaoDeTagging, { modo: "direct" }>,
): AdaptadorDeTagging {
  let estado: EstadoDeConsentimento = NADA_CONSENTIDO;

  return {
    modo: "direct",

    aplicarConsentimento(novo) {
      estado = novo;
      // Sinais sempre primeiro: o `config` do GA4 logo abaixo já sai com eles.
      atualizarConsentMode(sinaisDoGoogle(novo));

      if (configuracao.ga4) {
        if (novo.analytics) ligarGa4(configuracao.ga4.measurementId);
        else desligarGa4(configuracao.ga4.measurementId);
      }

      if (configuracao.metaPixel) {
        if (novo.marketing) ligarMetaPixel(configuracao.metaPixel.pixelId);
        else desligarMetaPixel();
      }
    },

    enviar(evento) {
      // O estado é conferido A CADA evento, não só na carga: depois de uma
      // revogação na mesma página, o provider continua carregado mas não
      // recebe mais nada daqui.
      if (configuracao.ga4 && estado.analytics) {
        const ga4 = paraGa4(evento);
        if (ga4) enviarEventoGa4(ga4.nome, ga4.parametros);
      }
      if (configuracao.metaPixel && estado.marketing) {
        const meta = paraMeta(evento);
        if (meta) enviarEventoMeta(meta.nome, meta.parametros, evento.id);
      }
    },
  };
}
