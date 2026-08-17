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
  });
});

describe.skipIf(arquivos.length === 0)("imagem de OG padrão", () => {
  it("páginas sem imagem própria usam a imagem estável de public/, não um caminho com hash", () => {
    // Só vale para quem usa o DEFAULT_SEO (home, institucionais, legais) — os
    // artigos passam a própria capa como og:image de propósito (era assim no
    // React original também), e ImageMetadata sempre resolve para /_astro/
    // com hash. A home é o representante mais simples do caso "sem imagem
    // própria": se ela regredir para um path com hash, é sinal de que o
    // default parou de ser lido de public/og-default.webp.
    const html = readFileSync(join(DIST, "index.html"), "utf-8");
    const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
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

  /**
   * O ganho central da migração: só as páginas que PRECISAM de React pagam por
   * ele.
   *
   * A versão anterior deste teste procurava `<script src=...>` e passava
   * sempre — inclusive depois de a home ganhar duas ilhas. O Astro não emite
   * `src` para ilha nenhuma: ele inlina um `<script type="module">` que faz
   * `import("/_astro/Componente.hash.js")`. A regex olhava para um atributo
   * que nunca existiu ali. Verde cobrindo nada.
   *
   * A asserção correta é sobre as duas coisas que o Astro de fato emite: o
   * elemento `<astro-island>` e a referência ao chunk em `/_astro/*.js`.
   */
  const ILHAS_ESPERADAS: Record<string, number> = {
    "/index.html": 2, // NewsletterForm + LeadCaptureModal
    "/downloads/index.html": 1, // LeadCaptureModal
    "/videos/index.html": 1, // GaleriaVideos
    "/blog/20-reais-shopping/index.html": 1, // NewsletterForm no ArtigoLayout
    "/blog/album-da-copa/index.html": 1,
    "/blog/brincadeira-no-carro/index.html": 1,
    "/blog/empreendedorismo-infantil/index.html": 1,
    "/blog/presenca-pequenos-momentos/index.html": 1,
  };

  it.each(conteudosGlobais.map((c) => c.rota))("%s tem exatamente o número de ilhas previsto", (rota) => {
    const { html } = conteudosGlobais.find((c) => c.rota === rota)!;
    const ilhas = (html.match(/<astro-island\b/g) ?? []).length;
    expect(ilhas, `ilhas inesperadas — se foi intencional, declare em ILHAS_ESPERADAS`).toBe(
      ILHAS_ESPERADAS[rota] ?? 0,
    );
  });

  it.each(conteudosGlobais.map((c) => c.rota))("%s só baixa JS de framework se tiver ilha", (rota) => {
    const { html } = conteudosGlobais.find((c) => c.rota === rota)!;
    const chunks = [...new Set(html.match(/_astro\/[A-Za-z0-9_.-]+\.js/g) ?? [])];
    if (ILHAS_ESPERADAS[rota]) {
      expect(chunks.length, "página com ilha deveria carregar pelo menos um chunk").toBeGreaterThan(0);
    } else {
      expect(chunks, `${rota} baixa JS sem ter ilha: ${chunks.join(", ")}`).toEqual([]);
    }
  });

  /**
   * Conteúdo interativo não pode aninhar conteúdo interativo.
   *
   * Não é purismo de spec: o navegador "conserta" o HTML inválido de formas
   * diferentes, o alvo do clique fica ambíguo, e leitor de tela anuncia um
   * controle dentro de outro. Esta classe de bug apareceu três vezes neste
   * código — `<a><button>` nos cards da Loja, `<button><button>` nos cards de
   * /downloads, e `<a><button>` em vários pontos da home — sempre pelo mesmo
   * motivo: o `<Button>` do shadcn renderiza `<button>` e era usado como se
   * fosse um rótulo. A versão Astro usa `<span>` estilizado nesses lugares.
   */
  it("nenhum controle interativo dentro de outro", () => {
    const ABERTURA = /<(a|button)\b[^>]*>/gi;
    const problemas = conteudosGlobais.flatMap(({ rota, html }) => {
      const corpo = html.replace(/<script[\s\S]*?<\/script>/gi, "");
      const pilha: string[] = [];
      const achados: string[] = [];
      // Percorre só as tags de interesse, na ordem, mantendo profundidade.
      for (const trecho of corpo.split(/(?=<\/?(?:a|button)\b)/i)) {
        if (/^<\/(a|button)\b/i.test(trecho)) {
          pilha.pop();
          continue;
        }
        const abre = trecho.match(ABERTURA);
        if (!abre) continue;
        const tag = abre[0].match(/^<(a|button)/i)![1].toLowerCase();
        if (pilha.length > 0) achados.push(`${rota}: <${pilha.join("><")}> contém <${tag}>`);
        pilha.push(tag);
      }
      return achados;
    });

    expect(problemas, problemas.slice(0, 10).join("\n")).toEqual([]);
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
