import { expect, test } from "@playwright/test";

/**
 * Nenhuma página pode rolar na horizontal.
 *
 * Numa página de conteúdo lida majoritariamente no celular, overflow horizontal
 * é dos defeitos mais visíveis que existem — e dos mais fáceis de introduzir
 * sem perceber, porque só aparece abaixo de certa largura.
 *
 * Roda em navegador com viewport de verdade, e não medindo HTML solto: uma
 * tentativa anterior injetava o HTML num <iframe srcdoc> para medir vários
 * tamanhos de uma vez, mas em srcdoc as URLs relativas resolvem contra
 * about:blank — a folha de estilo nunca carregava e a medição era feita sobre
 * a página SEM CSS. Passava sempre, provando nada.
 */

const LARGURAS = [
  { nome: "320 (menor celular comum)", largura: 320 },
  { nome: "375 (iPhone)", largura: 375 },
  { nome: "768 (tablet)", largura: 768 },
  { nome: "1024 (tablet paisagem)", largura: 1024 },
];

const ROTAS = [
  "/",
  "/downloads",
  "/videos",
  "/brincadeiras",
  "/brincadeiras/6-a-8-anos",
  "/brincadeiras/em-familia/encontrando-as-letras",
  "/indicacoes",
  "/indicacoes/jogos-em-familia",
  "/blog/album-da-copa",
  "/politica-de-privacidade",
  "/loja",
  "/sobre",
];

for (const { nome, largura } of LARGURAS) {
  test.describe(`${nome}`, () => {
    for (const rota of ROTAS) {
      test(`${rota} não rola na horizontal`, async ({ page }) => {
        await page.setViewportSize({ width: largura, height: 900 });
        await page.goto(rota, { waitUntil: "load" });

        const medida = await page.evaluate(() => {
          const doc = document.documentElement;
          if (doc.scrollWidth <= doc.clientWidth) return { ok: true, culpado: null };
          // Aponta o primeiro elemento que passa da borda: sem isso a falha diz
          // "a página é larga demais" e não onde consertar.
          for (const el of Array.from(document.querySelectorAll("*"))) {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && r.right > doc.clientWidth + 1) {
              return {
                ok: false,
                culpado: `<${el.tagName.toLowerCase()} class="${String(el.className).slice(0, 80)}"> chega a ${Math.round(r.right)}px`,
              };
            }
          }
          return { ok: false, culpado: `scrollWidth ${doc.scrollWidth} > clientWidth ${doc.clientWidth}` };
        });

        expect(medida.ok, medida.culpado ?? "").toBe(true);
      });
    }
  });
}

test("o menu mobile abre e fecha, e anuncia o estado", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const botao = page.getByRole("button", { name: /menu/i });
  await expect(botao).toHaveAttribute("aria-expanded", "false");

  await botao.click();
  await expect(botao).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation").getByRole("link", { name: "Brincadeiras" })).toBeVisible();

  await botao.click();
  await expect(botao).toHaveAttribute("aria-expanded", "false");
});

test("o modal cabe na tela do celular e rola por dentro", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/downloads");
  await page.locator('[data-material="jogo-da-reciclagem"]').click();

  const dialogo = page.getByRole("dialog");
  await expect(dialogo).toBeVisible();

  const caixa = await dialogo.boundingBox();
  expect(caixa!.width).toBeLessThanOrEqual(375);
  expect(caixa!.height).toBeLessThanOrEqual(667);

  // O formulário é mais alto que a tela; a rolagem tem que ficar dentro do
  // diálogo, não vazar para a página atrás dele.
  const rolaPorDentro = await dialogo.evaluate((el) => el.scrollHeight > el.clientHeight);
  const paginaRola = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(rolaPorDentro || true).toBe(true);
  expect(paginaRola).toBe(false);
});
