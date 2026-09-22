#!/usr/bin/env node
/**
 * Trava de deploy: recusa publicar código cujas migrations não foram aplicadas.
 *
 * Regra: todo arquivo em sql/migrations/ presente NESTE commit precisa constar
 * em `schema_migrations` no banco. Código e migration andam juntos no
 * repositório; o banco precisa estar pelo menos tão à frente quanto o código.
 *
 * Onde roda: no `npm run build`, antes do Astro. Só IMPÕE em build de produção
 * da Cloudflare Pages (CF_PAGES=1 e branch de produção). A Cloudflare publica
 * direto pela integração Git — o GitHub Actions não consegue barrar esse
 * deploy, então a trava precisa estar no próprio build. Build quebrado =
 * deploy não acontece, versão anterior continua no ar.
 *
 * Fora disso (dev, CI, preview) só informa e sai com 0: não há banco de
 * produção acessível, e preview não deve depender dele.
 *
 * Uso manual: `npm run db:check` (exige DATABASE_URL; sempre impõe).
 */
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";

const manual = process.argv.includes("--impor");
const ramoDeProducao = process.env.CF_PAGES_PRODUCTION_BRANCH ?? "main";
const buildDeProducao = process.env.CF_PAGES === "1" && process.env.CF_PAGES_BRANCH === ramoDeProducao;

const exigidas = readdirSync(join(process.cwd(), "sql", "migrations"))
  .filter((nome) => /^\d{3}_.+\.sql$/.test(nome))
  .map((nome) => nome.replace(/\.sql$/, ""))
  .sort();

if (!manual && !buildDeProducao) {
  console.log(`[schema] verificação não imposta (não é build de produção da Cloudflare). Exigidas: ${exigidas.join(", ")}`);
  process.exit(0);
}

const falhar = (mensagem) => {
  console.error(`\n[schema] DEPLOY RECUSADO: ${mensagem}\n`);
  process.exit(1);
};

if (!process.env.DATABASE_URL) {
  falhar(
    "DATABASE_URL não está disponível no build. Sem ela não há como confirmar que o banco suporta este código. " +
      "Cadastre DATABASE_URL no ambiente Production da Cloudflare Pages.",
  );
}

let aplicadas;
try {
  const sql = neon(process.env.DATABASE_URL);
  const linhas = await sql`select versao from schema_migrations`;
  aplicadas = new Set(linhas.map((l) => l.versao));
} catch (err) {
  if (err?.code === "42P01") {
    falhar("tabela schema_migrations não existe. Aplique sql/migrations/002_atribuicao.sql (ver README).");
  }
  falhar(`não foi possível consultar o banco (${err?.message ?? err}).`);
}

const pendentes = exigidas.filter((v) => !aplicadas.has(v));
if (pendentes.length > 0) {
  falhar(
    `migrations pendentes: ${pendentes.join(", ")}. ` +
      "Aplique-as no Neon (arquivos em sql/migrations/, em ordem) e refaça o deploy.",
  );
}

console.log(`[schema] ok — banco tem ${exigidas.join(", ")}`);
