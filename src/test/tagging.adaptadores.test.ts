// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { EventoRegistrado } from "@/lib/tagging/eventos";

/**
 * Comportamento dos adaptadores num DOM real (jsdom), com o shim do gtag
 * igual ao de ConsentModeDefaults.astro. jsdom não baixa scripts externos:
 * aqui se verifica o que o CÓDIGO pede — quais <script> anexa e quais
 * chamadas faz — não a rede, que é assunto do e2e.
 */

const GA_ID = "G-TEST000000";
const PIXEL_ID = "100000000000001";
const GTM_ID = "GTM-TEST000";

const lead: EventoRegistrado = { id: "evt-1", nome: "lead_created", lead: { tipo: "newsletter", origem: "newsletter_full" } };
const video: EventoRegistrado = {
  id: "evt-2",
  nome: "video_started",
  video: { provedor: "youtube", videoId: "abc123abc12", titulo: "Vídeo" },
};

const NEGADO = { analytics: false, marketing: false };
const SO_ANALYTICS = { analytics: true, marketing: false };
const SO_MARKETING = { analytics: false, marketing: true };
const TUDO = { analytics: true, marketing: true };

/** Carrega os módulos do zero: os vendors guardam "já injetado" em memória. */
async function carregar() {
  vi.resetModules();
  document.head.innerHTML = "";
  document.cookie.split("; ").forEach((c) => (document.cookie = `${c.split("=")[0]}=; Max-Age=0`));
  for (const chave of Object.keys(window)) if (chave.startsWith("ga-disable-")) delete (window as never)[chave];
  delete window.fbq;
  delete window._fbq;
  window.dataLayer = [];
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  return {
    direto: (await import("@/lib/tagging/adaptadores/direto")).criarAdaptadorDireto,
    gtm: (await import("@/lib/tagging/adaptadores/gtm")).criarAdaptadorGtm,
    desligado: (await import("@/lib/tagging/adaptadores/desligado")).criarAdaptadorDesligado,
    index: await import("@/lib/tagging"),
  };
}

const scripts = () => Array.from(document.head.querySelectorAll("script")).map((s) => s.src);
/** Entradas do dataLayer vindas do shim do gtag (objetos `arguments`) viram arrays. */
const chamadasGtag = () =>
  (window.dataLayer ?? [])
    .filter((e) => Object.prototype.toString.call(e) === "[object Arguments]")
    .map((e) => Array.from(e as ArrayLike<unknown>));
const eventosGa4 = () => chamadasGtag().filter((c) => c[0] === "event").map((c) => c[1]);
const pushesDeObjeto = () =>
  (window.dataLayer ?? []).filter((e) => Object.prototype.toString.call(e) === "[object Object]") as Record<string, unknown>[];

/** Substitui o `callMethod` da fila do Pixel para gravar o que seria enviado. */
const espiarFbq = () => {
  const chamadas: unknown[][] = [];
  if (window.fbq) {
    for (const args of window.fbq.queue ?? []) chamadas.push(args);
    window.fbq.queue = [];
    window.fbq.callMethod = (...args: unknown[]) => chamadas.push(args);
  }
  return chamadas;
};

describe("modo direct", () => {
  let m: Awaited<ReturnType<typeof carregar>>;
  beforeEach(async () => {
    m = await carregar();
  });
  const config = { modo: "direct" as const, ga4: { measurementId: GA_ID }, metaPixel: { pixelId: PIXEL_ID } };

  it("sem consentimento: nenhum script, nenhum evento", () => {
    const a = m.direto(config);
    a.aplicarConsentimento(NEGADO);
    a.enviar(lead);
    expect(scripts()).toEqual([]);
    expect(eventosGa4()).toEqual([]);
    expect(window.fbq).toBeUndefined();
  });

  it("NÃO carrega GTM em nenhuma combinação", () => {
    const a = m.direto(config);
    for (const estado of [SO_ANALYTICS, SO_MARKETING, TUDO]) a.aplicarConsentimento(estado);
    expect(scripts().some((s) => s.includes("gtm.js"))).toBe(false);
  });

  it("analytics aceito → GA4 carrega e recebe generate_lead; Meta não", () => {
    const a = m.direto(config);
    a.aplicarConsentimento(SO_ANALYTICS);
    a.enviar(lead);
    expect(scripts()).toEqual([`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`]);
    expect(eventosGa4()).toEqual(["generate_lead"]);
    expect(window.fbq).toBeUndefined();
  });

  it("marketing aceito → Meta carrega e recebe Lead; GA4 não", () => {
    const a = m.direto(config);
    a.aplicarConsentimento(SO_MARKETING);
    const fbq = espiarFbq();
    a.enviar(lead);
    expect(scripts()).toEqual(["https://connect.facebook.net/en_US/fbevents.js"]);
    expect(fbq).toContainEqual(["init", PIXEL_ID]);
    expect(fbq).toContainEqual(["track", "Lead", expect.any(Object), { eventID: "evt-1" }]);
    expect(eventosGa4()).toEqual([]);
  });

  it("vídeo vai ao GA4 e NÃO à Meta", () => {
    const a = m.direto(config);
    a.aplicarConsentimento(TUDO);
    const fbq = espiarFbq();
    a.enviar(video);
    expect(eventosGa4()).toEqual(["video_start"]);
    expect(fbq.filter((c) => c[0] === "track" && c[1] !== "PageView")).toEqual([]);
  });

  it("consent update sai ANTES do config do GA4", () => {
    const a = m.direto(config);
    a.aplicarConsentimento(SO_ANALYTICS);
    const ordem = chamadasGtag().map((c) => c[0]);
    expect(ordem.indexOf("consent")).toBeLessThan(ordem.indexOf("config"));
  });

  it("revogação → ga-disable, fbq revoke, e NENHUM evento novo", () => {
    const a = m.direto(config);
    a.aplicarConsentimento(TUDO);
    const fbq = espiarFbq();
    a.aplicarConsentimento(NEGADO);
    const eventosAntes = eventosGa4().length;

    a.enviar(lead);

    expect(window[`ga-disable-${GA_ID}`]).toBe(true);
    expect(fbq).toContainEqual(["consent", "revoke"]);
    expect(eventosGa4().length).toBe(eventosAntes);
    expect(fbq.filter((c) => c[1] === "Lead")).toEqual([]);
  });

  it("reconcessão na mesma página religa sem duplicar init nem script", () => {
    const a = m.direto(config);
    a.aplicarConsentimento(TUDO);
    a.aplicarConsentimento(NEGADO);
    a.aplicarConsentimento(TUDO);
    expect(window[`ga-disable-${GA_ID}`]).toBe(false);
    expect(scripts().length).toBe(2);
    expect(chamadasGtag().filter((c) => c[0] === "config").length).toBe(1);
  });
});

