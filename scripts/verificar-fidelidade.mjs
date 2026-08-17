#!/usr/bin/env node
/**
 * Confere que nenhuma frase do texto original sobreviveu à migração faltando.
 *
 * Uso:
 *   node scripts/verificar-fidelidade.mjs <arquivo-no-git> <html-em-dist>
 *   node scripts/verificar-fidelidade.mjs src/pages/Contato.tsx dist/contato/index.html
 *
 * Por que existe: portar as páginas legais e de conteúdo é transcrever texto
 * com valor jurídico ou editorial. Conferir a olho não é verificação — uma
 * frase omitida no meio de um documento passa despercebida e muda o sentido.
 *
 * Como funciona (v2 — reescrito depois que a v1 baseada em "stripar sintaxe e
 * re-fatiar em frases" mostrou um ponto cego real: objetos literais de uma
 * linha só, como `{ title: "...", desc: "..." }` em arrays de dados, eram
 * INTEIRAMENTE descartados pela regra que tratava `{...}` como expressão JSX
 * — perdendo o texto sem sequer reportar ausência. Duas estratégias
 * independentes, cujo objetivo é achar cada string literal de prosa sem
 * depender de reconstruir a sintaxe ao redor):
 *
 *   (A) todo literal de string entre aspas duplas no arquivo inteiro — cobre
 *       texto dentro de arrays/objetos de dados (`desc: "..."`, arrays de
 *       parágrafos, tuplas [pergunta, resposta] etc.)
 *   (B) todo texto puro entre tags JSX (`<p>Isto aqui.</p>`) — cobre prosa
 *       que NÃO está entre aspas, como os parágrafos escritos direto no JSX
 *       das páginas institucionais/legais.
 *
 * Cada candidato é filtrado por: comprimento mínimo, tem que conter um
 * caractere acentuado do português (todo o conteúdo real é em pt-BR; classes
 * Tailwind e paths de asset não têm acento) e não pode ser claramente um path
 * de arquivo. Não prova equivalência total — prova ausência de omissão, que é
 * o risco real aqui.
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

const MIN_LEN = 30;
const TEM_ACENTO_PTBR = /[à-üÀ-Ü]/;
const PARECE_PATH_OU_CODIGO = /^[@./][\w./-]*$|^https?:\/\/|\.(webp|png|jpe?g|svg|ts|tsx|astro)(\?|$)/i;

const normalizarEspaco = (s) =>
  s
    .replace(/\s+/g, " ")
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

const ehProsaCandidata = (s) => {
  if (s.length < MIN_LEN) return false;
  if (!TEM_ACENTO_PTBR.test(s) && !/[,.]\s/.test(s)) return false; // sem acento E sem pontuação de frase
  if (PARECE_PATH_OU_CODIGO.test(s)) return false;
  if (!s.includes(" ")) return false; // prosa sempre tem espaço; um token só não é frase
  return true;
};

const jsx = execSync(`git show main:${origem}`, { encoding: "utf-8" });
const semImportsEComentarios = jsx
  .replace(/^import[\s\S]*?;$/gm, "")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  // `//` só é comentário quando NÃO precedido por `:` — senão isto arranca o
  // resto de qualquer "https://..." (URL em CONTATO/ROTAS_LEGAIS/href), o que
  // desalinha a contagem de aspas e faz o regex de string literal juntar dois
  // literais não relacionados numa "frase" de sintaxe pura. Bug real: derrubou
  // a checagem inteira de todo arquivo com uma URL antes de qualquer prosa.
  .replace(/(?<!:)\/\/.*$/gm, "");

// (A) literais de string entre aspas duplas — captura \" escapado.
const literaisDeString = [...semImportsEComentarios.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) =>
  normalizarEspaco(m[1].replace(/\\"/g, '"')),
);

// (B) texto puro dentro de uma tag FOLHA — abre, só texto (sem `<` nem `{`
// no meio), fecha. Só isso é seguro de extrair sem entender JSX de verdade:
// um <LegalP> com link inline no meio (`<LegalP>texto <Link>x</Link> mais
// texto</LegalP>`) tem estrutura aninhada que uma regex não reconstrói
// corretamente — melhor não extrair essa prosa aqui do que extrair fragmento
// errado. A prosa com link inline já está coberta pelos literais de string
// dos textos ao redor do link, quando estes são longos o bastante sozinhos.
const textoEntreTags = [...semImportsEComentarios.matchAll(/<[A-Za-z][\w.]*(?:\s[^>]*)?>([^<>{}]{20,})<\/[A-Za-z][\w.]*>/g)].map(
  (m) => normalizarEspaco(m[1]),
);

const frases = [...new Set([...literaisDeString, ...textoEntreTags])].filter(ehProsaCandidata);

const htmlBruto = readFileSync(htmlPath, "utf-8");

// alt/title/aria-label são atributos, então SOMEM se a tag inteira for
// removida — texto de imagem (importante para acessibilidade e SEO) nunca
// seria conferido. Extrai o valor antes de descartar a tag.
const valoresDeAtributo = [...htmlBruto.matchAll(/\s(?:alt|title|aria-label)="([^"]*)"/g)].map((m) => m[1]);

const html = normalizarEspaco(
  [
    htmlBruto
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " "),
    ...valoresDeAtributo,
  ].join(" "),
);

const faltando = frases.filter((f) => !html.includes(f));

console.log(`${origem} -> ${htmlPath}`);
console.log(`  frases conferidas: ${frases.length}`);
console.log(`  ausentes no HTML: ${faltando.length}`);

if (faltando.length > 0) {
  console.log("");
  for (const f of faltando.slice(0, 15)) console.log(`  ✗ ${f.slice(0, 150)}`);
  if (faltando.length > 15) console.log(`  … e mais ${faltando.length - 15}`);
  process.exit(1);
}
console.log("  ✓ nenhuma frase se perdeu");
