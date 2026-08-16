import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Trava de resolução ESM das Vercel Functions.
 *
 * `package.json` tem `"type": "module"`, então os arquivos de `api/` rodam sob
 * ESM NATIVO do Node — onde um import relativo sem extensão explícita estoura
 * `ERR_MODULE_NOT_FOUND` em runtime. Nada disso é pego por typecheck, lint ou
 * pelos outros testes: todos usam resolução de bundler (`moduleResolution:
 * "bundler"` no tsconfig, Vite no Vitest), que aceita import sem extensão.
 *
 * Foi exatamente assim que `POST /api/lead` foi para produção quebrado: ao
 * extrair `leadSchema.ts` de `api/lead.ts`, o import de `./consent` ficou sem
 * `.js`. CI verde, 100 testes passando, endpoint retornando 500
 * FUNCTION_INVOCATION_FAILED a cada cadastro.
 *
 * Este teste varre os arquivos que a API de fato carrega e exige extensão
 * explícita em todo import relativo.
 */

/** Os mesmos arquivos listados em tsconfig.api.json — o que a `api/` carrega. */
const ARQUIVOS_DA_API = [
  "api/lead.ts",
  "api/videos.ts",
  "src/lib/consent.ts",
  "src/lib/leadSchema.ts",
  "src/lib/youtubeFetcher.ts",
];

/** Captura o especificador de `import ... from "x"`, `export ... from "x"` e `import("x")`. */
const ESPECIFICADORES = /(?:\bfrom|\bimport)\s*\(?\s*["']([^"']+)["']/g;

const importsRelativos = (conteudo: string) => {
  const encontrados: string[] = [];
  for (const [, spec] of conteudo.matchAll(ESPECIFICADORES)) {
    if (spec.startsWith(".")) encontrados.push(spec);
  }
  return encontrados;
};

describe("resolução ESM dos arquivos carregados pela api/", () => {
  it.each(ARQUIVOS_DA_API)("%s: todo import relativo tem extensão explícita", (relativo) => {
    const caminho = join(process.cwd(), relativo);
    const conteudo = readFileSync(caminho, "utf-8");

    const semExtensao = importsRelativos(conteudo).filter((spec) => !/\.(js|mjs|cjs|json)$/.test(spec));

    expect(
      semExtensao,
      `${relativo} importa ${semExtensao.map((s) => `"${s}"`).join(", ")} sem extensão. ` +
        `Sob ESM nativo do Node isso é ERR_MODULE_NOT_FOUND em runtime — a Function ` +
        `retorna 500 e o CI não acusa. Use a extensão .js (mesmo importando um .ts).`,
    ).toEqual([]);
  });

  it("a lista aqui cobre o mesmo que tsconfig.api.json inclui", () => {
    // Se alguém adicionar um módulo ao include da API e esquecer deste teste, a
    // trava deixa de cobrir esse arquivo silenciosamente.
    const tsconfig = readFileSync(join(process.cwd(), "tsconfig.api.json"), "utf-8");
    const include: string[] = JSON.parse(tsconfig.replace(/\/\/.*$/gm, "")).include;

    const declaradosEmSrc = include.filter((i) => i.endsWith(".ts")).sort();
    const cobertosEmSrc = ARQUIVOS_DA_API.filter((a) => a.startsWith("src/")).sort();

    expect(cobertosEmSrc, "ARQUIVOS_DA_API divergiu do include de tsconfig.api.json").toEqual(
      declaradosEmSrc,
    );
  });
});