describe("modo gtm", () => {
  let m: Awaited<ReturnType<typeof carregar>>;
  beforeEach(async () => {
    m = await carregar();
  });
  const config = { modo: "gtm" as const, gtmId: GTM_ID };

  it("sem consentimento: container NÃO é anexado", () => {
    const a = m.gtm(config);
    a.aplicarConsentimento(NEGADO);
    expect(scripts()).toEqual([]);
  });

  it("com consentimento: só o container — nunca gtag/js nem fbevents", () => {
    const a = m.gtm(config);
    a.aplicarConsentimento(TUDO);
    a.enviar(lead);
    expect(scripts()).toEqual([`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`]);
    expect(window.fbq).toBeUndefined();
    expect(eventosGa4()).toEqual([]);
  });

  it("lead_created → dataLayer event lead_created", () => {
    const a = m.gtm(config);
    a.aplicarConsentimento(SO_ANALYTICS);
    a.enviar(lead);
    expect(pushesDeObjeto().find((p) => p.event === "lead_created")).toMatchObject({ event_id: "evt-1" });
  });

  it("gtm.start entra no dataLayer ANTES do script", () => {
    const a = m.gtm(config);
    a.aplicarConsentimento(SO_ANALYTICS);
    expect(pushesDeObjeto().some((p) => p.event === "gtm.js")).toBe(true);
  });

  it("evento anterior ao consentimento é DESCARTADO, não fica para o container reprocessar", () => {
    const a = m.gtm(config);
    a.aplicarConsentimento(NEGADO);
    a.enviar(lead);
    a.aplicarConsentimento(TUDO);
    expect(pushesDeObjeto().filter((p) => p.event === "lead_created")).toEqual([]);
  });

  it("revogação → consent_updated negado e nenhum evento novo", () => {
    const a = m.gtm(config);
    a.aplicarConsentimento(TUDO);
    a.aplicarConsentimento(NEGADO);
    a.enviar(lead);
    expect(pushesDeObjeto().filter((p) => p.event === "lead_created")).toEqual([]);
    expect(pushesDeObjeto().at(-1)).toMatchObject({
      event: "consent_updated",
      consent: { analytics: "denied", marketing: "denied" },
    });
    expect(chamadasGtag().filter((c) => c[0] === "consent").at(-1)?.[2]).toMatchObject({ analytics_storage: "denied" });
  });
});

describe("modo disabled", () => {
  it("nada: nem script, nem push, nem sinal", async () => {
    const m = await carregar();
    const a = m.desligado();
    const antes = window.dataLayer!.length;
    a.aplicarConsentimento(TUDO);
    a.enviar(lead);
    expect(scripts()).toEqual([]);
    expect(window.dataLayer!.length).toBe(antes);
    expect(window.fbq).toBeUndefined();
  });
});

describe("seleção de adaptador", () => {
  it("exatamente um por configuração", async () => {
    const { index } = await carregar();
    expect(index.criarAdaptador({ modo: "disabled" }).modo).toBe("disabled");
    expect(index.criarAdaptador({ modo: "gtm", gtmId: GTM_ID }).modo).toBe("gtm");
    expect(index.criarAdaptador({ modo: "direct", ga4: null, metaPixel: { pixelId: PIXEL_ID } }).modo).toBe("direct");
  });
});
