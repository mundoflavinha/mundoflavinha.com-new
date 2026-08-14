#!/usr/bin/env node
/**
 * Otimização de imagens — issue #6.
 *
 * Script one-off: roda manualmente, uma vez, NÃO entra no pipeline de build
 * e não fica dependência de nada (usa `npx sharp-cli` sob demanda, nada é
 * adicionado a package.json).
 *
 * Uso:
 *   node scripts/optimize-images.mjs generate   # fase 1: gera .webp ao lado dos originais
 *   node scripts/optimize-images.mjs apply      # fase 2: reescreve imports, apaga originais
 *
 * Rode "generate", confira visualmente uma amostra dos .webp, e só então "apply".
 */

import { execFileSync } from "node:child_process";
import { readdirSync, statSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join, extname, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const ASSETS_DIR = join(ROOT, "src/assets");
const SRC_DIR = join(ROOT, "src");
const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg"]);
const MAX_DIMENSION = 1600;
const QUALITY = 80;

const mode = process.argv[2];
if (!["generate", "apply"].includes(mode)) {
  console.error("Uso: node scripts/optimize-images.mjs <generate|apply>");
  process.exit(1);
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full, out);
    } else if (IMAGE_EXTS.has(extname(entry).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

function walkFiles(dir, exts, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === "node_modules" || entry === "dist") continue;
      walkFiles(full, exts, out);
    } else if (exts.has(extname(entry).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

const images = walk(ASSETS_DIR);
console.log(`Encontradas ${images.length} imagens (.png/.jpg/.jpeg) em src/assets/`);

if (mode === "generate") {
  let done = 0;
  let skipped = 0;
  for (const file of images) {
    try {
      execFileSync(
        "npx",
        [
          "--yes",
          "sharp-cli",
          "-i",
          file,
          "-o",
          join(file, ".."),
          "-f",
          "webp",
          "-q",
          String(QUALITY),
          "resize",
          String(MAX_DIMENSION),
          "--fit",
          "inside",
          "--withoutEnlargement",
        ],
        { stdio: ["ignore", "ignore", "inherit"] },
      );
      done++;
      if (done % 20 === 0) console.log(`  ${done}/${images.length}...`);
    } catch (err) {
      skipped++;
      console.error(`  falhou: ${relative(ROOT, file)} — ${err instanceof Error ? err.message : err}`);
    }
  }
  console.log(`\nGerados: ${done}. Falharam: ${skipped}.`);
  console.log("Confira uma amostra dos .webp antes de rodar a fase 'apply'.");
}

if (mode === "apply") {
  // 1. Reescreve os imports em todo src/ trocando .png/.jpg/.jpeg -> .webp,
  //    só para caminhos que apontem para src/assets e que tenham um .webp
  //    gerado de verdade (evita trocar extensão de imagem que não foi processada).
  const codeFiles = walkFiles(SRC_DIR, new Set([".ts", ".tsx"]));
  let filesChanged = 0;
  let importsChanged = 0;

  const importRegex = /(["'])(@\/assets\/[^"']+?)\.(png|jpe?g)\1/gi;

  for (const codeFile of codeFiles) {
    const content = readFileSync(codeFile, "utf8");
    let changedHere = 0;

    const newContent = content.replace(importRegex, (match, quote, assetPath) => {
      const webpCandidate = join(ASSETS_DIR, assetPath.replace(/^@\/assets\//, "") + ".webp");
      try {
        statSync(webpCandidate);
      } catch {
        return match; // não foi gerado (falhou na fase generate, ou não existe) — não mexe
      }
      changedHere++;
      return `${quote}${assetPath}.webp${quote}`;
    });

    if (changedHere > 0) {
      writeFileSync(codeFile, newContent);
      filesChanged++;
      importsChanged += changedHere;
    }
  }

  console.log(`Imports atualizados: ${importsChanged} em ${filesChanged} arquivos.`);

  // 2. Remove os .png/.jpg originais que têm um .webp irmão (gerado com sucesso).
  let removed = 0;
  for (const file of images) {
    const webpPath = file.replace(/\.(png|jpe?g)$/i, ".webp");
    try {
      statSync(webpPath);
      unlinkSync(file);
      removed++;
    } catch {
      console.warn(`  mantendo (sem .webp correspondente): ${relative(ROOT, file)}`);
    }
  }
  console.log(`Originais removidos: ${removed}.`);
}
