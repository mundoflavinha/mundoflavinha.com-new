import { describe, expect, it } from "vitest";
import { sinaisDoGoogle, estadoDasCategorias } from "@/lib/tagging/consentimento";
import type { EventoRegistrado } from "@/lib/tagging/eventos";
import { paraDataLayer, paraGa4, paraMeta } from "@/lib/tagging/traducao";

const lead: EventoRegistrado = {
  id: "evt-1",
  nome: "lead_created",
  lead: { tipo: "lead_magnet", origem: "lead_magnet", material: "Cada Tampinha no Seu Lugar" },
};
const video = { provedor: "youtube" as const, videoId: "abc123abc12", titulo: "Brincadeira", duracaoSegundos: 120 };

describe("lead_created", () => {
  it("direct → GA4 generate_lead", () => {
    expect(paraGa4(lead)).toEqual({
      nome: "generate_lead",
      parametros: { lead_source: "lead_magnet", lead_type: "lead_magnet", material_name: "Cada Tampinha no Seu Lugar", event_id: "evt-1" },
    });
  });

  it("direct → Meta Lead", () => {
    expect(paraMeta(lead)?.nome).toBe("Lead");
  });

  it("gtm → dataLayer event lead_created, dados aninhados", () => {
    expect(paraDataLayer(lead)).toEqual({
      event: "lead_created",
      event_id: "evt-1",
      lead: { type: "lead_magnet", source: "lead_magnet", material_name: "Cada Tampinha no Seu Lugar" },
    });
  });
});

describe("vídeo", () => {
  it("GA4 recebe a taxonomia de vídeo", () => {
    expect(paraGa4({ id: "1", nome: "video_started", video })?.nome).toBe("video_start");
    const progresso = paraGa4({ id: "2", nome: "video_progressed", video: { ...video, percentual: 50 } });
    expect(progresso).toMatchObject({ nome: "video_progress", parametros: { video_percent: 50 } });
    expect(paraGa4({ id: "3", nome: "video_completed", video })).toMatchObject({
      nome: "video_complete",
      parametros: { video_percent: 100 },
    });
  });

  it("Meta NÃO recebe evento de vídeo (nem ViewContent)", () => {
    for (const nome of ["video_started", "video_completed"] as const) {
      expect(paraMeta({ id: "x", nome, video })).toBeNull();
    }
    expect(paraMeta({ id: "x", nome: "video_progressed", video: { ...video, percentual: 75 } })).toBeNull();
  });
});

describe("nenhum dado pessoal sai da tradução", () => {
  it("nem para GA4, nem Meta, nem dataLayer", () => {
    // Só o que efetivamente sai: parâmetros e objeto do dataLayer.
    const tudo = JSON.stringify([paraGa4(lead)?.parametros, paraMeta(lead)?.parametros, paraDataLayer(lead)]);
    expect(tudo).not.toMatch(/@|e-?mail|whatsapp|telefone|phone|"nome"/i);
  });
});

describe("Consent Mode v2", () => {
  it("analytics → analytics_storage; marketing → ad_storage, ad_user_data, ad_personalization", () => {
    expect(sinaisDoGoogle({ analytics: true, marketing: false })).toEqual({
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    expect(sinaisDoGoogle({ analytics: false, marketing: true })).toEqual({
      analytics_storage: "denied",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
  });

  it("superfície sem marketing ignora a categoria aceita no cookie", () => {
    expect(estadoDasCategorias(["analytics", "marketing"], { superficiePermiteMarketing: false })).toEqual({
      analytics: true,
      marketing: false,
    });
  });
});
