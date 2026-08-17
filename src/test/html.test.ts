import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Asserções sobre o HTML REALMENTE GERADO em dist/.
 *
 * Substitui o antigo seo.test.tsx, que renderizava React em jsdom e checava o
 * `document` — verificação indireta de uma coisa que agora podemos ler direto.
 * Mais forte por dois motivos: valida a saída que vai para o ar (e que o
 * crawler lê), e pega problemas de build que o teste de componente não veria.
 *
 * Exige `npm run build` antes — está no script `test:html`, separado de
 * `npm test` justamente porque depende de artefato de build.
 */

const DIST = join(process.cwd(), "dist");

const paginas = (dir: string): string[] => {
  if (!existsSync(dir)) return [];
  const saida: string[] = [];
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) saida.push(...paginas(caminho));
    else if (nome.endsWith(".html")) saida.push(caminho);
  }
  return saida;
};

const rotaDe = (arquivo: string) => "/" + relative(DIST, arquivo).split(sep).join("/");

const arquivos = paginas(DIST);
const conteudosGlobais = arquivos.map((f) => ({ rota: rotaDe(f), html: readFileSync(f, "utf-8") }));

describe("dist/ existe", () => {
  it("o build foi rodado antes deste teste", () => {
    expect(
      arquivos.length,
      "Nenhum .html em dist/. Rode `npm run build` antes de `npm run test:html`.",
    ).toBeGreaterThan(0);
  });
});

describe.skipIf(arquivos.length === 0)("toda página gerada", () => {
  const conteudos = arquivos.map((f) => ({ rota: rotaDe(f), html: readFileSync(f, "utf-8") }));

  it.each(conteudos.map((c) => c.rota))("%s tem <title> não vazio", (rota) => {
    const { html } = conteudos.find((c) => c.rota === rota)!;
    const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1];
    expect(titulo?.trim()).toBeTruthy();
  });

  it.each(conteudos.map((c) => c.rota))("%s tem exatamente UMA meta description", (rota) => {
    const { html } = conteudos.find((c) => c.rota === rota)!;
    const ocorrencias = html.match(/<meta\s+name="description"/g) ?? [];
    // Já foi bug real: o index.html estático duplicava a tag e buscadores usam
    // a PRIMEIRA ocorrência — a genérica, não a da rota.
    expect(ocorrencias.length).toBe(1);
  });

  it.each(conteudos.map((c) => c.rota))("%s tem canonical absoluto", (rota) => {
    const { html } = conteudos.find((c) => c.rota === rota)!;
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    expect(canonical).toMatch(/^https:\/\/mundoflavinha\.com/);
  });

  it.each(conteudos.map((c) => c.rota))("%s tem og:image absoluta", (rota) => {
    const { html } = conteudos.find((c) => c.rota === rota)!;
    const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    expect(og).toMatch(/^https:\/\//);
    // A imagem de OG mora em public/ de propósito: URL sem hash, estável entre
    // deploys, porque crawler social não revalida.
    expect(og).not.toMatch(/\/_astro\//);
  });
});

describe.skipIf(arquivos.length === 0)("regras específicas", () => {
  it("a home NÃO ganha o sufixo '| Mundo Flavinha'", () => {
    const html = readFileSync(join(DIST, "index.html"), "utf-8");
    const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    expect(titulo).toBe("Mundo Flavinha — Menos telas, mais infância");
  });

  it("a 404 ganha noindex", () => {
    const html = readFileSync(join(DIST, "404.html"), "utf-8");
    expect(html).toMatch(/<meta name="robots" content="noindex">/);
  });

  it("nenhuma página estática carrega runtime de framework", () => {
    // O ganho central da migração. Se um <script src> de framework aparecer
    // numa página que não deveria ter island, algo virou island sem querer.
    const home = readFileSync(join(DIST, "index.html"), "utf-8");
    const scriptsExternos = home.match(/<script[^>]+src="([^"]+)"/g) ?? [];
    expect(scriptsExternos, `home carregou: ${scriptsExternos.join(", ")}`).toEqual([]);
  });

  it("todo <img> sai com width e height", () => {
    // Esta é a asserção que dataIntegrity.test.ts NÃO faz: aqui lemos o HTML
    // real, onde ImageMetadata já virou atributo. Sem width/height o browser
    // não reserva espaço e a página salta enquanto carrega — o site inteiro
    // tinha isso antes da migração.
    const semDimensao = conteudosGlobais.flatMap(({ rota, html }) =>
      (html.match(/<img\b[^>]*>/g) ?? [])
        .filter((tag) => !/\bwidth=/.test(tag) || !/\bheight=/.test(tag))
        .map((tag) => `${rota}: ${tag.slice(0, 90)}`),
    );
    expect(semDimensao, semDimensao.join("\n")).toEqual([]);
  });

  it("robots.txt aponta para o sitemap que o Astro realmente emite", () => {
    const robots = readFileSync(join(DIST, "robots.txt"), "utf-8");
    const apontado = robots.match(/^Sitemap:\s*(\S+)$/m)?.[1];
    expect(apontado, "robots.txt sem linha Sitemap:").toBeTruthy();

    const nomeArquivo = apontado!.split("/").pop()!;
    expect(
      existsSync(join(DIST, nomeArquivo)),
      `robots.txt aponta para ${nomeArquivo}, que não existe em dist/`,
    ).toBe(true);
  });
});
