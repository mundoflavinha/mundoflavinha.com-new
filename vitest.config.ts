import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * Config própria e deliberadamente simples.
 *
 * Tentei usar `getViteConfig()` do Astro para que teste e build
 * compartilhassem a mesma resolução de módulos, mas ele é incompatível com o
 * Vitest nesta combinação de versões (Astro 7 / Vite-Rolldown).
 *
 * A consequência é que um `import x from "*.webp"` resolve como STRING aqui e
 * como ImageMetadata no build. Em vez de simular a resolução do Astro — que
 * seria inventar uma terceira verdade —, nenhum teste unitário assevera sobre
 * imagem. Essa garantia mora em src/test/html.test.ts, que lê o HTML de dist/
 * e confere que todo <img> saiu com width/height. Testar a saída real é mais
 * forte do que testar a resolução simulada.
 *
 * Não há mais jsdom nem setup: sobrou zero teste que renderize componente.
 */
export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
