import { test as base, expect, type BrowserContext, type Page } from "@playwright/test";

/**
 * `test` de TODOS os specs. Importar de "@playwright/test" direto é proibido
 * (teste em src/test/tagging.test.ts): é aqui que a rede de terceiros é
 * interceptada.
 *
 * Nenhuma requisição automatizada chega ao Google ou à Meta. Os scripts dos
 * vendors são respondidos por STUBS que reproduzem só o contrato que o nosso
 * código usa — e gravam o que receberiam, para o teste validar o PAYLOAD em
 * vez de só "houve uma requisição". Endpoints de coleta respondem 204 vazio.
 *
 * Segunda barreira, para o caso de um spec escapar daqui: o Chromium roda com
 * esses hosts resolvendo para lugar nenhum (playwright.config.ts).
 */

export const HOSTS_DE_MEDICAO = [
  "googletagmanager.com",
  "google-analytics.com",
  "analytics.google.com",
  "doubleclick.net",
  "connect.facebook.net",
  "facebook.com",
];

const ehHostDeMedicao = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return HOSTS_DE_MEDICAO.some((h) => hostname === h || hostname.endsWith(`.${h}`));
  } catch {
    return false;
  }
};

/**
 * gtag.js: o shim do <head> já empilha as chamadas no dataLayer, então o stub
 * só precisa simular o efeito colateral que importa ao teste — o cookie _ga,
 * que a revogação tem que apagar.
 */
const STUB_GTAG = `
  window.__stubGtag = (window.__stubGtag || 0) + 1;
  document.cookie = "_ga=GA1.1.stub.0; path=/";
  document.cookie = "_ga_TEST=GS1.1.stub; path=/";
`;

/** gtm.js: marca que carregou e registra tudo que passar pelo dataLayer. */
const STUB_GTM = `
  window.__stubGtm = (window.__stubGtm || 0) + 1;
`;

/**
 * fbevents.js: no carregamento real, a biblioteca define \`callMethod\` e
 * reprocessa \`fbq.queue\`. O stub faz exatamente isso, gravando as chamadas.
 */
const STUB_FBEVENTS = `
  (function () {
    var f = window.fbq;
    window.__fbqChamadas = window.__fbqChamadas || [];
    if (!f) return;
    f.callMethod = function () {
      var args = Array.prototype.slice.call(arguments);
      window.__fbqChamadas.push(args);
      if (args[0] === "init") document.cookie = "_fbp=fb.1.stub.0; path=/";
    };
    (f.queue || []).forEach(function (a) { f.callMethod.apply(null, a); });
    f.queue = [];
  })();
`;

export type RequisicaoDeMedicao = { url: string; host: string };

async function interceptar(context: BrowserContext, vistas: RequisicaoDeMedicao[]) {
  await context.route(
    (url) => ehHostDeMedicao(url.toString()),
    async (rota) => {
      const url = rota.request().url();
      vistas.push({ url, host: new URL(url).hostname });

      const js = (corpo: string) => rota.fulfill({ status: 200, contentType: "text/javascript", body: corpo });
      if (url.includes("googletagmanager.com/gtag/js")) return js(STUB_GTAG);
      if (url.includes("googletagmanager.com/gtm.js")) return js(STUB_GTM);
      if (url.includes("connect.facebook.net") && url.includes("fbevents.js")) return js(STUB_FBEVENTS);
      // Coleta (g/collect, /tr, ...): nunca deveria acontecer com stubs, mas se
      // acontecer não sai daqui.
      return rota.fulfill({ status: 204, body: "" });
    },
  );
}

export const test = base.extend<{ medicao: RequisicaoDeMedicao[] }>({
  medicao: [
    async ({ context }, use) => {
      const vistas: RequisicaoDeMedicao[] = [];
      await interceptar(context, vistas);
      await use(vistas);
    },
    { auto: true },
  ],
});

export { expect };

/** Chamadas `gtag(...)` registradas no dataLayer, como arrays. */
export const chamadasGtag = (page: Page) =>
  page.evaluate(() =>
    (window.dataLayer ?? [])
      .filter((e) => Object.prototype.toString.call(e) === "[object Arguments]")
      .map((e) => Array.from(e as ArrayLike<unknown>)),
  );

export const eventosGa4 = async (page: Page) =>
  (await chamadasGtag(page)).filter((c) => c[0] === "event").map((c) => ({ nome: c[1], parametros: c[2] }));

export const pushesDoDataLayer = (page: Page) =>
  page.evaluate(
    () =>
      (window.dataLayer ?? []).filter((e) => Object.prototype.toString.call(e) === "[object Object]") as Record<
        string,
        unknown
      >[],
  );

export const chamadasFbq = (page: Page) =>
  page.evaluate(() => (window as unknown as { __fbqChamadas?: unknown[][] }).__fbqChamadas ?? []);
