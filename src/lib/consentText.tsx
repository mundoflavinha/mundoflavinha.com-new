import { ReactNode } from "react";
import { Link } from "react-router-dom";
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
 */
export const comLinkPolitica = (texto: string): ReactNode => {
  const marcador = "Política de Privacidade";
  const indice = texto.indexOf(marcador);
  if (indice === -1) return texto;

  return (
    <>
      {texto.slice(0, indice)}
      <Link
        to={ROTAS_LEGAIS.privacidade}
        className="text-primary underline underline-offset-2 hover:opacity-80"
        onClick={(event) => event.stopPropagation()}
      >
        {marcador}
      </Link>
      {texto.slice(indice + marcador.length)}
    </>
  );
};
