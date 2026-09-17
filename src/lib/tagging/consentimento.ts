/**
 * Estado de consentimento que a camada de tagging entende, e o mapeamento
 * para os sinais do Google Consent Mode v2.
 *
 * | Categoria do CMP        | Sinais do Google                                   |
 * |-------------------------|----------------------------------------------------|
 * | necessary (sempre)      | functionality_storage, security_storage = granted  |
 * | analytics "Estatísticas"| analytics_storage                                  |
 * | marketing "Publicidade" | ad_storage, ad_user_data, ad_personalization       |
 * | external_media          | — (não é sinal do Google; controla só o YouTube)   |
 *
 * Os três sinais de publicidade andam juntos porque a categoria "Publicidade"
 * descreve, num só texto, medição de anúncio E remarketing. Se um dia o banner
 * separar "medir anúncios" de "personalizar anúncios", `ad_personalization`
 * ganha categoria própria — e só esta função muda.
 *
 * Google Ads não está ativo. Os sinais de publicidade já são enviados para que
 * ativá-lo não exija redesenho: a tag do Ads nasceria respeitando o estado.
 */

export type EstadoDeConsentimento = {
  analytics: boolean;
  marketing: boolean;
};

export const NADA_CONSENTIDO: EstadoDeConsentimento = { analytics: false, marketing: false };

export function estadoDasCategorias(
  categorias: readonly string[],
  opcoes: { superficiePermiteMarketing: boolean },
): EstadoDeConsentimento {
  return {
    analytics: categorias.includes("analytics"),
    // Nunca derivar publicidade da categoria crua: a superfície pode proibir
    // (área logada, no futuro) mesmo com o cookie compartilhado dizendo sim.
    marketing: opcoes.superficiePermiteMarketing && categorias.includes("marketing"),
  };
}

export type SinaisConsentModeV2 = {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
};

const sinal = (concedido: boolean) => (concedido ? "granted" : "denied");

export function sinaisDoGoogle(estado: EstadoDeConsentimento): SinaisConsentModeV2 {
  return {
    analytics_storage: sinal(estado.analytics),
    ad_storage: sinal(estado.marketing),
    ad_user_data: sinal(estado.marketing),
    ad_personalization: sinal(estado.marketing),
  };
}

export const algumConsentimentoDeMedicao = (estado: EstadoDeConsentimento) => estado.analytics || estado.marketing;
