#!/usr/bin/env node
/**
 * Gera public/sitemap.xml — issue #11.
 *
 * Roda antes de "vite build" (ver "build" em package.json). Usa a API
 * programática do Vite (createServer + ssrLoadModule) para importar os
 * datasets de brincadeiras com resolução real de alias `@/` e TS — a mesma
 * técnica que src/test/dataIntegrity.test.ts já usa via Vitest, só que fora
 * do test runner. Um require/import Node puro não resolveria nem o alias
 * nem os imports de .webp que esses arquivos de dados trazem.
 *
 * public/sitemap.xml é gerado, não é fonte — está no .gitignore.
 */
import { createServer } from "vite";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SITE_URL = "https://mundoflavinha.com";
const OUT_FILE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/sitemap.xml");

/** As 26 rotas estáticas do App.tsx (as 30 rotas, menos as 4 dinâmicas :slug). */
const ROTAS_ESTATICAS = [
  "/",
  "/brincadeiras",
  "/brincadeiras/0-a-2-anos",
  "/brincadeiras/3-a-5-anos",
  "/brincadeiras/6-a-8-anos",
  "/brincadeiras/em-familia",
  "/downloads",
  "/videos",
  "/indicacoes",
  "/indicacoes/0-a-2-anos",
  "/indicacoes/3-a-5-anos",
  "/indicacoes/6-a-8-anos",
  "/indicacoes/jogos-em-familia",
  "/loja",
  "/loja/cartoes-alto-contraste-bebes",
  "/infoprodutos",
  "/blog",
  "/blog/album-da-copa",
  "/blog/presenca-pequenos-momentos",
  "/blog/empreendedorismo-infantil",
  "/blog/brincadeira-no-carro",
  "/blog/20-reais-shopping",
  "/sobre",
  "/politica-de-privacidade",
  "/termos-de-uso",
  "/contato",
];

const xmlEscape = (valor) => valor.replace(/&/g, "&amp;");

async function main() {
  const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });

  const [{ brincadeiras02 }, { brincadeiras35 }, { brincadeiras68 }, { brincadeirasFamilia }] = await Promise.all([
    server.ssrLoadModule("/src/data/brincadeiras02.ts"),
    server.ssrLoadModule("/src/data/brincadeiras35.ts"),
    server.ssrLoadModule("/src/data/brincadeiras68.ts"),
    server.ssrLoadModule("/src/data/brincadeirasFamilia.ts"),
  ]);

  await server.close();

  const rotasDinamicas = [
    ...brincadeiras02.map((b) => `/brincadeiras/0-a-2-anos/${b.slug}`),
    ...brincadeiras35.map((b) => `/brincadeiras/3-a-5-anos/${b.slug}`),
    ...brincadeiras68.map((b) => `/brincadeiras/6-a-8-anos/${b.slug}`),
    ...brincadeirasFamilia.map((b) => `/brincadeiras/em-familia/${b.slug}`),
  ];

  const todasAsRotas = [...ROTAS_ESTATICAS, ...rotasDinamicas];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...todasAsRotas.map((rota) => `  <url><loc>${xmlEscape(SITE_URL + rota)}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");

  writeFileSync(OUT_FILE, xml);
  console.log(`sitemap.xml gerado com ${todasAsRotas.length} URLs (${ROTAS_ESTATICAS.length} estáticas + ${rotasDinamicas.length} de brincadeiras).`);
}

main().catch((err) => {
  console.error("falha ao gerar sitemap.xml", err);
  process.exit(1);
});
