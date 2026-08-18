/**
 * Contrato entre os gatilhos de download (HTML estático) e a ilha do modal.
 *
 * Existe como módulo próprio para que os três lados — o script inline do
 * LeadModal.astro, a ilha React e os testes — usem literalmente as mesmas
 * strings. Um nome de evento digitado errado em qualquer um deles produziria
 * um botão que simplesmente não faz nada, sem erro em lugar nenhum.
 */

/** Nome com prefixo do projeto para não colidir com nada de terceiros. */
export const EVENTO_ABRIR_MATERIAL = "mundoflavinha:abrir-material";

export const SELETOR_MAILBOX = "[data-lead-mailbox]";

export type DetalheAbrirMaterial = {
  /** ID do catálogo em src/data/materiais.ts. */
  material: string;
  /** ID do elemento que abriu, para devolver o foco ao fechar. */
  acionador: string | null;
};

/**
 * Tempo até desistir de esperar a ilha hidratar.
 *
 * Sem isso, um chunk que nunca carrega transforma "clique perdido" em "clique
 * esperando para sempre": o botão fica ocupado e a pessoa não recebe nem o
 * formulário nem um aviso.
 */
export const TIMEOUT_HIDRATACAO_MS = 8_000;
