import { expect, test, type Page } from "@playwright/test";

/**
 * Bloqueio prévio do Google Analytics.
 *
 * A promessa é dura: nada do Google é baixado ou executado antes do aceite. Não
 * é "carregar e desligar" — é não carregar. Todos os modos de falha aqui são
 * silenciosos: a tag executa e ninguém vê, o ping sai antes do clique, o cookie
 * `_ga` aparece mesmo depois da recusa. Nada disso quebra a página, então só um
 * teste que observe a REDE percebe.
 *
 * Estes testes só rodam com PUBLIC_GA_ID definida no build — o mesmo mecanismo
 * que mantém o Analytics fora dos deploys de preview. Sem ela não há tag para
 * testar, e pular é honesto: o que precisaria ser provado não existe.
 */

const DOMINIOS_DE_MEDICAO = /(googletagmanager\.com|google-analytics\.com|analytics\.google\.com)/;

const temTagDeAnalytics = async (page: Page) =>
  (await page.locator('script[type="text/plain"][data-category="analytics"]').count()) > 0;

const cookiesDoGa = async (page: Page) =>
  (await page.context().cookies()).filter((c) => c.name.startsWith("_ga"));

test.describe("bloqueio prévio", () => {
  test("a tag existe no HTML mas nasce inerte", async ({ page }) => {
    await page.goto("/");
    test.skip(!(await temTagDeAnalytics(page)), "build sem PUBLIC_GA_ID");

    const loader = page.locator('script[data-category="analytics"][data-src]');
    await expect(loader).toHaveCount(1);

    // `data-src`, nunca `src`: script de tipo não executável com `src` de
    // verdade continuaria sendo buscado pelo navegador em algumas condições.
    await expect(loader).toHaveAttribute("type", "text/plain");
    expect(await loader.getAttribute("src")).toBeNull();
  });

  test("nenhum recurso do Google é pedido antes da escolha", async ({ page }) => {
    const medicao: string[] = [];
    page.on("request", (req) => {
      if (DOMINIOS_DE_MEDICAO.test(req.url())) medicao.push(req.url());
    });

    await page.goto("/", { waitUntil: "networkidle" });
    test.skip(!(await temTagDeAnalytics(page)), "build sem PUBLIC_GA_ID");

    // O banner precisa estar na frente: agora existe coleta que começaria sozinha.
    await expect(page.locator("#cc-main .cm")).toBeVisible();
    expect(medicao, `pediu antes do aceite: ${medicao.join(", ")}`).toEqual([]);
    expect(await cookiesDoGa(page)).toEqual([]);

    // Nem sequer as funções globais podem existir: sem `dataLayer`, não há como
    // enfileirar evento pré-consentimento para despachar depois.
    const globais = await page.evaluate(() => ({
      dataLayer: typeof (window as unknown as { dataLayer?: unknown }).dataLayer,
      gtag: typeof (window as unknown as { gtag?: unknown }).gtag,
    }));
    expect(globais).toEqual({ dataLayer: "undefined", gtag: "undefined" });
  });

  test("recusar mantém tudo bloqueado, inclusive ao navegar e recarregar", async ({ page }) => {
    await page.goto("/");
    test.skip(!(await temTagDeAnalytics(page)), "build sem PUBLIC_GA_ID");

    await page.locator("#cc-main .cm").getByRole("button", { name: "Recusar o que não é necessário" }).click();

    const medicao: string[] = [];
    page.on("request", (req) => {
      if (DOMINIOS_DE_MEDICAO.test(req.url())) medicao.push(req.url());
    });

    await page.goto("/sobre");
    await page.goto("/brincadeiras");
    await page.reload();

    expect(medicao, `pediu mesmo após recusa: ${medicao.join(", ")}`).toEqual([]);
    expect(await cookiesDoGa(page)).toEqual([]);
    await expect(page.locator("#cc-main .cm")).toBeHidden();
  });

  test("aceitar libera — e o primeiro contato é depois do clique", async ({ page }) => {
    await page.goto("/");
    test.skip(!(await temTagDeAnalytics(page)), "build sem PUBLIC_GA_ID");

    const medicao: string[] = [];
    page.on("request", (req) => {
      if (DOMINIOS_DE_MEDICAO.test(req.url())) medicao.push(req.url());
    });

    expect(medicao).toEqual([]);
    await page.locator("#cc-main .cm").getByRole("button", { name: "Aceitar tudo" }).click();

    await expect.poll(() => medicao.length, { timeout: 10_000 }).toBeGreaterThan(0);
    expect(medicao.some((u) => u.includes("googletagmanager.com"))).toBe(true);
  });

  test("revogar apaga os cookies do Google", async ({ page }) => {
    await page.goto("/");
    test.skip(!(await temTagDeAnalytics(page)), "build sem PUBLIC_GA_ID");

    await page.locator("#cc-main .cm").getByRole("button", { name: "Aceitar tudo" }).click();
    await expect.poll(async () => (await cookiesDoGa(page)).length, { timeout: 10_000 }).toBeGreaterThan(0);

    await page.getByRole("button", { name: "Preferências de cookies" }).click();
    await page
      .locator("#cc-main .pm")
      .getByRole("button", { name: "Recusar o que não é necessário" })
      .click();

    // `autoClearCookies` apaga os cookies da categoria recusada. Sem isso, a
    // recusa seria só uma promessa de não coletar MAIS — o identificador já
    // criado continuaria no navegador.
    await expect.poll(async () => (await cookiesDoGa(page)).length, { timeout: 10_000 }).toBe(0);
  });
});

