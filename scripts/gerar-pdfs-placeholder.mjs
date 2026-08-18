#!/usr/bin/env node
/**
 * Gera PDFs de MARCAÇÃO para os materiais gratuitos.
 *
 * Por que existe: os PDFs reais nunca estiveram no repositório, então o botão
 * "Baixar agora" do modal sempre apontou para um 404 — em produção. Sem um
 * arquivo no lugar certo não dá para testar o funil de ponta a ponta (lead
 * gravado no banco -> tela de sucesso -> download).
 *
 * Cada arquivo diz, em letras grandes, que é de teste. Isso é proposital: se
 * um deles escapar para produção, quem baixar vê imediatamente que está errado,
 * em vez de receber uma página em branco achando que é o material.
 *
 * Descartável: apaga junto com este script assim que os PDFs reais entrarem.
 *
 * Uso: node scripts/gerar-pdfs-placeholder.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DESTINO = join(process.cwd(), "public", "materiais");

/** Precisa espelhar MATERIAIS em src/data/materiais.ts. O teste cobre o desvio. */
const MATERIAIS = [
  { arquivo: "jogo-da-reciclagem.pdf", nome: "Jogo da Reciclagem" },
  { arquivo: "cada-tampinha-no-seu-lugar.pdf", nome: "Cada Tampinha no Seu Lugar" },
  { arquivo: "semaforo-do-toque.pdf", nome: "Semaforo do Toque" },
  { arquivo: "colete-educativo.pdf", nome: "Colete Educativo" },
];

/** Marcador que o teste procura para avisar que ainda é placeholder. */
export const MARCADOR_PLACEHOLDER = "ARQUIVO DE TESTE";

// PDF escrito à mão: são 4 arquivos de uma página com texto em Helvetica.
// Trazer uma biblioteca de PDF para isso seria uma dependência permanente a
// serviço de algo temporário.
const escaparTextoPdf = (texto) => texto.replace(/([\\()])/g, "\\$1");

const montarPdf = (nome) => {
  const linhas = [
    { y: 640, tamanho: 28, texto: MARCADOR_PLACEHOLDER },
    { y: 600, tamanho: 16, texto: "Este NAO e o material real." },
    { y: 560, tamanho: 18, texto: nome },
    { y: 500, tamanho: 12, texto: "Placeholder gerado por scripts/gerar-pdfs-placeholder.mjs" },
    { y: 480, tamanho: 12, texto: "para validar o fluxo de download durante a migracao." },
    { y: 440, tamanho: 12, texto: "Substitua por public/materiais/ com o PDF definitivo." },
  ];

  const conteudo =
    "BT\n" +
    linhas
      .map(({ y, tamanho, texto }) => `/F1 ${tamanho} Tf\n72 ${y} Td\n(${escaparTextoPdf(texto)}) Tj\n1 0 0 1 0 0 Tm\n`)
      .join("") +
    "ET\n";

  const objetos = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${Buffer.byteLength(conteudo, "latin1")} >>\nstream\n${conteudo}endstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];

  let pdf = "%PDF-1.4\n";
  const deslocamentos = [];
  objetos.forEach((corpo, indice) => {
    deslocamentos.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${indice + 1} 0 obj\n${corpo}\nendobj\n`;
  });

  const inicioXref = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objetos.length + 1}\n0000000000 65535 f \n`;
  for (const deslocamento of deslocamentos) {
    pdf += `${String(deslocamento).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objetos.length + 1} /Root 1 0 R >>\nstartxref\n${inicioXref}\n%%EOF\n`;

  return Buffer.from(pdf, "latin1");
};

mkdirSync(DESTINO, { recursive: true });
for (const { arquivo, nome } of MATERIAIS) {
  const caminho = join(DESTINO, arquivo);
  writeFileSync(caminho, montarPdf(nome));
  console.log(`  ✓ ${arquivo}`);
}
console.log(`\n${MATERIAIS.length} PDFs de marcação em public/materiais/.`);
console.log("Lembrete: substitua pelos arquivos reais antes de ir a produção.");
