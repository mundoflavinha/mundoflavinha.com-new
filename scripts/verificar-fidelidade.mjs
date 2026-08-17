#!/usr/bin/env node
/**
 * Confere que nenhuma frase do texto original sobreviveu à migração faltando.
 *
 * Uso:
 *   node scripts/verificar-fidelidade.mjs <arquivo-no-git> <html-em-dist>
 *   node scripts/verificar-fidelidade.mjs src/pages/Contato.tsx dist/contato/index.html
 *
 * Por que existe: portar as páginas legais é transcrever ~700 linhas de texto
 * com valor jurídico. Conferir a olho não é verificação — uma frase omitida no
 * meio de uma Política de Privacidade passa despercebida e muda o documento.
 *
 * Como funciona: extrai do JSX original os trechos de prosa longos o bastante
 * para serem inequívocos, normaliza espaço e pontuação tipográfica, e exige que
 * cada um apareça no HTML gerado. Não prova equivalência total — prova ausência
 * de omissão, que é o risco real aqui.
 *
 * Descartável: serve durante a migração e sai junto com ela.
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const [origem, htmlPath] = process.argv.slice(2);
if (!origem || !htmlPath) {
  console.error("uso: verificar-fidelidade.mjs <arquivo-no-git> <html-em-dist>");
  process.exit(2);
}

const normalizar = (s) =>
  s
    .replace(/\s*␟\s*/g, "␟")
    .replace(/\s+/g, " ")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

const jsx = execSync(`git show main:${origem}`, { encoding: "utf-8" });

// Remove blocos que não são texto visível: imports, comentários e expressões.
const semRuido = jsx
  .replace(/^import[\s\S]*?;$/gm, "")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\/\/.*$/gm, "")
  .replace(/\{["'][^"']*["']\}/g, " ") // {" "} e afins
  // Chaves do objeto de seções (id:, title:, content:) são sintaxe, não prosa.
  // Sem isto, `title: "X",` seguido de `content: (` vira a pseudo-frase
  // `"X", content:`, que obviamente não existe no HTML — falso negativo.
  .replace(/^\s*(?:id|title|content)\s*:/gm, "␟")
  // Interpolações e tags viram uma LACUNA marcada, não espaço: um componente
  // inline no meio da frase (ex.: "escreva para <LegalMailto/>.") corta o
  // texto em dois trechos independentes. Tratar como espaço faria a frase
  // nunca casar com o HTML, onde a lacuna está preenchida.
  .replace(/\{[^{}]*\}/g, "␟")
  .replace(/<[^>]+>/g, "␟")
  .replace(/<\/?>/g, "␟");

/** Sobra de sintaxe que gruda no início/fim das frases e gera falso negativo. */
const limparBordas = (f) =>
  f
    .replace(/^[\s(){}[\],;:>=/"']+/, "")
    .replace(/[\s(){}[\],;=/"']+$/, "")
    .trim();

/** Descarta o que é código, não prosa. */
const ehCodigo = (f) =>
  /=>|\bconst\b|\bexport\b|\bdefault\b|\breturn\b|:\s*\w+\[\]/.test(f) ||
  // Chave de objeto literal do array de seções: o corte em ":" deixa trechos
  // como `"Alterações, lei aplicável e contato", content:` — sintaxe, não texto.
  // Só dispara quando o trecho TERMINA na chave; "content"/"title"/"id" são
  // identificadores em inglês, não aparecem na prosa dos documentos.
  /\b(?:id|title|content)\s*:$/.test(f);

// Frases longas são inequívocas; trechos curtos geram falso positivo.
const frases = [
  ...new Set(
    normalizar(semRuido)
      .split(/␟|(?<=[.!?:])\s+/)
      .map(limparBordas)
      .filter((f) => f.length >= 45 && /[a-zà-ú]{4}/i.test(f) && !ehCodigo(f)),
  ),
];

const html = normalizar(
  readFileSync(htmlPath, "utf-8")
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " "),
);

const faltando = frases.filter((f) => !html.includes(f));

console.log(`${origem} -> ${htmlPath}`);
console.log(`  frases longas conferidas: ${frases.length}`);
console.log(`  ausentes no HTML: ${faltando.length}`);

if (faltando.length > 0) {
  console.log("");
  for (const f of faltando.slice(0, 12)) console.log(`  ✗ ${f.slice(0, 150)}`);
  if (faltando.length > 12) console.log(`  … e mais ${faltando.length - 12}`);
  process.exit(1);
}
console.log("  ✓ nenhuma frase se perdeu");
