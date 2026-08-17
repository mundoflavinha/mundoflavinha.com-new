import { expect, test } from "@playwright/test";

/**
 * Nenhum contato com o Google antes de a pessoa pedir.
 *
 * Um <iframe> do YouTube montado junto com a página faz o navegador do
 * visitante falar com o Google — e receber cookies de terceiros — mesmo de quem
 * nunca quis assistir. O site já resolvia isso com um facade; a migração
 * reescreveu esse facade de React para JS puro, e a garantia precisa continuar
 * valendo. Na Fase 5 o iframemanager assume, amarrando a ativação ao
 * consentimento — este teste é o contrato que a troca tem que preservar.
 */

const DOMINIOS_GOOGLE = /(youtube\.com|youtube-nocookie\.com|ytimg\.com|google\.com|googlevideo\.com|doubleclick\.net)/;

test("a home não contata o YouTube antes do clique", async ({ page }) => {
  const pedidos: string[] = [];
  page.on("request", (req) => {
    if (DOMINIOS_GOOGLE.test(req.url())) pedidos.push(req.url());
  });

  await page.goto("/", { waitUntil: "networkidle" });
  expect(pedidos, `contatou: ${pedidos.join(", ")}`).toEqual([]);
});

test("o clique carrega o player, e só em youtube-nocookie", async ({ page }) => {
  await page.goto("/");
  await page.locator("[data-youtube-facade]").click();

  const iframe = page.locator('iframe[src*="youtube"]');
  await expect(iframe).toHaveCount(1);

  const src = await iframe.getAttribute("src");
  expect(src).toContain("youtube-nocookie.com");
  // start=19 vinha do componente React e é fácil de perder num port.
  expect(src).toContain("start=19");
  expect(src).toContain("autoplay=1");
});

test("/videos não contata o YouTube ao listar", async ({ page }) => {
  await page.route("**/api/videos", async (rota) =>
    rota.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        categories: ["Todos", "Brincadeiras"],
        videos: [
          {
            id: "abc123",
            title: "Brincadeira com tampinhas",
            url: "https://www.youtube.com/watch?v=abc123",
            embedUrl: "https://www.youtube-nocookie.com/embed/abc123",
            publishedAt: "2026-08-01T12:00:00Z",
            thumbnailUrl: "",
            categories: ["Brincadeiras"],
          },
        ],
      }),
    }),
  );

  const pedidos: string[] = [];
  page.on("request", (req) => {
    if (DOMINIOS_GOOGLE.test(req.url())) pedidos.push(req.url());
  });

  await page.goto("/videos");
  await expect(page.getByRole("heading", { name: "Brincadeira com tampinhas" })).toBeVisible();
  expect(pedidos, `contatou sem clique: ${pedidos.join(", ")}`).toEqual([]);

  await page.getByRole("button", { name: /Assistir Brincadeira com tampinhas/ }).click();
  await expect(page.locator('iframe[src*="youtube-nocookie"]')).toHaveCount(1);

  // Fechar precisa DESMONTAR o iframe: um player escondido continua tocando e
  // continua falando com o Google.
  await page.keyboard.press("Escape");
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("/videos aguenta resposta quebrada sem sumir com a página", async ({ page }) => {
  await page.route("**/api/videos", async (rota) =>
    rota.fulfill({ status: 200, contentType: "application/json", body: '{"lixo":true}' }),
  );

  await page.goto("/videos");
  // Sem validação, `data.videos.map` estouraria e a ilha inteira sumiria — a
  // pessoa veria um buraco branco, sem explicação.
  await expect(page.getByRole("alert")).toContainText("Não foi possível carregar os vídeos");
});

test("/videos mostra erro quando a API falha", async ({ page }) => {
  await page.route("**/api/videos", async (rota) => rota.fulfill({ status: 500, body: "erro" }));

  await page.goto("/videos");
  await expect(page.getByRole("alert")).toBeVisible();
});
