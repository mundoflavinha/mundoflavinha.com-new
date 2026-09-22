import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { CATEGORIAS_COOKIES, REVISAO_COOKIES } from "@/lib/cookies";
import { AMBIENTES, IDS_DE_TESTE } from "../../e2e/ambientes.mjs";

/**
 * Travas de ARQUITETURA: coisas que nenhum teste de comportamento pega,
 * porque o sintoma é silencioso (duplicidade, tráfego de CI em produção,
 * deploy com schema velho).
 */

const raiz = process.cwd();
const ler = (caminho: string) => readFileSync(join(raiz, caminho), "utf-8");

const arquivos = (dir: string, filtro: RegExp): string[] =>
  readdirSync(join(raiz, dir)).flatMap((nome) => {
    const rel = `${dir}/${nome}`;
    if (statSync(join(raiz, rel)).isDirectory()) return arquivos(rel, filtro);
    return filtro.test(nome) ? [rel] : [];
  });

/**
 * Ids de PRODUÇÃO conhecidos. Listados aqui só para serem PROIBIDOS em
 * qualquer configuração de teste/CI.
 */
const IDS_DE_PRODUCAO = ["G-452LR8P42T", "GTM-WK9NJC7W"];

describe("catálogo de cookies", () => {
  it("Publicidade separada de Estatísticas, não obrigatória, com autoClear", () => {
    const publicidade = CATEGORIAS_COOKIES.find((c) => c.id === "marketing")!;
    expect(CATEGORIAS_COOKIES.map((c) => c.id)).toContain("analytics");
    expect(publicidade.obrigatoria).toBe(false);
    expect(publicidade.cookies.every((k) => k.padrao)).toBe(true);
    expect(REVISAO_COOKIES).toBeGreaterThanOrEqual(3);
  });

  it("não há categoria nem cookie de LinkedIn (sem campanha ativa)", () => {
    expect(JSON.stringify(CATEGORIAS_COOKIES)).not.toMatch(/linkedin|li_fat_id|lidc|bcookie/i);
  });
});

describe("componente → tagging.track → adaptador", () => {
  const PROIBIDOS = [
    { padrao: /\bgtag\s*\(/, nome: "gtag(" },
    { padrao: /\bfbq\b/, nome: "fbq" },
    { padrao: /dataLayer\s*\.\s*push/, nome: "dataLayer.push" },
    { padrao: /googletagmanager\.com|connect\.facebook\.net/, nome: "URL de vendor" },
    { padrao: /tagging\/(vendors|adaptadores)/, nome: "import interno da camada de tagging" },
  ];
  const PERMITIDOS = ["src/lib/tagging/", "src/components/ConsentModeDefaults.astro", "src/test/"];

  it("nada fora de src/lib/tagging fala com vendor", () => {
    const violacoes = arquivos("src", /\.(ts|tsx|astro|js|mjs)$/)
      .filter((arq) => !PERMITIDOS.some((p) => arq.startsWith(p)))
      .flatMap((arq) => PROIBIDOS.filter(({ padrao }) => padrao.test(ler(arq))).map(({ nome }) => `${arq}: ${nome}`));
    expect(violacoes).toEqual([]);
  });

  it("não existe implementação de LinkedIn", () => {
    const tudo = arquivos("src", /\.(ts|tsx|astro)$/)
      .filter((a) => !a.startsWith("src/test/"))
      .map(ler)
      .join("\n");
    expect(tudo).not.toMatch(/snap\.licdn\.com|_linkedin_partner_id|lintrk|li_fat_id/);
  });
});

describe("CI nunca atinge GA4/Meta reais", () => {
  it("nenhum id de produção em configuração de teste ou CI", () => {
    const configs = [".github/workflows/ci.yml", "e2e/ambientes.mjs", "playwright.config.ts", "scripts/build-e2e.mjs"];
    for (const arq of configs) {
      for (const id of IDS_DE_PRODUCAO) expect(ler(arq), `${id} em ${arq}`).not.toContain(id);
    }
  });

  it("ids do e2e são explicitamente de teste", () => {
    expect(IDS_DE_TESTE.ga4).toMatch(/^G-TEST/);
    expect(IDS_DE_TESTE.gtm).toMatch(/^GTM-TEST/);
    expect(IDS_DE_TESTE.metaPixel).toMatch(/^1000000000/);
    expect(JSON.stringify(AMBIENTES)).not.toMatch(new RegExp(IDS_DE_PRODUCAO.join("|")));
  });

  it("todo spec usa a fixture que intercepta a rede", () => {
    const specs = arquivos("e2e", /\.spec\.ts$/);
    expect(specs.length).toBeGreaterThan(0);
    for (const spec of specs) {
      const fonte = ler(spec);
      expect(fonte, spec).toMatch(/from "\.\/fixtures"/);
      expect(fonte, spec).not.toMatch(/import\s*\{[^}]*\b(test|expect)\b[^}]*\}\s*from "@playwright\/test"/);
    }
  });

  it("o Chromium do e2e não resolve DNS dos hosts de medição", () => {
    expect(ler("playwright.config.ts")).toMatch(/--host-resolver-rules=/);
    const hosts = ler("e2e/fixtures.ts");
    for (const h of ["googletagmanager.com", "google-analytics.com", "connect.facebook.net", "facebook.com"]) {
      expect(hosts).toContain(`"${h}"`);
    }
  });

  it("o CI builda pelo script de e2e, não com variáveis soltas", () => {
    const ci = ler(".github/workflows/ci.yml");
    expect(ci).toMatch(/npm run build:e2e/);
    expect(ci).not.toMatch(/PUBLIC_GA_ID:/);
  });
});

describe("schema do banco não depende de procedimento manual silencioso", () => {
  const migrations = readdirSync(join(raiz, "sql/migrations")).filter((n) => /^\d{3}_.+\.sql$/.test(n));

  it("toda migration a partir da 002 registra a própria versão", () => {
    for (const arq of migrations.filter((n) => n >= "002")) {
      const versao = arq.replace(/\.sql$/, "");
      expect(ler(`sql/migrations/${arq}`), arq).toMatch(
        new RegExp(`insert into schema_migrations \\(versao\\) values \\('${versao}'\\)`),
      );
    }
  });

  it("toda migration a partir da 002 tem rollback documentado", () => {
    for (const arq of migrations.filter((n) => n >= "002")) {
      expect(existsSync(join(raiz, "sql/rollback", arq)), arq).toBe(true);
    }
  });

  it("o build roda a trava de schema ANTES do astro build", () => {
    const pkg = JSON.parse(ler("package.json"));
    expect(pkg.scripts.build).toMatch(/^node scripts\/verificar-schema\.mjs && astro build$/);
  });

  it("tabela nova de dado pessoal entra no runbook LGPD de acesso", () => {
    expect(ler("sql/lgpd-runbook.sql")).toMatch(/from lead_attributions/);
  });
});
