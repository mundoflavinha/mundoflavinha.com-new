#!/usr/bin/env node
/**
 * Gera um build por modo de tagging, com ids de TESTE (e2e/ambientes.mjs).
 *
 * O modo é embutido no bundle em tempo de build (PUBLIC_*), então provar
 * "gtm não carrega GA4 direto" exige um build em modo gtm de verdade — não dá
 * para alternar em tempo de execução.
 *
 * dist/ é o build `direct`: é o que `test:html` valida e o que mais se parece
 * com produção.
 */
import { spawnSync } from "node:child_process";
import { AMBIENTES } from "../e2e/ambientes.mjs";

// TODAS as variáveis de tagging são definidas explicitamente, vazias quando não
// usadas. Variável já presente no processo tem prioridade sobre arquivos .env
// no Vite — sem isto, um .env local com id de PRODUÇÃO vazaria para o build
// de teste.
const VARIAVEIS = [
  "PUBLIC_TAGGING_MODE",
  "PUBLIC_GA_ENABLED",
  "PUBLIC_GA_ID",
  "PUBLIC_META_PIXEL_ENABLED",
  "PUBLIC_META_PIXEL_ID",
  "PUBLIC_GTM_ID",
  "PUBLIC_GTM_ENABLED",
  "PUBLIC_COOKIE_CONSENT_ENABLED",
];
const vazias = Object.fromEntries(VARIAVEIS.map((v) => [v, ""]));

for (const [modo, { dir, env }] of Object.entries(AMBIENTES)) {
  console.log(`\n=== build e2e: ${modo} → ${dir}/ ===`);
  const r = spawnSync("npx", ["astro", "build"], {
    stdio: "inherit",
    env: { ...process.env, ...vazias, ...env, ASTRO_OUT_DIR: `./${dir}` },
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
