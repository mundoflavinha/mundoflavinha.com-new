import { CONSENT_VERSION, type FaixaEtaria, type OrigemFormulario, type Perfil } from "./consent";
import { coletarAtribuicao } from "./atribuicao/navegador";
import { caiuNoSucessoFalso } from "./leadSchema";
import * as tagging from "./tagging";

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
      // Já minimizado pela preferência atual; o servidor decide de novo.
      ...coletarAtribuicao(),
    }),
  });

  if (!response.ok) {
    throw new Error(`lead request failed: ${response.status}`);
  }

  if (representaLeadCriado(payload)) {
    tagging.track({
      nome: "lead_created",
      lead: { tipo: payload.type, origem: payload.origem, material: payload.material },
    });
  }
}

/**
 * HTTP 201 ≠ lead criado.
 *
 * `/api/lead` responde 201 com `{ ok: true }` TAMBÉM no sucesso falso
 * (preenchimento fora da janela de tempo), para o bot não aprender que foi
 * barrado. Emitir `lead_created` em cima do 201 cru mandaria ao GA4 e à Meta
 * conversões que o banco nunca recebeu — e a campanha otimizaria PARA esse
 * tráfego.
 *
 * Chamada só DEPOIS de `response.ok`: erro HTTP já saiu por `throw`. A regra
 * de tempo é a MESMA função que a API usa (`caiuNoSucessoFalso`, importada de
 * leadSchema.ts), nunca recopiada. A API não devolve "não gravei" porque isso
 * ensinaria o bot a achar os limiares por busca binária.
 *
 * O honeypot não entra aqui: `hp` preenchido é barrado pelo schema com 400
 * antes de chegar ao sucesso falso, então já sai pelo `throw`.
 */
export const representaLeadCriado = (payload: Pick<LeadPayload, "elapsedMs">): boolean =>
  !caiuNoSucessoFalso(payload.elapsedMs);
