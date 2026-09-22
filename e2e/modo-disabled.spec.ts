import { aceitarTudo, enviarNewsletter, PAGINA_COM_NEWSLETTER } from "./apoioTagueamento";
import { chamadasFbq, eventosGa4, expect, pushesDoDataLayer, test } from "./fixtures";

/** Modo `disabled`, contra dist-disabled/. Nem aceitando tudo sai qualquer coisa. */

test("aceitar tudo e converter: zero terceiro, zero evento", async ({ page, medicao }) => {
  await page.goto(PAGINA_COM_NEWSLETTER);
  await aceitarTudo(page);
  await enviarNewsletter(page, { esperarAteMs: 2_500 });
  await page.waitForTimeout(800);

  expect(medicao).toEqual([]);
  expect(await eventosGa4(page)).toEqual([]);
  expect(await chamadasFbq(page)).toEqual([]);
  expect((await pushesDoDataLayer(page)).filter((p) => p.event === "lead_created" || p.event === "consent_updated")).toEqual([]);
});

test("o banner continua funcionando (o YouTube depende dele)", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#cc-main .cm")).toBeVisible();
});
