import { CONSENT_VERSION, type FaixaEtaria, type OrigemFormulario, type Perfil } from "./consent";

export type LeadPayload = {
  type: "newsletter" | "lead_magnet";
  origem: OrigemFormulario;
  email: string;
  nome?: string;
  whatsapp?: string;
  material?: string;
  faixaEtaria?: FaixaEtaria;
  perfil?: Perfil;
  optInEmail: boolean;
  optInWhatsapp: boolean;
  /** Honeypot: preenchido só por bot. */
  hp: string;
  /** Tempo desde a renderização do formulário, em ms. */
  elapsedMs: number;
};

/**
 * Único ponto que fala com /api/lead.
 *
 * Centralizado de propósito: `consentVersion` e `path` precisam ser idênticos
 * nos 9 lugares que enviam formulário, senão a prova de consentimento fica
 * inconsistente entre as páginas.
 */
export async function enviarLead(payload: LeadPayload): Promise<void> {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      consentVersion: CONSENT_VERSION,
      path: typeof window === "undefined" ? undefined : window.location.pathname,
    }),
  });

  if (!response.ok) {
    throw new Error(`lead request failed: ${response.status}`);
  }
}