test.describe("o banner em si", () => {
  test("recusar aparece no PRIMEIRO nível, com o mesmo peso de aceitar", async ({ page }) => {
    await page.goto("/");
    const banner = page.locator("#cc-main .cm");
    await expect(banner).toBeVisible();

    // A ANPD desaconselha destaque só no aceite e recusa escondida atrás de
    // "preferências". As duas ações têm que estar aqui, no mesmo nível.
    const aceitar = banner.getByRole("button", { name: "Aceitar tudo" });
    const recusar = banner.getByRole("button", { name: "Recusar o que não é necessário" });
    await expect(aceitar).toBeVisible();
    await expect(recusar).toBeVisible();

    const caixaAceitar = await aceitar.boundingBox();
    const caixaRecusar = await recusar.boundingBox();
    // Mesmo peso visual: tamanhos comparáveis, não um botão grande e um link
    // apagado. `equalWeightButtons` cuida disso, e o teste trava a decisão.
    expect(Math.abs(caixaAceitar!.height - caixaRecusar!.height)).toBeLessThan(6);
  });

  test("dá para percorrer e decidir só com o teclado", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#cc-main .cm")).toBeVisible();

    // A biblioteca move o foco para o banner, mas de forma assíncrona — contar
    // Tabs a partir de um instante fixo pega ora o banner, ora o menu do site.
    // O que precisa valer é o estado final: quem navega por teclado não deve
    // ter que caçar, no meio do documento, a pergunta que apareceu na frente.
    await expect
      .poll(() => page.evaluate(() => document.querySelector("#cc-main")?.contains(document.activeElement) ?? false))
      .toBe(true);

    // A partir dali, Tab percorre as opções e Enter decide — sem mouse.
    const rotulos: string[] = [];
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
      const rotulo = (await page.evaluate(() => document.activeElement?.textContent?.trim())) ?? "";
      rotulos.push(rotulo);
      if (rotulo === "Aceitar tudo") break;
    }
    expect(rotulos, `percorreu: ${rotulos.join(" → ")}`).toContain("Aceitar tudo");

    await page.keyboard.press("Enter");
    await expect(page.locator("#cc-main .cm")).toBeHidden();
  });

  test("o banner não empurra o conteúdo da página", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#cc-main .cm")).toBeVisible();
    const comBanner = await page.locator("h1").first().boundingBox();

    await page.locator("#cc-main .cm").getByRole("button", { name: "Aceitar tudo" }).click();
    await expect(page.locator("#cc-main .cm")).toBeHidden();
    const semBanner = await page.locator("h1").first().boundingBox();

    // Posição fixa, não fluxo: se o banner empurrasse o documento, o conteúdo
    // saltaria no momento em que a pessoa decide.
    expect(Math.abs(comBanner!.y - semBanner!.y)).toBeLessThan(2);
  });
});
