import { consentimentoAtual } from "../tagging";
import { podeGuardarCampanha, podeGuardarIdentificadoresDeMidia } from "./politica";
import { temAlgum, type Campanha, type IdentificadoresDeMidia } from "./tipos";

/**
 * Coleta no navegador. Só LEITURA e minimização: não envia o que a política
 * não permitiria gravar. A decisão final é do servidor (`servidor.ts`).
 *
 * Limitação conhecida: lê a URL da página DO ENVIO. Quem chega por um link
 * com UTM e navega antes de se cadastrar perde a origem. Guardar a UTM de
 * entrada exigiria armazenamento no dispositivo (sessionStorage) — o que
 * entra na mesma pendência jurídica das UTMs. Ver ADR.
 */

const limpar = (valor: string | null | undefined): string | undefined => {
  const texto = valor?.trim();
  return texto ? texto.slice(0, 255) : undefined;
};

const lerCookie = (nome: string): string | undefined =>
  limpar(
    document.cookie
      .split("; ")
      .find((par) => par.startsWith(`${nome}=`))
      ?.slice(nome.length + 1),
  );

export function coletarAtribuicao(): { campanha?: Campanha; identificadoresMidia?: IdentificadoresDeMidia } {
  if (typeof window === "undefined") return {};

  const preferencia = consentimentoAtual();
  const params = new URLSearchParams(window.location.search);
  const saida: { campanha?: Campanha; identificadoresMidia?: IdentificadoresDeMidia } = {};

  if (podeGuardarCampanha(preferencia)) {
    const campanha: Campanha = {
      utmSource: limpar(params.get("utm_source")),
      utmMedium: limpar(params.get("utm_medium")),
      utmCampaign: limpar(params.get("utm_campaign")),
      utmContent: limpar(params.get("utm_content")),
      utmTerm: limpar(params.get("utm_term")),
    };
    if (temAlgum(campanha)) saida.campanha = campanha;
  }

  if (podeGuardarIdentificadoresDeMidia(preferencia)) {
    const ids: IdentificadoresDeMidia = {
      fbclid: limpar(params.get("fbclid")),
      fbp: lerCookie("_fbp"),
      fbc: lerCookie("_fbc"),
    };
    if (temAlgum(ids)) saida.identificadoresMidia = ids;
  }

  return saida;
}
