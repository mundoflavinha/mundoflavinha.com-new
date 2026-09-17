import { resolverConfiguracao, type ConfiguracaoDeTagging } from "./configuracao";

/**
 * Configuração em tempo de execução, no navegador.
 *
 * Chaves listadas uma a uma: o Vite só substitui `import.meta.env.PUBLIC_X`
 * quando a propriedade é acessada literalmente.
 *
 * Um build com configuração inválida nem chega aqui — `astro.config.mjs` o
 * derruba antes. Se mesmo assim chegar (ex.: alguém removeu a checagem do
 * build), o site cai para `disabled`: na dúvida, não medir é o erro barato.
 */
export function configuracaoEmExecucao(): ConfiguracaoDeTagging {
  const resultado = resolverConfiguracao({
    PUBLIC_TAGGING_MODE: import.meta.env.PUBLIC_TAGGING_MODE,
    PUBLIC_GA_ENABLED: import.meta.env.PUBLIC_GA_ENABLED,
    PUBLIC_GA_ID: import.meta.env.PUBLIC_GA_ID,
    PUBLIC_META_PIXEL_ENABLED: import.meta.env.PUBLIC_META_PIXEL_ENABLED,
    PUBLIC_META_PIXEL_ID: import.meta.env.PUBLIC_META_PIXEL_ID,
    PUBLIC_GTM_ID: import.meta.env.PUBLIC_GTM_ID,
    PUBLIC_GTM_ENABLED: import.meta.env.PUBLIC_GTM_ENABLED,
    PUBLIC_COOKIE_CONSENT_ENABLED: import.meta.env.PUBLIC_COOKIE_CONSENT_ENABLED,
  });

  if (resultado.ok) return resultado.configuracao;

  console.error("[tagging] configuração inválida — nenhuma tag será carregada:", resultado.erros);
  return { modo: "disabled" };
}

/**
 * Domínio do cookie do CMP. Vazio = hostname atual. Só preencha
 * (`.mundoflavinha.com`) se houver subdomínio que deva herdar a escolha.
 */
export const DOMINIO_DO_COOKIE = (import.meta.env.PUBLIC_COOKIE_CONSENT_DOMAIN ?? "").trim();
