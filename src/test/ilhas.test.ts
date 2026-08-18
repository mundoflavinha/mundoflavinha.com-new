import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { MATERIAIS } from "@/data/materiais";

/**
 * Travas das três ilhas React.
 *
 * A migração só compensa se o JavaScript ficar restrito a elas. O risco não é
 * alguém acrescentar uma ilha de propósito — é um import inocente arrastar de
 * volta uma biblioteca que a migração inteira serviu para remover.
 *
 * Este teste varre o grafo de imports A PARTIR das raízes das ilhas. Uma
 * dependência proibida entra tipicamente por caminho indireto: um componente
 * de UI compartilhado que importa `Link` do react-router, por exemplo. Foi
 * exatamente o caso de `consentText.tsx`, que teria estourado em runtime
 * dentro da ilha porque não existe <Router> acima dela.
 */

const RAIZ = process.cwd();

const RAIZES_DAS_ILHAS = [
  "src/components/NewsletterForm.tsx",
  "src/components/LeadCaptureModal.tsx",
  "src/components/GaleriaVideos.tsx",
];

/**
 * Pacotes que saem do projeto na Fase 6. Alcançar qualquer um deles a partir de
 * uma ilha significa ou que o JS voltou a crescer, ou — no caso do
 * react-router — que a página vai quebrar em runtime.
 */
const PROIBIDOS = ["react-router-dom", "react-router", "framer-motion", "react-helmet-async", "@tanstack/react-query"];

const ESPECIFICADORES = /(?:\bfrom|\bimport)\s*\(?\s*["']([^"']+)["']/g;

const resolverLocal = (spec: string, arquivoAtual: string): string | null => {
  const base = spec.startsWith("@/")
    ? join(RAIZ, "src", spec.slice(2))
    : spec.startsWith(".")
      ? resolve(dirname(arquivoAtual), spec)
      : null;
  if (!base) return null;

  for (const candidato of [base, `${base}.ts`, `${base}.tsx`, join(base, "index.ts"), join(base, "index.tsx")]) {
    if (existsSync(candidato) && !candidato.endsWith("/")) {
      try {
        if (readFileSync(candidato).length >= 0) return candidato;
      } catch {
        /* diretório: segue para o próximo candidato */
      }
    }
  }
  return null;
};

/** Devolve todo arquivo do projeto alcançável a partir da raiz, e os pacotes citados. */
const varrer = (raiz: string) => {
  const visitados = new Set<string>();
  const pacotes = new Map<string, string>(); // pacote -> quem importou
  const fila = [join(RAIZ, raiz)];

  while (fila.length > 0) {
    const arquivo = fila.pop()!;
    if (visitados.has(arquivo)) continue;
    visitados.add(arquivo);

    const conteudo = readFileSync(arquivo, "utf-8");
    for (const [, spec] of conteudo.matchAll(ESPECIFICADORES)) {
      const local = resolverLocal(spec, arquivo);
      if (local) {
        fila.push(local);
      } else if (!spec.startsWith(".") && !spec.startsWith("@/")) {
        const pacote = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
        if (!pacotes.has(pacote)) pacotes.set(pacote, arquivo.replace(`${RAIZ}/`, ""));
      }
    }
  }

  return { arquivos: visitados, pacotes };
};

describe("grafo de dependências das ilhas", () => {
  it.each(RAIZES_DAS_ILHAS)("%s não alcança nenhuma dependência banida", (raiz) => {
    const { pacotes } = varrer(raiz);
    const encontrados = PROIBIDOS.filter((p) => pacotes.has(p)).map((p) => `${p} (via ${pacotes.get(p)})`);

    expect(
      encontrados,
      `A ilha ${raiz} alcança: ${encontrados.join(", ")}. ` +
        `react-router quebra em RUNTIME dentro de uma ilha (não há <Router> acima dela); ` +
        `os demais só engordam o bundle que a migração existe para enxugar.`,
    ).toEqual([]);
  });

  it("a varredura realmente enxerga imports indiretos", () => {
    // Prova que o teste acima não passa por vacuidade: LeadCaptureModal não
    // importa consentText diretamente — chega lá via ConsentFields. Se a
    // varredura parasse no primeiro nível, o bug do react-router teria passado.
    const { arquivos } = varrer("src/components/LeadCaptureModal.tsx");
    const caminhos = [...arquivos].map((a) => a.replace(`${RAIZ}/`, ""));

    expect(caminhos).toContain("src/components/ConsentFields.tsx");
    expect(caminhos, "consentText só é alcançável em 2º nível — é o caso que importa").toContain(
      "src/lib/consentText.tsx",
    );
  });
});

describe("catálogo de materiais", () => {
  it.each(MATERIAIS.map((m) => m.id))("%s: o PDF existe em public/", (id) => {
    const material = MATERIAIS.find((m) => m.id === id)!;
    const caminho = join(RAIZ, "public", material.pdf);

    expect(
      existsSync(caminho),
      `${material.pdf} não existe. O modal grava o lead e manda a pessoa para um 404 — ` +
        `falha silenciosa do lado de quem se cadastrou.`,
    ).toBe(true);
  });

  it("todo material tem id, nome e pdf distintos", () => {
    const ids = MATERIAIS.map((m) => m.id);
    const pdfs = MATERIAIS.map((m) => m.pdf);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(pdfs).size).toBe(pdfs.length);
  });

  it("os arquivos de public/ que o site referencia estão versionados", () => {
    // O deploy parte do GIT, não do disco. Um arquivo presente localmente mas
    // não commitado faz o build passar aqui e servir 404 em produção — falha
    // que nenhum teste sobre dist/ pega, porque dist/ é gerado da cópia local.
    //
    // Aconteceu de verdade: o ~/.gitignore_global desta máquina tem uma regra
    // `public` que excluía a pasta inteira, e og-default.webp — o og:image de
    // todas as páginas — nunca entrou no repositório.
    const rastreados = new Set(
      execSync("git ls-files public/", { encoding: "utf-8" }).trim().split("\n").filter(Boolean),
    );

    const obrigatorios = ["public/og-default.webp", "public/robots.txt", ...MATERIAIS.map((m) => `public${m.pdf}`)];
    const faltando = obrigatorios.filter((caminho) => !rastreados.has(caminho));

    expect(
      faltando,
      `Estes arquivos existem no disco mas NÃO estão no git: ${faltando.join(", ")}. ` +
        `O build da Vercel não os terá. Verifique .gitignore (inclusive o global).`,
    ).toEqual([]);
  });

  it("os PDFs ainda são de marcação — troque pelos reais antes de publicar", () => {
    // Não falha: é um lembrete visível, porque o funil FUNCIONA com eles e por
    // isso é fácil esquecer. Vira falha de verdade quando os originais entrarem
    // e alguém reintroduzir um placeholder por engano.
    const placeholders = MATERIAIS.filter((m) => {
      const caminho = join(RAIZ, "public", m.pdf);
      return existsSync(caminho) && readFileSync(caminho, "latin1").includes("ARQUIVO DE TESTE");
    }).map((m) => m.pdf);

    if (placeholders.length > 0) {
      console.warn(`\n  ⚠ PDFs de marcação em uso (${placeholders.length}/${MATERIAIS.length}):`);
      for (const pdf of placeholders) console.warn(`      ${pdf}`);
      console.warn("    Gere os definitivos e apague scripts/gerar-pdfs-placeholder.mjs.\n");
    }
    expect(placeholders.length).toBeLessThanOrEqual(MATERIAIS.length);
  });
});
