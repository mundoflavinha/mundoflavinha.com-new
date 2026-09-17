import type { EventoRegistrado } from "./eventos";

/**
 * Tradução de eventos de domínio para cada destino. PURO — testável sem DOM.
 *
 * Retornar `null` é uma DECISÃO, não omissão: significa "este provider não
 * recebe este evento". Cada `null` abaixo tem o motivo ao lado.
 */

export type EventoGa4 = { nome: string; parametros: Record<string, string | number> };
export type EventoMeta = { nome: string; parametros: Record<string, string | number> };

const semVazios = (obj: Record<string, string | number | undefined>) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Record<string, string | number>;

export function paraGa4(evento: EventoRegistrado): EventoGa4 | null {
  switch (evento.nome) {
    case "lead_created":
      // Evento recomendado do GA4. `lead_source` é parâmetro recomendado;
      // os demais são customizados e precisam de dimensão personalizada no
      // GA4 para aparecer em relatório.
      return {
        nome: "generate_lead",
        parametros: semVazios({
          lead_source: evento.lead.origem,
          lead_type: evento.lead.tipo,
          material_name: evento.lead.material,
          event_id: evento.id,
        }),
      };

    // Mesmos nomes e parâmetros do enhanced measurement de vídeo do GA4, para
    // cair nos relatórios padrão. Consequência: o "Video engagement" do
    // enhanced measurement PRECISA estar desligado na propriedade, senão os
    // dois mecanismos mandam o mesmo evento. Ver ADR.
    case "video_started":
    case "video_progressed":
    case "video_completed": {
      const nome = {
        video_started: "video_start",
        video_progressed: "video_progress",
        video_completed: "video_complete",
      }[evento.nome];
      const percentual =
        evento.nome === "video_progressed" ? evento.video.percentual : evento.nome === "video_completed" ? 100 : 0;
      return {
        nome,
        parametros: semVazios({
          video_provider: evento.video.provedor,
          video_title: evento.video.titulo,
          video_url: `https://www.youtube.com/watch?v=${evento.video.videoId}`,
          video_duration: evento.video.duracaoSegundos,
          video_percent: percentual,
          event_id: evento.id,
        }),
      };
    }
  }
}

export function paraMeta(evento: EventoRegistrado): EventoMeta | null {
  switch (evento.nome) {
    case "lead_created":
      return {
        nome: "Lead",
        parametros: semVazios({
          content_category: evento.lead.tipo,
          content_name: evento.lead.material ?? evento.lead.origem,
        }),
      };

    // Vídeo NÃO vai para a Meta. `ViewContent` significa "viu a página de um
    // item" (produto, oferta) e alimenta otimização de campanha como sinal de
    // intenção. Dar play num vídeo educativo não é isso — mandar como se fosse
    // ensinaria o algoritmo a buscar quem dá play, não quem se cadastra.
    // Se um dia houver campanha de visualização de vídeo, o sinal certo é
    // desenhado para ela, com nome próprio, não reaproveitado daqui.
    case "video_started":
    case "video_progressed":
    case "video_completed":
      return null;
  }
}

/**
 * Formato do `dataLayer` para o modo GTM. Nome do evento = nome de domínio;
 * o container traduz. Dados aninhados por assunto (`lead`, `video`) para não
 * vazar entre eventos: o modelo de dados do GTM MESCLA pushes, e um
 * `material_name` solto de um lead continuaria "valendo" no próximo evento de
 * vídeo.
 */
export function paraDataLayer(evento: EventoRegistrado): Record<string, unknown> {
  switch (evento.nome) {
    case "lead_created":
      return {
        event: "lead_created",
        event_id: evento.id,
        lead: { type: evento.lead.tipo, source: evento.lead.origem, material_name: evento.lead.material ?? null },
      };
    case "video_started":
    case "video_progressed":
    case "video_completed":
      return {
        event: evento.nome,
        event_id: evento.id,
        video: {
          provider: evento.video.provedor,
          id: evento.video.videoId,
          title: evento.video.titulo,
          duration: evento.video.duracaoSegundos ?? null,
          percent:
            evento.nome === "video_progressed" ? evento.video.percentual : evento.nome === "video_completed" ? 100 : 0,
        },
      };
  }
}
