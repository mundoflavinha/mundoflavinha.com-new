import {
  aceitarSomente,
  aceitarTudo,
  CONTAINER_GTM,
  cookiesComPrefixo,
  DA_META,
  DO_GOOGLE,
  enviarNewsletter,
  GTAG_DIRETO,
  PAGINA_COM_NEWSLETTER,
  recusarTudo,
  revogarTudo,
} from "./apoioTagueamento";
import { AMBIENTES, IDS_DE_TESTE } from "./ambientes.mjs";
import { chamadasFbq, eventosGa4, expect, pushesDoDataLayer, test } from "./fixtures";

/**
 * Modo `direct` (o de produção): GA4 e Meta carregados pelo site, cada um com
 * seu portão de consentimento. Nenhuma requisição sai para Google ou Meta —
 * os scripts são stubs (fixtures.ts) e o que se valida é o PAYLOAD.
 */

test.beforeAll(() => {
  expect(AMBIENTES.direct.env.PUBLIC_TAGGING_MODE).toBe("direct");
});

test.describe("bloqueio prévio", () => {
  test("sem escolha: zero requisição a Google, Meta ou GTM", async ({ page, medicao }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("#cc-main .cm")).toBeVisible();

    expect(medicao).toEqual([]);
    expect(await cookiesComPrefixo(page, "_ga")).toEqual([]);
    expect(await cookiesComPrefixo(page, "_fb")).toEqual([]);
    expect(await page.evaluate(() => typeof (window as { fbq?: unknown }).fbq)).toBe("undefined");
  });

  test("o dataLayer local pode existir, com os defaults NEGADOS", async ({ page }) => {
    await page.goto("/");
    const consentDefault = (await page.evaluate(() =>
      (window.dataLayer ?? [])
        .map((e) => Array.from(e as ArrayLike<unknown>))
        .find((c) => c[0] === "consent" && c[1] === "default"),
    )) as [string, string, Record<string, string>];
    expect(consentDefault[2]).toMatchObject({
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  });

  test("recusar: nada, inclusive navegando e recarregando", async ({ page, medicao }) => {
    await page.goto("/");
    await recusarTudo(page);
    await page.goto("/sobre");
    await page.goto("/brincadeiras");
    await page.reload();
    expect(medicao).toEqual([]);
  });
});

test.describe("portão por categoria", () => {
  test("só Estatísticas → GA4 direto; nem Meta, nem GTM", async ({ page, medicao }) => {
    await page.goto("/");
    await aceitarSomente(page, ["analytics"]);

    await expect.poll(() => medicao.filter(GTAG_DIRETO).length).toBe(1);
    expect(medicao.filter(GTAG_DIRETO)[0].url).toContain(IDS_DE_TESTE.ga4);
    await page.waitForTimeout(500);
    expect(medicao.filter(DA_META)).toEqual([]);
    expect(medicao.filter(CONTAINER_GTM)).toEqual([]);
  });

  test("só Publicidade → Meta; nem GA4, nem GTM", async ({ page, medicao }) => {
    await page.goto("/");
    await aceitarSomente(page, ["marketing"]);

    await expect.poll(() => medicao.filter(DA_META).length).toBe(1);
    await expect.poll(() => chamadasFbq(page)).toContainEqual(["init", IDS_DE_TESTE.metaPixel]);
    await page.waitForTimeout(500);
    expect(medicao.filter(DO_GOOGLE)).toEqual([]);
  });

  test("aceitar tudo → GA4 e Meta, e NUNCA o container do GTM", async ({ page, medicao }) => {
    await page.goto("/");
    await aceitarTudo(page);
    await expect.poll(() => medicao.filter(GTAG_DIRETO).length).toBe(1);
    await expect.poll(() => medicao.filter(DA_META).length).toBe(1);
    await page.waitForTimeout(500);
    expect(medicao.filter(CONTAINER_GTM)).toEqual([]);
  });
});

test.describe("lead_created", () => {
  test("lead válido → GA4 generate_lead e Meta Lead, com o mesmo evento", async ({ page }) => {
    await page.goto(PAGINA_COM_NEWSLETTER);
    await aceitarTudo(page);
    const payload = await enviarNewsletter(page, { esperarAteMs: 2_500 });
    expect(payload.elapsedMs).toBeGreaterThanOrEqual(2_000);

    await expect.poll(async () => (await eventosGa4(page)).map((e) => e.nome)).toContain("generate_lead");
    const ga4 = (await eventosGa4(page)).find((e) => e.nome === "generate_lead")!;
    expect(ga4.parametros).toMatchObject({ lead_source: "newsletter_compact", lead_type: "newsletter" });

    const meta = (await chamadasFbq(page)).find((c) => c[0] === "track" && c[1] === "Lead")!;
    expect(meta).toBeTruthy();
    // Mesmo evento de domínio → mesmo id nos dois providers.
    expect((meta[3] as { eventID: string }).eventID).toBe((ga4.parametros as { event_id: string }).event_id);

    // Nada de dado pessoal indo para fora.
    expect(JSON.stringify([ga4, meta])).not.toContain("fulana");
    // Em direct, nada de evento de domínio cru no dataLayer.
    expect((await pushesDoDataLayer(page)).filter((p) => p.event === "lead_created")).toEqual([]);
  });

  test("sucesso FALSO (201 com preenchimento < 2s) → nenhuma conversão", async ({ page }) => {
    await page.goto(PAGINA_COM_NEWSLETTER);
    await aceitarTudo(page);
    const payload = await enviarNewsletter(page, { esperarAteMs: 0 });
    test.skip(payload.elapsedMs >= 2_000, "a página demorou mais de 2s para ficar interativa neste ambiente");

    await page.waitForTimeout(800);
    expect((await eventosGa4(page)).map((e) => e.nome)).not.toContain("generate_lead");
    expect((await chamadasFbq(page)).filter((c) => c[1] === "Lead")).toEqual([]);
  });

  test("revogação → nenhum evento novo para provider proibido", async ({ page }) => {
    await page.goto(PAGINA_COM_NEWSLETTER);
    await aceitarTudo(page);
    await expect.poll(() => chamadasFbq(page)).toContainEqual(["init", IDS_DE_TESTE.metaPixel]);

    await revogarTudo(page);
    await expect.poll(() => chamadasFbq(page)).toContainEqual(["consent", "revoke"]);
    expect(await page.evaluate((id) => (window as Record<string, unknown>)[`ga-disable-${id}`], IDS_DE_TESTE.ga4)).toBe(true);

    const ga4Antes = (await eventosGa4(page)).length;
    await enviarNewsletter(page, { esperarAteMs: 2_500 });
    await page.waitForTimeout(800);

    expect((await eventosGa4(page)).length).toBe(ga4Antes);
    expect((await chamadasFbq(page)).filter((c) => c[1] === "Lead")).toEqual([]);
  });

  test("revogar apaga os cookies de GA4 e Meta", async ({ page }) => {
    await page.goto("/");
    await aceitarTudo(page);
    await expect.poll(async () => (await cookiesComPrefixo(page, "_ga")).length).toBeGreaterThan(0);
    await expect.poll(async () => (await cookiesComPrefixo(page, "_fb")).length).toBeGreaterThan(0);

    await revogarTudo(page);

    await expect.poll(async () => (await cookiesComPrefixo(page, "_ga")).length).toBe(0);
    await expect.poll(async () => (await cookiesComPrefixo(page, "_fb")).length).toBe(0);
  });
});
