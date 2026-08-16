import { describe, expect, it } from "vitest";
import { legacySchema, payloadSchema } from "@/lib/leadSchema";

const newsletterValido = {
  type: "newsletter",
  origem: "newsletter_full",
  consentVersion: "2026-08-v1",
  email: "Mae@Exemplo.com",
  optInEmail: true,
  optInWhatsapp: false,
};

const leadMagnetValido = {
  type: "lead_magnet",
  origem: "lead_magnet",
  nome: "Ana",
  material: "Jogo da Reciclagem",
  consentVersion: "2026-08-v1",
  email: "ana@exemplo.com",
  optInEmail: true,
  optInWhatsapp: false,
};

describe("payloadSchema", () => {
  it("aceita um newsletter válido", () => {
    expect(payloadSchema.safeParse(newsletterValido).success).toBe(true);
  });

  it("aceita um lead_magnet válido", () => {
    expect(payloadSchema.safeParse(leadMagnetValido).success).toBe(true);
  });

  it("normaliza e-mail para minúsculas e sem espaços", () => {
    const parsed = payloadSchema.safeParse({ ...newsletterValido, email: "  Mae@Exemplo.com  " });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.email).toBe("mae@exemplo.com");
  });

  it("rejeita e-mail malformado", () => {
    expect(payloadSchema.safeParse({ ...newsletterValido, email: "não-é-email" }).success).toBe(false);
  });

  it("rejeita type desconhecido", () => {
    expect(payloadSchema.safeParse({ ...newsletterValido, type: "spam" }).success).toBe(false);
  });

  it("lead_magnet exige nome e material", () => {
    const { nome: _nome, ...semNome } = leadMagnetValido;
    expect(payloadSchema.safeParse(semNome).success).toBe(false);

    const { material: _material, ...semMaterial } = leadMagnetValido;
    expect(payloadSchema.safeParse(semMaterial).success).toBe(false);
  });

  it("newsletter não exige nome nem material", () => {
    expect(payloadSchema.safeParse(newsletterValido).success).toBe(true);
  });

  it("optInWhatsapp true sem whatsapp preenchido é rejeitado", () => {
    const resultado = payloadSchema.safeParse({ ...newsletterValido, optInWhatsapp: true });
    expect(resultado.success).toBe(false);
  });

  it("optInWhatsapp true com whatsapp preenchido é aceito", () => {
    const resultado = payloadSchema.safeParse({
      ...newsletterValido,
      optInWhatsapp: true,
      whatsapp: "21999998888",
    });
    expect(resultado.success).toBe(true);
  });

  it("honeypot preenchido é aceito pelo schema (a rejeição é lógica de negócio, não de forma)", () => {
    // api/lead.ts trata `hp` preenchido como bot e responde sucesso falso —
    // o schema só garante que, se vier, não seja um payload gigante.
    const resultado = payloadSchema.safeParse({ ...newsletterValido, hp: "" });
    expect(resultado.success).toBe(true);
  });

  it("honeypot com conteúdo é rejeitado pelo schema (max(0))", () => {
    const resultado = payloadSchema.safeParse({ ...newsletterValido, hp: "algo" });
    expect(resultado.success).toBe(false);
  });

  it("faixaEtaria aceita só os valores que o CHECK do banco permite", () => {
    expect(payloadSchema.safeParse({ ...newsletterValido, faixaEtaria: "3-5" }).success).toBe(true);
    expect(payloadSchema.safeParse({ ...newsletterValido, faixaEtaria: "9-12" }).success).toBe(false);
  });

  it("perfil aceita só os valores que o CHECK do banco permite", () => {
    expect(payloadSchema.safeParse({ ...newsletterValido, perfil: "mae_pai" }).success).toBe(true);
    expect(payloadSchema.safeParse({ ...newsletterValido, perfil: "tio" }).success).toBe(false);
  });

  it("consentVersion vazio é rejeitado", () => {
    expect(payloadSchema.safeParse({ ...newsletterValido, consentVersion: "" }).success).toBe(false);
  });
});

describe("legacySchema", () => {
  it("aceita o shape antigo, sem os campos novos", () => {
    const resultado = legacySchema.safeParse({
      type: "newsletter",
      email: "velho@exemplo.com",
      consentimento: true,
    });
    expect(resultado.success).toBe(true);
  });

  it("descarta idadeCrianca silenciosamente em vez de rejeitar", () => {
    // A issue #3 mandou parar de coletar esse dado. O ponto do schema legado
    // é não quebrar envios de abas antigas — então ele aceita o payload como
    // um todo, mas idadeCrianca precisa desaparecer do resultado parseado.
    const resultado = legacySchema.safeParse({
      type: "lead_magnet",
      email: "velho@exemplo.com",
      material: "Jogo X",
      idadeCrianca: "5 anos",
    });
    expect(resultado.success).toBe(true);
    if (resultado.success) {
      expect(resultado.data).not.toHaveProperty("idadeCrianca");
    }
  });

  it("ainda exige e-mail válido", () => {
    expect(legacySchema.safeParse({ type: "newsletter", email: "invalido" }).success).toBe(false);
  });
});
