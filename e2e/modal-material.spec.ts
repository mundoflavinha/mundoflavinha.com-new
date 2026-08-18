import { dispensarBannerDeCookies } from "./apoio";
import { expect, test, type Page } from "@playwright/test";

/**
 * A ponte entre os gatilhos estáticos e a ilha do modal.
 *
 * É o único ponto da migração em que um clique atravessa a fronteira entre HTML
 * estático e React. Todos os modos de falha aqui são silenciosos: o clique some,
 * o botão fica ocupado para sempre, o material aberto é o errado. Nada disso
 * aparece em typecheck, em teste de unidade ou em grep no HTML.
 */

const PRIMEIRO = "jogo-da-reciclagem";
const SEGUNDO = "cada-tampinha-no-seu-lugar";

// ESTE diálogo, não o painel de cookies — que também é role="dialog" e fica no
// DOM mesmo depois de dispensado. Sem o recorte, "nenhum diálogo aberto" nunca
// seria verdade e o teste de Escape mediria o modal errado.
const dialogo = (page: Page) => page.locator('[data-modal="lead"]');

test.describe("abertura pelo gatilho estático", () => {
  for (const rota of ["/", "/downloads"]) {
    test(`${rota}: clique abre o modal do material clicado`, async ({ page }) => {
      await page.goto(rota);
      await dispensarBannerDeCookies(page);
      await page.locator(`[data-material="${SEGUNDO}"]`).click();

      await expect(dialogo(page)).toBeVisible();
      await expect(dialogo(page).getByRole("heading", { name: "Cada Tampinha no Seu Lugar" })).toBeVisible();
    });
  }

  test("Enter no gatilho abre o modal (o card é um <button> de verdade)", async ({ page }) => {
    // Na versão React da home o card era um <div> com onClick: dava para
    // acionar pelo teclado só porque o Enter caía num <Button> interno e o
    // clique borbulhava. Nada disso estava declarado — e o <button> dentro de
    // <button> de /downloads era HTML inválido.
    await page.goto("/");
    await dispensarBannerDeCookies(page);
    await page.locator(`[data-material="${PRIMEIRO}"]`).focus();
    await page.keyboard.press("Enter");

    await expect(dialogo(page)).toBeVisible();
  });

  test("Space também aciona", async ({ page }) => {
    await page.goto("/downloads");
    await dispensarBannerDeCookies(page);
    await page.locator(`[data-material="${PRIMEIRO}"]`).focus();
    await page.keyboard.press("Space");

    await expect(dialogo(page)).toBeVisible();
  });
});

test.describe("corrida de hidratação", () => {
  test("clique ANTES da hidratação abre o material certo depois", async ({ page }) => {
    // Segura o chunk da ilha, clica, e só então libera. Sem a caixa de entrada
    // do LeadModal.astro este clique se perderia sem deixar rastro — que é o
    // motivo de a caixa existir.
    let liberar: () => void = () => {};
    const chunkSegurado = new Promise<void>((resolve) => {
      liberar = resolve;
    });

    await page.route(/_astro\/.*LeadCaptureModal.*\.js/, async (rota) => {
      await chunkSegurado;
      await rota.continue();
    });

    await page.goto("/downloads");

    await dispensarBannerDeCookies(page);
    await page.locator(`[data-material="${SEGUNDO}"]`).click();

    // Enquanto o chunk não chega: nada de modal, mas o clique ficou guardado.
    await expect(dialogo(page)).toHaveCount(0);
    await expect(page.locator("[data-lead-mailbox]")).toHaveAttribute("data-estado", "pendente");

    liberar();

    await expect(dialogo(page)).toBeVisible();
    await expect(dialogo(page).getByRole("heading", { name: "Cada Tampinha no Seu Lugar" })).toBeVisible();
  });

  test("cliques múltiplos antes da hidratação: vence o primeiro", async ({ page }) => {
    let liberar: () => void = () => {};
    const chunkSegurado = new Promise<void>((resolve) => {
      liberar = resolve;
    });
    await page.route(/_astro\/.*LeadCaptureModal.*\.js/, async (rota) => {
      await chunkSegurado;
      await rota.continue();
    });

    await page.goto("/downloads");

    await dispensarBannerDeCookies(page);
    await page.locator(`[data-material="${PRIMEIRO}"]`).click();
    await page.locator(`[data-material="${SEGUNDO}"]`).click();
    liberar();

    // Abre UM modal só, e é o do primeiro clique: quem clicou espera ver o que
    // pediu, não o último que encostou.
    await expect(dialogo(page)).toHaveCount(1);
    await expect(dialogo(page).getByRole("heading", { name: "Jogo da Reciclagem" })).toBeVisible();
  });

  test("chunk que nunca carrega avisa e libera o botão", async ({ page }) => {
    // Sem timeout, a caixa transformaria "clique perdido" em "clique esperando
    // para sempre": o botão fica ocupado e a pessoa não recebe nem formulário
    // nem explicação.
    // Regex, não glob: quando o import falha, o Astro tenta de novo com
    // `?astro-retry=1`, e um glob terminado em ".js" não casa com uma URL que
    // carrega query string. A segunda tentativa passava e a ilha hidratava
    // mesmo com o chunk "bloqueado" — o teste media a coisa errada.
    await page.route(/_astro\/.*LeadCaptureModal.*\.js/, (rota) => rota.abort());

    await page.goto("/downloads");

    await dispensarBannerDeCookies(page);
    const gatilho = page.locator(`[data-material="${PRIMEIRO}"]`);
    await gatilho.click();

    const mailbox = page.locator("[data-lead-mailbox]");
    await expect(mailbox).toHaveAttribute("data-estado", "falhou", { timeout: 15_000 });
    await expect(mailbox).toContainText("Não foi possível carregar o formulário");
    await expect(gatilho).not.toHaveAttribute("aria-busy", "true");
  });
});

