/**
 * Dois conceitos que NÃO se misturam, nem no tipo nem na regra:
 *
 *   Campanha                 → DE ONDE o lead veio. Parâmetros que nós mesmos
 *                              escrevemos no link (utm_source=partner-helena).
 *                              Não identificam navegador nem pessoa.
 *
 *   Identificadores de mídia → identificadores emitidos por plataformas de
 *                              anúncio para reconhecer o clique/navegador
 *                              (fbclid, _fbp, _fbc). São o insumo de
 *                              atribuição publicitária cross-site.
 *
 * Tratá-los como a mesma coisa levaria a um de dois erros: gravar _fbp sem
 * consentimento porque "é só atribuição", ou perder utm_source=newsletter
 * porque "é rastreamento". A regra de cada um vive em `politica.ts`.
 */

export type Campanha = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
};

/**
 * Só o que existe em uso hoje. `gclid` entra quando houver Google Ads; o
 * armazenamento é jsonb justamente para isso não exigir migration.
 */
export type IdentificadoresDeMidia = {
  fbclid?: string;
  fbp?: string;
  fbc?: string;
};

export const temAlgum = (obj: Record<string, string | undefined> | undefined): boolean =>
  !!obj && Object.values(obj).some((v) => typeof v === "string" && v !== "");
