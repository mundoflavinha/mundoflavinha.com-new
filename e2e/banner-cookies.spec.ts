import { expect, test } from "./fixtures";

/** Forma do banner: equivalência entre aceitar e recusar, teclado, layout. */

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
