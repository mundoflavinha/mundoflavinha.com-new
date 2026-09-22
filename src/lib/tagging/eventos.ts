/**
 * Eventos de DOMÍNIO — o que aconteceu no produto, sem vocabulário de vendor.
 *
 * Nada aqui sabe que GA4 chama isso de `generate_lead` ou que a Meta chama de
 * `Lead`. A tradução mora em `traducao.ts`; a distribuição, nos adaptadores.
 * Trocar `direct` por `gtm` não muda uma linha de quem emite evento.
 *
 * NUNCA dado pessoal. Sem e-mail, nome, telefone — nem com hash. Os tipos
 * abaixo não têm campo para isso de propósito: o compilador é a revisão.
 */

export type OrigemDoLead = "newsletter_full" | "newsletter_compact" | "lead_magnet";

export type LeadCriado = {
  nome: "lead_created";
  lead: {
    tipo: "newsletter" | "lead_magnet";
    origem: OrigemDoLead;
    /** Nome público do material baixado. Não identifica pessoa. */
    material?: string;
  };
};

/** Marcos de progresso. 100 não existe: o fim é `video_completed`. */
export const MARCOS_DE_PROGRESSO = [25, 50, 75] as const;
export type MarcoDeProgresso = (typeof MARCOS_DE_PROGRESSO)[number];

type DadosDoVideo = {
  provedor: "youtube";
  videoId: string;
  titulo: string;
  duracaoSegundos?: number;
};

export type VideoIniciado = { nome: "video_started"; video: DadosDoVideo };
export type VideoProgrediu = { nome: "video_progressed"; video: DadosDoVideo & { percentual: MarcoDeProgresso } };
export type VideoConcluido = { nome: "video_completed"; video: DadosDoVideo };

export type EventoDeDominio = LeadCriado | VideoIniciado | VideoProgrediu | VideoConcluido;

/**
 * Evento já carimbado pela camada de tagging. `id` único por ocorrência: é o
 * que permite deduplicar no futuro (Meta CAPI usa `event_id`; no GTM, dá para
 * barrar reprocessamento). Quem emite não gera — `track()` gera.
 */
export type EventoRegistrado = EventoDeDominio & { id: string };
