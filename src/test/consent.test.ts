import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  CONSENT_TEXTS,
  CONSENT_VERSION,
  FAIXA_ETARIA_VALUES,
  PERFIL_VALUES,
  PUBLISHED_CONSENT_VERSIONS,
  getConsentTexts,
  isKnownConsentVersion,
} from "@/lib/consent";

/**
 * Trava dos textos de consentimento.
 *
 * Editar o texto de uma versão já publicada reescreve retroativamente aquilo
 * que todas as pessoas que já se cadastraram aceitaram — o banco guarda o texto
 * do momento do aceite, mas quem compara com a constante veria outra coisa.
 *
 * Se este teste falhar, a pergunta certa NÃO é "como atualizo o hash?", e sim
 * "eu deveria estar criando uma versão nova?". Só atualize o hash se a versão
 * ainda não foi para produção.
 */
const HASHES_CONGELADOS: Record<string, string> = {
  "2026-08-v1": "6ee7f367d97b065057ebfe67e771be6823463cde7b67dd36f68ed10d75ffba9a",
};

const hashDaVersao = (versao: string) => {
  const textos = getConsentTexts(versao);
  if (!textos) throw new Error(`versão desconhecida: ${versao}`);

  // Ordena as chaves para o hash não depender da ordem de declaração.
  const canonico = Object.keys(textos)
    .sort()
    .map((chave) => `${chave}=${textos[chave as keyof typeof textos]}`)
    .join("\n");

  return createHash("sha256").update(canonico).digest("hex");
};

describe("textos de consentimento", () => {
  it("toda versão publicada tem hash congelado", () => {
    for (const versao of PUBLISHED_CONSENT_VERSIONS) {
      expect(
        HASHES_CONGELADOS[versao],
        `versão "${versao}" não tem hash congelado — adicione em HASHES_CONGELADOS`,
      ).toBeDefined();
    }
  });

  it.each(PUBLISHED_CONSENT_VERSIONS)("texto da versão %s não mudou", (versao) => {
    expect(
      hashDaVersao(versao),
      `O texto da versão "${versao}" mudou. Se ela já está em produção, crie uma versão NOVA ` +
        `em vez de editar esta — senão o registro de consentimento de quem já se cadastrou ` +
        `deixa de corresponder ao que foi exibido.`,
    ).toBe(HASHES_CONGELADOS[versao]);
  });

  it("a versão corrente existe e é resolvível", () => {
    expect(isKnownConsentVersion(CONSENT_VERSION)).toBe(true);
    expect(getConsentTexts(CONSENT_VERSION)).toBe(CONSENT_TEXTS);
  });

  it("versão desconhecida não resolve texto", () => {
    expect(isKnownConsentVersion("2020-v9")).toBe(false);
    expect(getConsentTexts("2020-v9")).toBeUndefined();
  });

  it("nenhum texto está vazio", () => {
    for (const [chave, texto] of Object.entries(CONSENT_TEXTS)) {
      expect(texto.trim().length, `texto "${chave}" está vazio`).toBeGreaterThan(20);
    }
  });

  it("textos de opt-in remetem à possibilidade de cancelar", () => {
    expect(CONSENT_TEXTS.email_marketing.toLowerCase()).toContain("cancelar");
    expect(CONSENT_TEXTS.whatsapp_marketing.toLowerCase()).toContain("parar");
  });
});

describe("valores de segmentação", () => {
  /** Precisam bater com os CHECK constraints de sql/migrations/001_lgpd.sql. */
  it("faixas etárias batem com o CHECK do banco", () => {
    expect([...FAIXA_ETARIA_VALUES].sort()).toEqual(["0-2", "3-5", "6-8", "familia"]);
  });

  it("perfis batem com o CHECK do banco", () => {
    expect([...PERFIL_VALUES].sort()).toEqual(["avo", "educador", "mae_pai", "outro"]);
  });

  it("nenhum rótulo de faixa etária sugere dado individualizado de criança", () => {
    // O ponto da issue #3 é que o campo passou a ser preferência de conteúdo do
    // adulto. Um rótulo tipo "idade do seu filho" desfaz isso na prática.
    const proibidos = ["seu filho", "sua filha", "idade da criança", "seu bebê"];
    for (const proibido of proibidos) {
      expect(JSON.stringify(CONSENT_TEXTS).toLowerCase()).not.toContain(proibido);
    }
  });
});
