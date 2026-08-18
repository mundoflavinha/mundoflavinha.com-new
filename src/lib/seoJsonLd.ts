/**
 * JSON-LD puro, sem dependência de framework — usado tanto por Layout.astro
 * (Organization, na home) quanto por ArtigoLayout.astro (Article, nos posts).
 *
 * Extraído do antigo src/lib/seo.ts (Fase 1 apagou o resto: aquele arquivo
 * existia para o react-helmet-async, que não existe mais). Mantém só o que
 * ainda serve: montar o objeto schema.org.
 */
import { REDES_SOCIAIS } from "./site";

/** Mesmo valor de `site` em astro.config.mjs. */
export const SITE_URL = "https://mundoflavinha.com";

export type JsonLd = Record<string, unknown>;

export const organizationJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mundo Flavinha",
  url: SITE_URL,
  logo: `${SITE_URL}/og-default.webp`,
  sameAs: REDES_SOCIAIS.map((r) => r.href),
});

export const articleJsonLd = (params: {
  headline: string;
  description: string;
  image: string;
  url: string;
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: params.headline,
  description: params.description,
  image: params.image.startsWith("http") ? params.image : `${SITE_URL}${params.image}`,
  url: params.url,
  author: { "@type": "Person", name: "Flávia" },
  publisher: { "@type": "Organization", name: "Mundo Flavinha", url: SITE_URL },
});
