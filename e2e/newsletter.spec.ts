import { expect, test } from "@playwright/test";

/**
 * A janela entre "o HTML do formulário já está na página" e "o React já
 * assumiu".
 *
 * O Astro renderiza a ilha no build, então o <form> existe e responde a Enter
 * antes da hidratação. Um <form> sem action nem method faz GET para a própria
 * URL — e o e-mail digitado vira query string, indo parar no histórico do
 * navegador, nos logs do servidor e no cabeçalho Referer enviado a terceiros.
 * Para um dado coletado sob consentimento, isso é vazamento.
 *
 * Nenhuma outra camada vê isso: o HTML é válido, os tipos batem, o teste de
 * unidade não roda navegador.
 */

test("submit antes da hidratação não navega nem põe o e-mail na URL", async ({ page }) => {
  // Regex, não glob: o Astro re-tenta o import com `?astro-retry=1`, e um glob
  // terminado em ".js" não casa com URL que tem query string.
  await page.route(/_astro\/.*NewsletterForm.*\.js/, (rota) => rota.abort());

  await page.goto("/blog/album-da-copa");

  const form = page.locator("[data-ilha-newsletter] form");
  await expect(form).toBeVisible();
  await expect(page.locator("[data-ilha-newsletter]")).toHaveAttribute("data-hidratado", "false");

  await form.locator('input[type="email"]').fill("fulana@exemplo.com");
  await form.locator('input[type="email"]').press("Enter");

  await page.waitForTimeout(500);

  expect(page.url()).not.toContain("fulana");
  expect(page.url()).not.toContain("?");
  await expect(page.locator("[data-aviso-hidratacao]")).toBeVisible();
});

test("depois de hidratar, o envio vai por fetch com o payload certo", async ({ page }) => {
  const enviados: unknown[] = [];
  await page.route("**/api/lead", async (rota) => {
    enviados.push(rota.request().postDataJSON());
    await rota.fulfill({ status: 201, contentType: "application/json", body: '{"ok":true}' });
  });

  await page.goto("/blog/album-da-copa");
  const casca = page.locator("[data-ilha-newsletter]");
  await casca.scrollIntoViewIfNeeded();
  await expect(casca).toHaveAttribute("data-hidratado", "true");

  await casca.locator('input[type="email"]').fill("fulana@exemplo.com");
  await casca.getByRole("button", { name: "Assinar newsletter" }).click();

  await expect(casca.getByRole("status")).toContainText("Inscrição confirmada");
  expect(page.url()).not.toContain("fulana");

  const payload = enviados[0] as Record<string, unknown>;
  expect(payload.type).toBe("newsletter");
  // A variante compact trata o próprio envio como ato afirmativo; a full exige
  // a caixa marcada. Uniformizar os dois mudaria o significado jurídico.
  expect(payload.origem).toBe("newsletter_compact");
  expect(payload.optInEmail).toBe(true);
  expect(payload.optInWhatsapp).toBe(false);
  expect(payload.nome).toBeUndefined();
});

test("a variante full exige o aceite explícito antes de habilitar o envio", async ({ page }) => {
  await page.goto("/");
  const casca = page.locator("[data-ilha-newsletter]");
  await casca.scrollIntoViewIfNeeded();
  await expect(casca).toHaveAttribute("data-hidratado", "true");

  const enviar = casca.getByRole("button", { name: /Quero receber/ });
  await casca.locator("#newsletter-email").fill("fulana@exemplo.com");
  await expect(enviar).toBeDisabled();

  await casca.getByRole("checkbox").first().click();
  await expect(enviar).toBeEnabled();
});

test("o link da Política dentro da ilha funciona e leva à página certa", async ({ page }) => {
  // Este link era um <Link> do react-router. Dentro de uma ilha não existe
  // <Router> acima dele, então renderizar já lançaria
  // "useHref() may be used only in the context of a <Router>" — a ilha inteira
  // sumiria em runtime, com tipos válidos e testes de unidade verdes.
  //
  // Dos cinco CONSENT_TEXTS, só três mencionam a Política; nenhum deles é o
  // texto das caixas de opt-in. A variante compact é onde ele aparece.
  await page.goto("/blog/album-da-copa");
  const casca = page.locator("[data-ilha-newsletter]");
  await casca.scrollIntoViewIfNeeded();
  await expect(casca).toHaveAttribute("data-hidratado", "true");

  const link = casca.getByRole("link", { name: "Política de Privacidade" });
  await expect(link).toHaveCount(1);
  await expect(link).toHaveAttribute("href", "/politica-de-privacidade");

  await link.click();
  await expect(page).toHaveURL(/\/politica-de-privacidade$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("clicar no texto de consentimento não marca a caixa por acidente", async ({ page }) => {
  // O texto de opt-in mora dentro de um <label> que envolve o checkbox: clicar
  // em qualquer parte dele alterna a caixa. É o comportamento certo para o
  // texto, e o motivo de `comLinkPolitica` chamar stopPropagation caso um dia
  // esses textos passem a citar a Política.
  await page.goto("/");
  const casca = page.locator("[data-ilha-newsletter]");
  await casca.scrollIntoViewIfNeeded();

  const caixa = casca.getByRole("checkbox").first();
  await expect(caixa).not.toBeChecked();
  await expect(casca.locator("label").filter({ has: caixa }).getByRole("link")).toHaveCount(0);
});
