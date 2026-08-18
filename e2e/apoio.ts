import type { Page } from "@playwright/test";

/**
 * Dispensa o banner de cookies antes de testar outra coisa.
 *
 * Desde que o Analytics entrou, o banner aparece na primeira visita de TODA
 * página — e fica na frente do conteúdo, competindo por foco e por clique.
 * Testes que não são sobre consentimento precisam começar do estado em que a
 * pessoa já respondeu, senão medem a interferência do banner em vez do que
 * pretendiam medir.
 *
 * Recusa, não aceita: é o estado mais restritivo, então nada de terceiro entra
 * por engano no meio de um teste sobre outro assunto.
 */
export const dispensarBannerDeCookies = async (page: Page) => {
  const banner = page.locator("#cc-main .cm");
  if (await banner.isVisible().catch(() => false)) {
    await banner.getByRole("button", { name: "Recusar o que não é necessário" }).click();
    await banner.waitFor({ state: "hidden" });
  }
};
