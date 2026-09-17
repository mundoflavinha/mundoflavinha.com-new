import { describe, expect, it } from "vitest";
import { resolverConfiguracao, type AmbienteDeTagging } from "@/lib/tagging/configuracao";

const GA = { PUBLIC_GA_ENABLED: "true", PUBLIC_GA_ID: "G-TEST000000" };
const PIXEL = { PUBLIC_META_PIXEL_ENABLED: "true", PUBLIC_META_PIXEL_ID: "100000000000001" };
const GTM = { PUBLIC_GTM_ID: "GTM-TEST000" };

const erros = (env: AmbienteDeTagging, opcoes?: { exigirModoExplicito?: boolean }) => {
  const r = resolverConfiguracao(env, opcoes);
  return r.ok ? [] : r.erros;
};

describe("modo de tagging", () => {
  it("sem variável → disabled (dev/local)", () => {
    expect(resolverConfiguracao({})).toMatchObject({ ok: true, configuracao: { modo: "disabled" } });
  });

  it("sem variável em build da Cloudflare → ERRO, não desligamento silencioso", () => {
    expect(erros({}, { exigirModoExplicito: true }).join()).toMatch(/obrigatória/);
  });

  it("valor desconhecido é erro, não fallback", () => {
    expect(erros({ PUBLIC_TAGGING_MODE: "GTM" }).join()).toMatch(/inválido/);
    expect(erros({ PUBLIC_TAGGING_MODE: "drect" }).join()).toMatch(/inválido/);
  });

  it("direct com GA4 e Pixel", () => {
    expect(resolverConfiguracao({ PUBLIC_TAGGING_MODE: "direct", ...GA, ...PIXEL })).toMatchObject({
      ok: true,
      configuracao: { modo: "direct", ga4: { measurementId: "G-TEST000000" }, metaPixel: { pixelId: "100000000000001" } },
    });
  });

  it("gtm só com o container", () => {
    expect(resolverConfiguracao({ PUBLIC_TAGGING_MODE: "gtm", ...GTM })).toMatchObject({
      ok: true,
      configuracao: { modo: "gtm", gtmId: "GTM-TEST000" },
    });
  });
});

describe("combinações que produziriam duplicidade são ERRO", () => {
  it("gtm + GA4 direto", () => {
    expect(erros({ PUBLIC_TAGGING_MODE: "gtm", ...GTM, ...GA }).join()).toMatch(/PUBLIC_GA_ENABLED=true é incompatível/);
  });

  it("gtm + Meta direto", () => {
    expect(erros({ PUBLIC_TAGGING_MODE: "gtm", ...GTM, ...PIXEL }).join()).toMatch(
      /PUBLIC_META_PIXEL_ENABLED=true é incompatível/,
    );
  });

  it("variáveis do desenho anterior são rejeitadas com instrução de migração", () => {
    expect(erros({ PUBLIC_TAGGING_MODE: "direct", ...GA, PUBLIC_GTM_ENABLED: "true" }).join()).toMatch(
      /PUBLIC_GTM_ENABLED foi removida: use PUBLIC_TAGGING_MODE=gtm/,
    );
    expect(erros({ PUBLIC_TAGGING_MODE: "direct", ...GA, PUBLIC_COOKIE_CONSENT_ENABLED: "true" }).join()).toMatch(
      /foi removida/,
    );
  });

  it("INVARIANTE: nenhuma configuração válida carrega GTM junto com provider direto", () => {
    // Varre o produto cartesiano das variáveis relevantes. O tipo já impede o
    // estado; isto impede que alguém afrouxe a validação sem perceber.
    const valores = {
      PUBLIC_TAGGING_MODE: ["", "direct", "gtm", "disabled"],
      PUBLIC_GA_ENABLED: ["", "true", "false"],
      PUBLIC_GA_ID: ["", "G-TEST000000"],
      PUBLIC_META_PIXEL_ENABLED: ["", "true", "false"],
      PUBLIC_META_PIXEL_ID: ["", "100000000000001"],
      PUBLIC_GTM_ID: ["", "GTM-TEST000"],
    };
    const chaves = Object.keys(valores) as (keyof typeof valores)[];
    let combinacoes: AmbienteDeTagging[] = [{}];
    for (const chave of chaves) {
      combinacoes = combinacoes.flatMap((env) => valores[chave].map((v) => ({ ...env, [chave]: v })));
    }

    let validas = 0;
    for (const env of combinacoes) {
      const r = resolverConfiguracao(env);
      if (!r.ok) continue;
      validas++;
      const c = r.configuracao as Record<string, unknown>;
      const temGtm = c.modo === "gtm";
      const temDireto = Boolean(c.ga4) || Boolean(c.metaPixel);
      expect(temGtm && temDireto, JSON.stringify(env)).toBe(false);
    }
    expect(validas).toBeGreaterThan(0);
  });
});

describe("validação de ids", () => {
  it("flag ligada sem id é erro visível", () => {
    expect(erros({ PUBLIC_TAGGING_MODE: "direct", PUBLIC_GA_ENABLED: "true" }).join()).toMatch(/exige PUBLIC_GA_ID/);
  });

  it("formato errado é erro", () => {
    expect(erros({ PUBLIC_TAGGING_MODE: "direct", PUBLIC_GA_ENABLED: "true", PUBLIC_GA_ID: "UA-123-1" }).join()).toMatch(
      /formato/,
    );
    expect(erros({ PUBLIC_TAGGING_MODE: "gtm", PUBLIC_GTM_ID: "G-TEST000000" }).join()).toMatch(/formato/);
  });

  it("booleano ambíguo é erro", () => {
    expect(erros({ PUBLIC_TAGGING_MODE: "direct", PUBLIC_GA_ENABLED: "1", PUBLIC_GA_ID: "G-TEST000000" }).join()).toMatch(
      /use "true" ou "false"/,
    );
  });

  it("direct sem nenhum provider é erro: a intenção é disabled", () => {
    expect(erros({ PUBLIC_TAGGING_MODE: "direct" }).join()).toMatch(/use "disabled"/);
  });

  it("GTM_ID em modo direct é permitido (container em auditoria), com aviso", () => {
    const r = resolverConfiguracao({ PUBLIC_TAGGING_MODE: "direct", ...GA, PUBLIC_GTM_ID: "GTM-WK9NJC7W" });
    expect(r.ok).toBe(true);
    expect(r.ok && r.avisos.join()).toMatch(/IGNORADO/);
  });

  it("disabled é botão de emergência: ignora as demais variáveis", () => {
    expect(resolverConfiguracao({ PUBLIC_TAGGING_MODE: "disabled", ...GA, ...PIXEL, PUBLIC_GA_ID: "lixo" }).ok).toBe(true);
  });
});
