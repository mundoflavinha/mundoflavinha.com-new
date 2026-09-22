/**
 * Resolução e validação da configuração de tagging.
 *
 * PURO de propósito: sem `import.meta.env`, sem `window`. É chamado em dois
 * lugares com o mesmo código:
 *
 *   - no build e no dev server (`astro.config.mjs`), onde uma configuração
 *     inválida DERRUBA o processo — o deploy não acontece e o erro aparece no
 *     log da Cloudflare/CI em vez de virar duplicidade silenciosa em produção;
 *   - no navegador (`config.ts`), como segunda linha de defesa.
 *
 * O desenho elimina a combinação perigosa por construção: o resultado é uma
 * união discriminada por `modo`, e só o ramo `direct` TEM campos de GA4 e Meta.
 * Não existe valor do tipo `ConfiguracaoDeTagging` que represente "GTM e GA4
 * direto ao mesmo tempo" — não é uma regra a lembrar, é um estado que não
 * compila.
 */

export const MODOS_DE_TAGGING = ["direct", "gtm", "disabled"] as const;
export type ModoDeTagging = (typeof MODOS_DE_TAGGING)[number];

export type ConfiguracaoDeTagging =
  | { modo: "disabled" }
  | { modo: "gtm"; gtmId: string }
  | { modo: "direct"; ga4: { measurementId: string } | null; metaPixel: { pixelId: string } | null };

export type ResultadoDaConfiguracao =
  | { ok: true; configuracao: ConfiguracaoDeTagging; avisos: string[] }
  | { ok: false; erros: string[] };

/** Só as chaves que importam. `Record` para aceitar tanto process.env quanto import.meta.env. */
export type AmbienteDeTagging = Partial<Record<string, string | undefined>>;

const FORMATO = {
  ga4: /^G-[A-Z0-9]{4,}$/,
  gtm: /^GTM-[A-Z0-9]{4,}$/,
  // Ids do Pixel são numéricos. 15-16 dígitos hoje; a faixa é folgada para não
  // quebrar o build no dia em que a Meta mudar o tamanho.
  metaPixel: /^\d{10,20}$/,
};

/**
 * Variáveis de desenhos anteriores. Presentes = erro, não aviso: quem as
 * definiu tinha uma intenção (ex.: `PUBLIC_GTM_ENABLED=true`) que o código novo
 * ignoraria em silêncio. Melhor um build quebrado com a instrução de migração
 * do que um site medindo diferente do que a pessoa acha.
 */
const VARIAVEIS_REMOVIDAS: Record<string, string> = {
  PUBLIC_GTM_ENABLED: "use PUBLIC_TAGGING_MODE=gtm",
  PUBLIC_COOKIE_CONSENT_ENABLED: "use PUBLIC_TAGGING_MODE=disabled para desligar tudo",
};

const texto = (valor: string | undefined) => (valor ?? "").trim();

/** Só "true" e "false" são aceitos. "1", "yes", "True" são erro, não "desligado". */
const booleano = (nome: string, valor: string | undefined, erros: string[]): boolean => {
  const v = texto(valor);
  if (v === "" || v === "false") return false;
  if (v === "true") return true;
  erros.push(`${nome}="${v}" é inválido: use "true" ou "false".`);
  return false;
};

