// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import path from "node:path";
import { loadEnv } from "vite";
import { resolverConfiguracao } from "./src/lib/tagging/configuracao.ts";

/**
 * Valida a configuração de tagging ANTES de gerar qualquer página.
 *
 * Configuração inválida (ex.: PUBLIC_TAGGING_MODE=gtm com PUBLIC_GA_ENABLED=true,
 * que duplicaria cada pageview) derruba `astro dev` e `astro build`. Na
 * Cloudflare, build quebrado = deploy não acontece e o anterior continua no ar.
 * É a forma mais barata de transformar duplicidade silenciosa em erro visível.
 *
 * Em builds da Cloudflare Pages (`CF_PAGES=1`) o modo é obrigatório: sem ele,
 * este código subiria com tagging desligado e o GA4 de produção pararia sem
 * aviso.
 */
/** @type {import('astro').AstroIntegration} */
const validarTagging = {
  name: "mundoflavinha:validar-tagging",
  hooks: {
    "astro:config:setup": ({ command, logger }) => {
      const arquivoEnv = loadEnv(command === "build" ? "production" : "development", process.cwd(), "");
      const env = { ...arquivoEnv, ...process.env };
      const resultado = resolverConfiguracao(env, { exigirModoExplicito: process.env.CF_PAGES === "1" });

      if (!resultado.ok) {
        throw new Error(
          ["Configuração de tagging inválida:", ...resultado.erros.map((e) => `  - ${e}`)].join("\n"),
        );
      }
      for (const aviso of resultado.avisos) logger.warn(aviso);
      logger.info(`tagging: modo ${resultado.configuracao.modo}`);
    },
  },
};

/**
 * `site` é obrigatório para o @astrojs/sitemap e alimenta `Astro.site`, usado
 * para montar os canonicals no Layout. `trailingSlash` precisa casar com o
 * canonical e com o que o sitemap emite — se divergirem, o sitemap aponta para
 * URLs que respondem 308.
 *
 * Sem adapter de propósito: com output estático, a pasta `api/` na raiz
 * continua sendo detectada pela Vercel como Serverless Functions. Isso foi
 * verificado em preview antes de migrar (ver Fase 0 do plano) — o adapter
 * emitiria Build Output API v3, que define o deploy inteiro e poderia fazer a
 * convenção da pasta `api/` deixar de valer.
 */
export default defineConfig({
  site: "https://mundoflavinha.com",
  output: "static",
  trailingSlash: "never",
  build: { format: "directory" },
  // Sobrescrevível só para o e2e, que gera um build por modo de tagging
  // (scripts/build-e2e.mjs). Produção usa sempre dist/.
  outDir: process.env.ASTRO_OUT_DIR ?? "./dist",
  integrations: [validarTagging, react(), icon(), sitemap()],
  vite: {
    resolve: {
      alias: { "@": path.resolve(process.cwd(), "./src") },
    },
  },
});
