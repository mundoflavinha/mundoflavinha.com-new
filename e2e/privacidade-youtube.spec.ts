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

const DOMINIOS_GOOGLE =
  /(youtube\.com|youtube-nocookie\.com|ytimg\.com|googlevideo\.com|google\.com|googleapis\.com|gstatic\.com|googletagmanager\.com|google-analytics\.com|doubleclick\.net)/;

/**
 * A asserção forte: NENHUMA requisição sai do nosso domínio ao carregar.
 *
 * A versão anterior listava domínios do Google por nome — e a lista tinha
 * `google.com`, que não casa com `fonts.googleapis.com` nem `fonts.gstatic.com`.
 * O teste passava verde enquanto todas as 122 páginas pediam as fontes ao
 * Google a cada visita, entregando IP, user-agent e Referer antes de qualquer
 * consentimento. Uma lista de domínios só pega o que quem escreveu lembrou.
 *
 * Por isso a regra aqui é por exclusão: só o próprio site. Qualquer terceiro
 * novo — analytics, fonte, CDN, pixel — falha por padrão e precisa de uma
 * decisão explícita para entrar.
 */
const ROTAS_SEM_TERCEIROS = ["/", "/sobre", "/blog/album-da-copa", "/downloads", "/brincadeiras"];

for (const rota of ROTAS_SEM_TERCEIROS) {
  test(`${rota} não faz nenhuma requisição a terceiros ao carregar`, async ({ page, baseURL }) => {
    const externas: string[] = [];
    page.on("request", (req) => {
      if (!req.url().startsWith(baseURL!) && !req.url().startsWith("data:")) externas.push(req.url());
    });

    await page.goto(rota, { waitUntil: "networkidle" });
    expect(externas, `saiu do domínio: ${externas.join(", ")}`).toEqual([]);
  });
}

test("as fontes são servidas pelo próprio domínio", async ({ page }) => {
  await page.goto("/sobre");
  const familias = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    return h1 ? getComputedStyle(h1).fontFamily : "";
  });
  // Se o @fontsource sair e o nome da família não bater, o texto cai no
  // fallback sans-serif do sistema sem erro nenhum — regressão só visual.
  expect(familias).toContain("Quicksand Variable");
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
            id: "abc123abc12",
            title: "Brincadeira com tampinhas",
            url: "https://www.youtube.com/watch?v=abc123",
            // URL de embed HOSTIL: a galeria não pode usar o que a API mandar.
            embedUrl: "https://exemplo-malicioso.invalido/embed/abc123abc12",
            publishedAt: "2026-08-01T12:00:00Z",
            // Miniatura REALISTA, apontando para o Google. A fixture antiga
            // usava string vazia, então a asserção "não contata o YouTube"
            // passava sem exercitar o caminho que importa. A galeria deve
            // ignorar este campo e derivar a URL do id, pelo nosso /api/thumb.
            thumbnailUrl: "https://i.ytimg.com/vi/abc123abc12/maxresdefault.jpg",
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

  // A miniatura sai pelo nosso domínio, montada a partir do id.
  await expect(page.locator("article img")).toHaveAttribute("src", "/api/thumb?id=abc123abc12");

  await page.getByRole("button", { name: /Assistir Brincadeira com tampinhas/ }).click();
  const player = page.locator("iframe");
  await expect(player).toHaveCount(1);
  // Ignora o embedUrl hostil da resposta e usa o derivado do id.
  await expect(player).toHaveAttribute("src", /^https:\/\/www\.youtube-nocookie\.com\/embed\/abc123abc12\?/);

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
