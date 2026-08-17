import type { ReactNode } from "react";
import { ROTAS_LEGAIS } from "@/lib/site";

/**
 * Renderiza o texto do consentimento transformando a menção à Política de
 * Privacidade em link — sem alterar o texto em si.
 *
 * Importante: o que aparece na tela precisa ser EXATAMENTE o que vai gravado em
 * consent_events.texto. Por isso o link é só apresentação; a string continua a
 * mesma constante que o servidor usa.
 *
 * Mora aqui, e não junto dos componentes de consentimento, porque é função pura
 * consumida por dois componentes — exportá-la de um arquivo de componente
 * quebra o Fast Refresh do Vite.
 *
 * Usa <a href>, não <Link> do react-router: os formulários agora são ilhas
 * Astro isoladas, e dentro de uma ilha não existe Router. O <Link> lançaria
 * "useHref() may be used only in the context of a <Router>" em runtime — erro
 * que nenhum teste de unidade pegaria, porque o Router existia no App.tsx que
 * envolvia tudo e deixou de existir.
 */
export const comLinkPolitica = (texto: string): ReactNode => {
  const marcador = "Política de Privacidade";
  const indice = texto.indexOf(marcador);
  if (indice === -1) return texto;

  return (
    <>
      {texto.slice(0, indice)}
      <a
        href={ROTAS_LEGAIS.privacidade}
        className="text-primary underline underline-offset-2 hover:opacity-80"
        // O texto de consentimento vive dentro de um <label> que envolve o
        // checkbox: sem isto, clicar no link também marcaria/desmarcaria a
        // caixa — registrando um consentimento que ninguém deu.
        onClick={(event) => event.stopPropagation()}
      >
        {marcador}
      </a>
      {texto.slice(indice + marcador.length)}
    </>
  );
};
