import { afterEach, describe, expect, it, vi } from "vitest";
import { MAX_PREENCHIMENTO_MS, MIN_PREENCHIMENTO_MS, honeypotPreenchido, legacySchema, podeSerLegado } from "@/lib/leadSchema";
import { readFileSync } from "node:fs";

const track = vi.fn();
vi.mock("@/lib/tagging", () => ({ track, consentimentoAtual: () => ({ analytics: false, marketing: false }) }));

const { enviarLead, representaLeadCriado } = await import("@/lib/leadApi");

const payload = (elapsedMs: number) => ({
  type: "newsletter" as const,
  origem: "newsletter_full" as const,
  email: "fulana@exemplo.com",
  optInEmail: true,
  optInWhatsapp: false,
  hp: "",
  elapsedMs,
});

const responder = (status: number) =>
  vi.stubGlobal("fetch", vi.fn(async () => new Response('{"ok":true}', { status })));

afterEach(() => {
  track.mockReset();
  vi.unstubAllGlobals();
});

describe("HTTP 201 ≠ lead criado", () => {
  it("lead válido (201, tempo normal) → lead_created", async () => {
    responder(201);
    await enviarLead(payload(5_000));
    expect(track).toHaveBeenCalledTimes(1);
    expect(track.mock.calls[0][0]).toEqual({
      nome: "lead_created",
      lead: { tipo: "newsletter", origem: "newsletter_full", material: undefined },
    });
  });

  it("sucesso falso por preenchimento rápido (201) → NENHUM lead_created", async () => {
    responder(201);
    await enviarLead(payload(MIN_PREENCHIMENTO_MS - 1));
    expect(track).not.toHaveBeenCalled();
  });

  it("sucesso falso por formulário velho (201) → NENHUM lead_created", async () => {
    responder(201);
    await enviarLead(payload(MAX_PREENCHIMENTO_MS + 1));
    expect(track).not.toHaveBeenCalled();
  });

  it("erro HTTP → exceção e nenhum lead_created", async () => {
    responder(500);
    await expect(enviarLead(payload(5_000))).rejects.toThrow();
    expect(track).not.toHaveBeenCalled();
  });

  it("o evento carrega só dado de domínio, sem e-mail", async () => {
    responder(201);
    await enviarLead(payload(5_000));
    expect(JSON.stringify(track.mock.calls)).not.toContain("fulana");
  });

  it("a regra é a mesma função da API, não uma cópia", () => {
    expect(representaLeadCriado({ elapsedMs: MIN_PREENCHIMENTO_MS })).toBe(true);
    const api = readFileSync("functions/api/lead.ts", "utf-8");
    expect(api).toMatch(/caiuNoSucessoFalso\(data\.elapsedMs\)/);
    expect(api).not.toMatch(/MIN_PREENCHIMENTO_MS\s*=/);
  });
});

describe("honeypot e schema legado", () => {
  const bot = {
    type: "newsletter",
    origem: "newsletter_compact",
    email: "bot@exemplo.com",
    optInEmail: false,
    optInWhatsapp: false,
    consentVersion: "2026-08-v1",
    hp: "preenchido",
  };

  it("REGRESSÃO: honeypot preenchido era aceito pelo schema legado", () => {
    // Documenta o buraco: o legado ignora `hp`. Por isso a checagem tem que vir
    // antes de qualquer schema.
    expect(legacySchema.safeParse(bot).success).toBe(true);
    expect(honeypotPreenchido(bot)).toBe(true);
  });

  it("payload do formulário atual nunca é resgatado pelo legado", () => {
    expect(podeSerLegado(bot)).toBe(false);
    expect(podeSerLegado({ type: "newsletter", email: "a@b.com" })).toBe(true);
  });

  it("a function checa o honeypot ANTES dos schemas", () => {
    const api = readFileSync("functions/api/lead.ts", "utf-8");
    expect(api.indexOf("honeypotPreenchido(body)")).toBeGreaterThan(-1);
    expect(api.indexOf("honeypotPreenchido(body)")).toBeLessThan(api.indexOf("payloadSchema.safeParse(body)"));
    expect(api.indexOf("podeSerLegado(body)")).toBeLessThan(api.indexOf("legacySchema.safeParse(body)"));
  });
});
