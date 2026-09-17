import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { NOME_DO_COOKIE_DE_CONSENTIMENTO, REVISAO_COOKIES } from "@/lib/cookies";
import { podeGuardarCampanha, podeGuardarIdentificadoresDeMidia } from "@/lib/atribuicao/politica";
import { atribuicaoPermitida, lerPreferenciaDeclarada } from "@/lib/atribuicao/servidor";

const cookie = (dados: Record<string, unknown>) =>
  `outro=1; ${NOME_DO_COOKIE_DE_CONSENTIMENTO}=${encodeURIComponent(JSON.stringify(dados))}`;
const vigente = (categorias: string[]) =>
  cookie({ categories: categorias, revision: REVISAO_COOKIES, lastConsentTimestamp: "2026-09-16T10:00:00.000Z" });

const campanha = { utmSource: "partner-helena", utmMedium: "community" };
const ids = { fbclid: "IwAR123", fbp: "fb.1.1.2" };

describe("preferência declarada (cookie do CMP) lida no servidor", () => {
  it("lê categorias, revisão e data declaradas", () => {
    expect(lerPreferenciaDeclarada(vigente(["necessary", "marketing"]))).toEqual({
      categorias: ["necessary", "marketing"],
      marketing: true,
      revisao: REVISAO_COOKIES,
      registradaEm: "2026-09-16T10:00:00.000Z",
    });
  });

  it("ausente, ilegível ou sem categorias → null (nunca concedido)", () => {
    expect(lerPreferenciaDeclarada(null)).toBeNull();
    expect(lerPreferenciaDeclarada(`${NOME_DO_COOKIE_DE_CONSENTIMENTO}=%7Bquebrado`)).toBeNull();
    expect(lerPreferenciaDeclarada(cookie({ revision: REVISAO_COOKIES }))).toBeNull();
  });

  it("revisão antiga → null: o servidor não é mais permissivo que o banner", () => {
    expect(lerPreferenciaDeclarada(cookie({ categories: ["marketing"], revision: REVISAO_COOKIES - 1 }))).toBeNull();
  });

  it("data declarada inválida não quebra: vira null", () => {
    expect(
      lerPreferenciaDeclarada(cookie({ categories: [], revision: REVISAO_COOKIES, lastConsentTimestamp: "ontem" }))?.registradaEm,
    ).toBeNull();
  });
});

describe("campanha e identificadores de mídia são conceitos separados", () => {
  it("cada um tem sua própria função de política", () => {
    // Hoje as duas exigem Publicidade (UTM: pendência jurídica). Serem funções
    // distintas é o que permite mudar uma sem arrastar a outra.
    expect(podeGuardarCampanha).not.toBe(podeGuardarIdentificadoresDeMidia);
  });

  it("sem Publicidade: nada é gravado", () => {
    expect(atribuicaoPermitida(vigente(["necessary", "analytics"]), { campanha, identificadoresMidia: ids })).toBeNull();
  });

  it("com Publicidade: grava os dois grupos separadamente, com a preferência junto", () => {
    const r = atribuicaoPermitida(vigente(["marketing"]), { campanha, identificadoresMidia: ids });
    expect(r?.campanha).toEqual(campanha);
    expect(r?.identificadoresDeMidia).toEqual(ids);
    expect(r?.preferencia.revisao).toBe(REVISAO_COOKIES);
  });

  it("só campanha, sem identificadores: grava só a campanha", () => {
    const r = atribuicaoPermitida(vigente(["marketing"]), { campanha: { utmSource: "newsletter" } });
    expect(r).toMatchObject({ campanha: { utmSource: "newsletter" }, identificadoresDeMidia: null });
  });

  it("sem nada a gravar → null (não cria linha vazia)", () => {
    expect(atribuicaoPermitida(vigente(["marketing"]), {})).toBeNull();
  });

  it("a pendência jurídica das UTMs está registrada no código e no ADR", () => {
    expect(readFileSync("src/lib/atribuicao/politica.ts", "utf-8")).toMatch(/PENDÊNCIA JURÍDICA/);
    expect(readFileSync("docs/adr/0001-tagueamento-e-consentimento.md", "utf-8")).toMatch(/UTM/);
  });
});