test.describe("foco e teclado", () => {
  test("abrir move o foco para dentro; Escape fecha e devolve ao gatilho", async ({ page }) => {
    await page.goto("/downloads");
    await dispensarBannerDeCookies(page);
    const gatilho = page.locator(`[data-material="${SEGUNDO}"]`);
    await gatilho.click();
    await expect(dialogo(page)).toBeVisible();

    expect(await dialogo(page).evaluate((el) => el.contains(document.activeElement))).toBe(true);

    await page.keyboard.press("Escape");
    await expect(dialogo(page)).toHaveCount(0);
    await expect(gatilho).toBeFocused();
  });

  test("fechar limpa TODOS os campos, por qualquer caminho", async ({ page }) => {
    // Antes só o X limpava o formulário; fechar por ESC ou clique fora deixava
    // os dados preenchidos para a próxima abertura — inclusive para outra
    // pessoa no mesmo dispositivo.
    await page.goto("/downloads");
    await dispensarBannerDeCookies(page);
    await page.locator(`[data-material="${SEGUNDO}"]`).click();

    await dialogo(page).locator("#lead-nome").fill("Fulana");
    await dialogo(page).locator("#lead-email").fill("fulana@exemplo.com");
    await page.keyboard.press("Escape");

    await page.locator(`[data-material="${SEGUNDO}"]`).click();
    await expect(dialogo(page).locator("#lead-nome")).toHaveValue("");
    await expect(dialogo(page).locator("#lead-email")).toHaveValue("");
  });
});

test.describe("envio", () => {
  test("manda o payload exato para /api/lead e mostra o PDF certo", async ({ page }) => {
    const enviados: unknown[] = [];
    await page.route("**/api/lead", async (rota) => {
      enviados.push(rota.request().postDataJSON());
      await rota.fulfill({ status: 201, contentType: "application/json", body: '{"ok":true}' });
    });

    await page.goto("/downloads");

    await dispensarBannerDeCookies(page);
    await page.locator(`[data-material="${SEGUNDO}"]`).click();
    await dialogo(page).locator("#lead-nome").fill("Fulana de Tal");
    await dialogo(page).locator("#lead-email").fill("fulana@exemplo.com");
    await dialogo(page).getByRole("button", { name: "Quero baixar grátis!" }).click();

    await expect(dialogo(page).getByRole("heading", { name: "Pronto!" })).toBeVisible();

    expect(enviados).toHaveLength(1);
    const payload = enviados[0] as Record<string, unknown>;
    expect(payload.type).toBe("lead_magnet");
    expect(payload.origem).toBe("lead_magnet");
    // O NOME, não o id: é o que já está gravado em material_requests.
    expect(payload.material).toBe("Cada Tampinha no Seu Lugar");
    expect(payload.optInEmail).toBe(false);
    // Sem número informado, não existe decisão sobre WhatsApp a registrar.
    expect(payload.optInWhatsapp).toBe(false);
    expect(payload.consentVersion).toBeTruthy();

    const link = dialogo(page).getByRole("link", { name: /Baixar agora/ });
    await expect(link).toHaveAttribute("href", `/materiais/${SEGUNDO}.pdf`);

    // O arquivo existe de verdade — durante toda a vida do projeto este link
    // apontou para um 404 em produção.
    const resposta = await page.request.get(`/materiais/${SEGUNDO}.pdf`);
    expect(resposta.status()).toBe(200);
  });

  test("erro do servidor preserva os dados e permite tentar de novo", async ({ page }) => {
    let tentativas = 0;
    await page.route("**/api/lead", async (rota) => {
      tentativas += 1;
      if (tentativas === 1) return rota.fulfill({ status: 500, body: "erro" });
      return rota.fulfill({ status: 201, contentType: "application/json", body: '{"ok":true}' });
    });

    await page.goto("/downloads");

    await dispensarBannerDeCookies(page);
    await page.locator(`[data-material="${PRIMEIRO}"]`).click();
    await dialogo(page).locator("#lead-nome").fill("Fulana");
    await dialogo(page).locator("#lead-email").fill("fulana@exemplo.com");
    await dialogo(page).getByRole("button", { name: "Quero baixar grátis!" }).click();

    await expect(dialogo(page).getByRole("alert")).toContainText("Não foi possível enviar");
    // O que a pessoa digitou continua lá: perder isso obrigaria a redigitar tudo.
    await expect(dialogo(page).locator("#lead-nome")).toHaveValue("Fulana");

    await dialogo(page).getByRole("button", { name: "Quero baixar grátis!" }).click();
    await expect(dialogo(page).getByRole("heading", { name: "Pronto!" })).toBeVisible();
  });
});
