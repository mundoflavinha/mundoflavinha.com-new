import { aceitarSomente, aceitarTudo, CONTAINER_GTM, DA_META, enviarNewsletter, GTAG_DIRETO, PAGINA_COM_NEWSLETTER, recusarTudo, revogarTudo } from "./apoioTagueamento";
import { IDS_DE_TESTE } from "./ambientes.mjs";
import { chamadasFbq, eventosGa4, expect, pushesDoDataLayer, test } from "./fixtures";

/**
 * Modo `gtm`, contra dist-gtm/ (scripts/build-e2e.mjs). O site só alimenta o
 * dataLayer; GA4 e Meta NUNCA são carregados pelo código.
 */

test("sem escolha: zero requisição, nem ao GTM", async ({ page, medicao }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#cc-main .cm")).toBeVisible();
  expect(medicao).toEqual([]);
});

test("recusar: o container não é baixado", async ({ page, medicao }) => {
  await page.goto("/");
  await recusarTudo(page);
  await page.reload();
  expect(medicao).toEqual([]);
});

test("aceitar → SÓ o container; nunca gtag.js direto nem fbevents", async ({ page, medicao }) => {
  await page.goto("/");
  await aceitarTudo(page);

  await expect.poll(() => medicao.filter(CONTAINER_GTM).length).toBe(1);
  expect(medicao.filter(CONTAINER_GTM)[0].url).toContain(IDS_DE_TESTE.gtm);
  await page.waitForTimeout(800);
  expect(medicao.filter(GTAG_DIRETO)).toEqual([]);
  expect(medicao.filter(DA_META)).toEqual([]);
  expect(await page.evaluate(() => typeof (window as { fbq?: unknown }).fbq)).toBe("undefined");
});

test("só Estatísticas já libera o container, com os sinais certos", async ({ page, medicao }) => {
  await page.goto("/");
  await aceitarSomente(page, ["analytics"]);
  await expect.poll(() => medicao.filter(CONTAINER_GTM).length).toBe(1);

  const atualizacao = (await page.evaluate(() =>
    (window.dataLayer ?? [])
      .map((e) => Array.from(e as ArrayLike<unknown>))
      .filter((c) => c[0] === "consent" && c[1] === "update")
      .at(-1),
  )) as [string, string, Record<string, string>];
  expect(atualizacao[2]).toEqual({
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  expect((await pushesDoDataLayer(page)).filter((p) => p.event === "consent_updated").at(-1)).toMatchObject({
    consent: { analytics: "granted", marketing: "denied" },
  });
});

test("lead_created → dataLayer event lead_created; nada de gtag('event') nem fbq", async ({ page }) => {
  await page.goto(PAGINA_COM_NEWSLETTER);
  await aceitarTudo(page);
  await enviarNewsletter(page, { esperarAteMs: 2_500 });

  await expect
    .poll(async () => (await pushesDoDataLayer(page)).find((p) => p.event === "lead_created"))
    .toMatchObject({ lead: { type: "newsletter", source: "newsletter_compact" } });
  expect(await eventosGa4(page)).toEqual([]);
  expect(await chamadasFbq(page)).toEqual([]);
});

test("revogação → nenhum lead_created novo no dataLayer", async ({ page }) => {
  await page.goto(PAGINA_COM_NEWSLETTER);
  await aceitarTudo(page);
  await revogarTudo(page);
  await enviarNewsletter(page, { esperarAteMs: 2_500 });
  await page.waitForTimeout(800);

  expect((await pushesDoDataLayer(page)).filter((p) => p.event === "lead_created")).toEqual([]);
  expect((await pushesDoDataLayer(page)).filter((p) => p.event === "consent_updated").at(-1)).toMatchObject({
    consent: { analytics: "denied", marketing: "denied" },
  });
});
