import { CATEGORIA_MIDIA_EXTERNA, SERVICO_YOUTUBE } from "@/lib/cookies";

/**
 * Ponte entre o CookieConsent e quem carrega conteúdo do YouTube.
 *
 * Existe porque há DOIS lugares que montam um player e eles vivem em mundos
 * diferentes: o facade estático da home (`YouTubeFacade.astro`, JS puro) e o
 * diálogo da galeria (`GaleriaVideos.tsx`, ilha React). Um gerenciador de
 * iframes global só enxergaria o primeiro — o segundo é criado pelo React
 * depois, em resposta a um clique. Centralizar a pergunta aqui evita que os
 * dois caminhos respondam coisas diferentes.
 *
 * Falha FECHADO de propósito: se a biblioteca não carregou, se o cookie está
 * corrompido ou se a revisão é antiga, a resposta é "não pode". Errar para o
 * lado de não carregar custa um clique a mais; errar para o outro lado é
 * contatar o Google sem autorização.
 */

// Importa o MÓDULO, não um global. O `import` ESM da biblioteca não cria
// `window.CookieConsent`; ler o global devolvia `undefined` e a checagem caía
// sempre no caminho de "não pode" — o player nunca carregava, mesmo aceito.
// Como Astro e Vite deduplicam, este import é a mesma instância que o
// ConsentimentoCookies.astro inicializou, com o mesmo estado.
import * as CookieConsent from "vanilla-cookieconsent";

export const podeCarregarMidiaExterna = (): boolean => {
  try {
    return CookieConsent.acceptedCategory(CATEGORIA_MIDIA_EXTERNA) === true;
  } catch {
    return false;
  }
};

/**
 * Abre as preferências para a pessoa decidir sobre conteúdo externo e resolve
 * com o que ela escolheu.
 *
 * Se a biblioteca não estiver disponível, resolve `false` em vez de travar: o
 * site continua utilizável, e o vídeo simplesmente não carrega.
 */
export type RespostaMidia = "autorizado" | "recusado" | "indisponivel";

/** A biblioteca só existe se ela mesma criou o contêiner do painel. */
export const consentimentoDisponivel = (): boolean => Boolean(document.getElementById("cc-main"));

export const pedirMidiaExterna = (): Promise<RespostaMidia> =>
  new Promise((resolve) => {
    // Distinguir "recusou" de "não deu para perguntar" importa: no primeiro
    // caso a pessoa decidiu e não há o que fazer; no segundo ela merece uma
    // saída, senão fica com um botão que não responde.
    if (!consentimentoDisponivel()) return resolve("indisponivel");

    // Em WINDOW: a biblioteca dispara com `dispatchEvent` nu no escopo do
    // módulo, que é window.dispatchEvent. Em document não chega nada.
    const aoDecidir = () => {
      window.removeEventListener("cc:onChange", aoDecidir);
      window.removeEventListener("cc:onConsent", aoDecidir);
      resolve(podeCarregarMidiaExterna() ? "autorizado" : "recusado");
    };

    window.addEventListener("cc:onChange", aoDecidir);
    window.addEventListener("cc:onConsent", aoDecidir);
    CookieConsent.showPreferences();
  });

export { SERVICO_YOUTUBE };