export function resolverConfiguracao(
  env: AmbienteDeTagging,
  opcoes: { exigirModoExplicito?: boolean } = {},
): ResultadoDaConfiguracao {
  const erros: string[] = [];
  const avisos: string[] = [];

  for (const [nome, substituto] of Object.entries(VARIAVEIS_REMOVIDAS)) {
    if (texto(env[nome]) !== "") erros.push(`${nome} foi removida: ${substituto}.`);
  }

  const modoBruto = texto(env.PUBLIC_TAGGING_MODE);

  if (modoBruto === "") {
    if (opcoes.exigirModoExplicito) {
      // Sem isto, subir este código para a Cloudflare sem cadastrar a variável
      // desligaria o GA4 de produção em silêncio — o código anterior ligava o
      // GA só com PUBLIC_GA_ID.
      erros.push(
        "PUBLIC_TAGGING_MODE é obrigatória em builds da Cloudflare Pages. " +
          'Production: "direct". Preview: "disabled".',
      );
    }
    return erros.length > 0 ? { ok: false, erros } : { ok: true, configuracao: { modo: "disabled" }, avisos };
  }

  if (!(MODOS_DE_TAGGING as readonly string[]).includes(modoBruto)) {
    erros.push(`PUBLIC_TAGGING_MODE="${modoBruto}" é inválido. Valores aceitos: ${MODOS_DE_TAGGING.join(", ")}.`);
    return { ok: false, erros };
  }

  const modo = modoBruto as ModoDeTagging;
  const gaLigado = booleano("PUBLIC_GA_ENABLED", env.PUBLIC_GA_ENABLED, erros);
  const pixelLigado = booleano("PUBLIC_META_PIXEL_ENABLED", env.PUBLIC_META_PIXEL_ENABLED, erros);
  const gaId = texto(env.PUBLIC_GA_ID);
  const pixelId = texto(env.PUBLIC_META_PIXEL_ID);
  const gtmId = texto(env.PUBLIC_GTM_ID);

  // `disabled` é o botão de emergência: tem que funcionar trocando UMA variável,
  // sem exigir que alguém limpe as outras no meio de um incidente. Por isso não
  // valida mais nada além das variáveis removidas.
  if (modo === "disabled") {
    return erros.length > 0 ? { ok: false, erros } : { ok: true, configuracao: { modo }, avisos };
  }

  if (modo === "gtm") {
    // A configuração perigosa. Com o container também distribuindo GA4/Meta,
    // cada pageview e cada conversão seria contada duas vezes — e nada no GA ou
    // no Events Manager acusaria.
    if (gaLigado) erros.push("PUBLIC_GA_ENABLED=true é incompatível com PUBLIC_TAGGING_MODE=gtm: o GA4 deve vir do container.");
    if (pixelLigado) erros.push("PUBLIC_META_PIXEL_ENABLED=true é incompatível com PUBLIC_TAGGING_MODE=gtm: o Pixel deve vir do container.");
    if (gtmId === "") erros.push("PUBLIC_TAGGING_MODE=gtm exige PUBLIC_GTM_ID.");
    else if (!FORMATO.gtm.test(gtmId)) erros.push(`PUBLIC_GTM_ID="${gtmId}" não tem o formato GTM-XXXXXXX.`);

    return erros.length > 0 ? { ok: false, erros } : { ok: true, configuracao: { modo, gtmId }, avisos };
  }

  // modo === "direct"
  if (gaLigado) {
    if (gaId === "") erros.push("PUBLIC_GA_ENABLED=true exige PUBLIC_GA_ID.");
    else if (!FORMATO.ga4.test(gaId)) erros.push(`PUBLIC_GA_ID="${gaId}" não tem o formato G-XXXXXXXXXX.`);
  }
  if (pixelLigado) {
    if (pixelId === "") erros.push("PUBLIC_META_PIXEL_ENABLED=true exige PUBLIC_META_PIXEL_ID.");
    else if (!FORMATO.metaPixel.test(pixelId)) erros.push(`PUBLIC_META_PIXEL_ID="${pixelId}" não é um id numérico de Pixel.`);
  }
  if (!gaLigado && !pixelLigado) {
    erros.push('PUBLIC_TAGGING_MODE=direct sem nenhum provider ligado. Se a intenção é não medir nada, use "disabled".');
  }
  if (gtmId !== "") {
    // Permitido: deixa o container configurado enquanto é auditado. Mas vale o
    // registro, para ninguém concluir pelo painel da Cloudflare que o GTM roda.
    avisos.push(`PUBLIC_GTM_ID="${gtmId}" está definido mas é IGNORADO em modo direct.`);
  }

  if (erros.length > 0) return { ok: false, erros };

  return {
    ok: true,
    configuracao: {
      modo,
      ga4: gaLigado ? { measurementId: gaId } : null,
      metaPixel: pixelLigado ? { pixelId } : null,
    },
    avisos,
  };
}
