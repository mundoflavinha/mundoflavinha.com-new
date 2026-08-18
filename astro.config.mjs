// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import path from "node:path";

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
  integrations: [react(), icon(), sitemap()],
  vite: {
    resolve: {
      alias: { "@": path.resolve(process.cwd(), "./src") },
    },
  },
});
