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

  // `isVisible()` checado uma única vez corre contra a animação de entrada da
  // biblioteca: no instante do goto() o banner ainda não apareceu, a checagem
  // dá falso e a função sai sem clicar em nada — o banner aparece alguns
  // instantes depois e passa a interceptar cliques do teste que só queria
  // testar outra coisa. `waitFor` dá à animação o tempo de terminar antes de
  // decidir que não há banner nenhum.
  const apareceu = await banner
    .waitFor({ state: "visible", timeout: 5_000 })
    .then(() => true)
    .catch(() => false);
  if (!apareceu) return;

  await banner.getByRole("button", { name: "Recusar o que não é necessário" }).click();
  await banner.waitFor({ state: "hidden" });
};
