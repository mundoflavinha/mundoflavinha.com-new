import { dispensarBannerDeCookies } from "./apoio";
import { expect, test, type Page } from "@playwright/test";

/**
 * Consentimento de cookies e conteúdo externo.
 *
 * NÃO confundir com o consentimento dos FORMULÁRIOS (src/lib/consent.ts), que é
 * prova jurídica gravada no banco. Aqui é preferência de navegação, guardada num
 * cookie do próprio navegador. Os dois nunca devem se encostar — este arquivo
 * inclusive verifica isso.
 */

const cookieDeConsentimento = async (page: Page) =>
  (await page.context().cookies()).find((c) => c.name === "cc_cookie");

test("a primeira visita pergunta ANTES de qualquer contato com terceiro", async ({ page, baseURL }) => {
  // O banner passou a aparecer na entrada quando o Analytics entrou: existe
  // coleta que começaria sozinha, sem nenhuma ação da pessoa, então a pergunta
  // tem que vir na frente. Enquanto não havia analytics, o banner ficava
  // desligado — perguntar sem ter o que coletar é ruído.
  const externas: string[] = [];
  page.on("request", (req) => {
    if (!req.url().startsWith(baseURL!) && !req.url().startsWith("data:")) externas.push(req.url());
  });

  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator("#cc-main .cm")).toBeVisible();
  expect(externas, `saiu do domínio antes da escolha: ${externas.join(", ")}`).toEqual([]);
  expect(await cookieDeConsentimento(page), "não deve gravar cookie sem escolha").toBeUndefined();
});

test("o rodapé abre as preferências em qualquer página", async ({ page }) => {
  await page.goto("/sobre");
  await dispensarBannerDeCookies(page);
  await page.getByRole("button", { name: "Preferências de cookies" }).click();

  const painel = page.locator("#cc-main .pm");
  await expect(painel).toBeVisible();
  await expect(painel.getByRole("button", { name: "Conteúdo externo" })).toBeVisible();
});

test("recusar é tão visível quanto aceitar, e nada fica pré-marcado", async ({ page }) => {
  await page.goto("/sobre");
  await dispensarBannerDeCookies(page);
  await page.getByRole("button", { name: "Preferências de cookies" }).click();

  const painel = page.locator("#cc-main .pm");
  await expect(painel.getByRole("button", { name: "Aceitar tudo" })).toBeVisible();
  await expect(painel.getByRole("button", { name: "Recusar o que não é necessário" })).toBeVisible();

  // Conteúdo externo começa DESLIGADO. Caixa pré-marcada não é consentimento.
  const externa = painel.locator('input[type="checkbox"][value="external_media"]');
  await expect(externa).not.toBeChecked();
});

test("sem autorização, o player da home não carrega e nada vai ao Google", async ({ page }) => {
  const google: string[] = [];
  page.on("request", (req) => {
    if (/youtube|ytimg|googlevideo/.test(req.url())) google.push(req.url());
  });

  await page.goto("/");
  await dispensarBannerDeCookies(page);
  await page.locator("[data-youtube-facade]").click();

  // O clique abre a pergunta, não o vídeo.
  await expect(page.locator("#cc-main .pm")).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
  expect(google, `contatou sem autorização: ${google.join(", ")}`).toEqual([]);
});

test("autorizando conteúdo externo, o player carrega — e só então há contato", async ({ page }) => {
  const google: string[] = [];
  page.on("request", (req) => {
    if (/youtube|ytimg|googlevideo/.test(req.url())) google.push(req.url());
  });

  await page.goto("/");
  await dispensarBannerDeCookies(page);
  await page.locator("[data-youtube-facade]").click();
  await page.locator("#cc-main .pm").getByRole("button", { name: "Aceitar tudo" }).click();

  const player = page.locator('iframe[src*="youtube-nocookie"]');
  await expect(player).toHaveCount(1);
  expect(google.length, "o contato só pode existir depois do aceite").toBeGreaterThan(0);

  // A escolha persiste: a segunda visita não pergunta de novo.
  await page.goto("/");
  await dispensarBannerDeCookies(page);
  await page.locator("[data-youtube-facade]").click();
  await expect(page.locator("#cc-main .pm")).toBeHidden();
  await expect(page.locator('iframe[src*="youtube-nocookie"]')).toHaveCount(1);
});

test("a galeria de /videos também respeita a escolha", async ({ page }) => {
  // O iframe de /videos é criado pelo React, então escaparia de um gerenciador
  // global de iframes: é a porta dos fundos que precisa estar fechada também.
  await page.route("**/api/videos", async (rota) =>
    rota.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        categories: ["Todos"],
        videos: [
          {
            id: "abc123abc12",
            title: "Brincadeira com tampinhas",
            url: "u",
            embedUrl: "https://www.youtube-nocookie.com/embed/abc123abc12",
            publishedAt: "2026-08-01T12:00:00Z",
            thumbnailUrl: "https://i.ytimg.com/vi/abc123abc12/maxresdefault.jpg",
            categories: [],
          },
        ],
      }),
    }),
  );

  await page.goto("/videos");
  await dispensarBannerDeCookies(page);
  await page.getByRole("button", { name: /Assistir Brincadeira/ }).click();

  await expect(page.locator("#cc-main .pm")).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);

  // Aceitar já retoma a intenção original: quem clicou em "Assistir" não deve
  // precisar clicar de novo depois de autorizar.
  await page.locator("#cc-main .pm").getByRole("button", { name: "Aceitar tudo" }).click();
  await expect(page.locator('iframe[src*="youtube-nocookie"]')).toHaveCount(1);
});

test("recusar mantém tudo bloqueado, inclusive depois de recarregar", async ({ page }) => {
  await page.goto("/sobre");
  await dispensarBannerDeCookies(page);
  await page.getByRole("button", { name: "Preferências de cookies" }).click();
  await page.locator("#cc-main .pm").getByRole("button", { name: "Recusar o que não é necessário" }).click();

  const google: string[] = [];
  page.on("request", (req) => {
    if (/youtube|ytimg|googlevideo/.test(req.url())) google.push(req.url());
  });

  await page.goto("/");
  await dispensarBannerDeCookies(page);
  await page.locator("[data-youtube-facade]").click();
  await expect(page.locator("iframe")).toHaveCount(0);
  expect(google).toEqual([]);
});

test("o cookie de cookies não se mistura com o consentimento dos formulários", async ({ page }) => {
  await page.goto("/sobre");
  await dispensarBannerDeCookies(page);
  await page.getByRole("button", { name: "Preferências de cookies" }).click();
  await page.locator("#cc-main .pm").getByRole("button", { name: "Aceitar tudo" }).click();

  const cookie = await cookieDeConsentimento(page);
  expect(cookie, "a escolha precisa ficar registrada em algum lugar").toBeTruthy();

  // O registro dos formulários vive no banco, versionado por CONSENT_VERSION, e
  // é prova jurídica do que a pessoa aceitou ao se cadastrar. Se essa versão
  // aparecer no cookie de navegação, os dois registros começaram a se
  // contaminar — e o do banco é o que não pode ser corrompido.
  expect(decodeURIComponent(cookie!.value)).not.toContain("2026-08-v1");
  expect(decodeURIComponent(cookie!.value)).not.toContain("email_marketing");
});
