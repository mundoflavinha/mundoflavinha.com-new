import type { Page } from "@playwright/test";
import type { RequisicaoDeMedicao } from "./fixtures";

export const DO_GOOGLE = (r: RequisicaoDeMedicao) => /googletagmanager\.com|google-analytics\.com|analytics\.google\.com/.test(r.host);
export const DA_META = (r: RequisicaoDeMedicao) => /facebook\.net|facebook\.com/.test(r.host);
export const GTAG_DIRETO = (r: RequisicaoDeMedicao) => r.url.includes("googletagmanager.com/gtag/js");
export const CONTAINER_GTM = (r: RequisicaoDeMedicao) => r.url.includes("googletagmanager.com/gtm.js");

export const cookiesComPrefixo = async (page: Page, prefixo: string) =>
  (await page.context().cookies()).filter((c) => c.name.startsWith(prefixo));

const banner = (page: Page) => page.locator("#cc-main .cm");
const painel = (page: Page) => page.locator("#cc-main .pm");

export const aceitarTudo = (page: Page) => banner(page).getByRole("button", { name: "Aceitar tudo" }).click();
export const recusarTudo = (page: Page) =>
  banner(page).getByRole("button", { name: "Recusar o que não é necessário" }).click();

/** Escolhe categorias específicas no painel de preferências, a partir do banner. */
export async function aceitarSomente(page: Page, categorias: ("analytics" | "marketing")[]) {
  await banner(page).getByRole("button", { name: "Escolher o que permitir" }).click();
  for (const categoria of categorias) {
    await painel(page).locator(`input[type="checkbox"][value="${categoria}"]`).check();
  }
  await painel(page).getByRole("button", { name: "Salvar minhas escolhas" }).click();
  await painel(page).waitFor({ state: "hidden" });
}

export async function revogarTudo(page: Page) {
  await page.getByRole("button", { name: "Preferências de cookies" }).click();
  await painel(page).getByRole("button", { name: "Recusar o que não é necessário" }).click();
  await painel(page).waitFor({ state: "hidden" });
}

/** Página com a newsletter compacta (sem caixa de aceite) — fluxo já coberto em newsletter.spec.ts. */
export const PAGINA_COM_NEWSLETTER = "/blog/album-da-copa";

/**
 * Envia a newsletter com a API mockada respondendo 201.
 *
 * `esperarAteMs`: o formulário mede o tempo desde o carregamento
 * (`performance.now()`). Abaixo de 2s a API real trata como bot e responde
 * SUCESSO FALSO — o front não pode emitir `lead_created`. O mock responde 201
 * nos dois casos, exatamente como a API faria.
 */
export async function enviarNewsletter(page: Page, { esperarAteMs }: { esperarAteMs: number }) {
  await page.route("**/api/lead", (rota) =>
    rota.fulfill({ status: 201, contentType: "application/json", body: '{"ok":true}' }),
  );
  const casca = page.locator("[data-ilha-newsletter]");
  await casca.scrollIntoViewIfNeeded();
  await casca.locator("xpath=.").and(page.locator('[data-hidratado="true"]')).waitFor();

  const decorrido = await page.evaluate(() => performance.now());
  if (decorrido < esperarAteMs) await page.waitForTimeout(esperarAteMs - decorrido);

  const envio = page.waitForRequest("**/api/lead");
  await casca.locator('input[type="email"]').fill("fulana@exemplo.com");
  await casca.getByRole("button", { name: "Assinar newsletter" }).click();
  const requisicao = await envio;
  await casca.getByRole("status").filter({ hasText: "Inscrição confirmada" }).waitFor();
  return requisicao.postDataJSON() as { elapsedMs: number };
}
