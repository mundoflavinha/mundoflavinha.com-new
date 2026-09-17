/**
 * Atribuição — LADO SERVIDOR. Importado por functions/api/lead.ts, que compila
 * SEM a lib DOM: nada de `window`/`document` aqui. Imports com `.js` (ESM).
 *
 * TERMINOLOGIA, porque ela já foi usada errado neste projeto:
 *
 *   Isto NÃO é "consentimento verificado no servidor". O servidor lê a
 *   PREFERÊNCIA DECLARADA pelo navegador: o cookie do CMP, escrito por
 *   JavaScript (`document.cookie`), sem HttpOnly e sem assinatura. Quem controla
 *   o navegador pode escrever qualquer coisa nele.
 *
 * O que É verificável aqui:
 *   - que a requisição chegou COM um cookie de preferência bem formado;
 *   - que ele foi emitido para a revisão vigente do catálogo (REVISAO_COOKIES);
 *   - quais categorias ele declara, e quando declara ter sido registrado.
 *
 * O que NÃO é verificável: que uma pessoa clicou em "Aceitar". Isso só seria
 * provável com o registro do clique gravado no servidor no momento do aceite
 * — que este projeto não faz para cookies (faz para formulários, em
 * `consent_events`).
 *
 * Por que ainda assim vale ler do cookie e não de um campo do corpo: o cookie
 * é o MESMO estado que o CMP usa para decidir carregar tags. Ler dele mantém
 * persistência e tagging coerentes, e um bug no front que mande identificador
 * sem consentimento não chega ao banco. Contra adulteração deliberada, não
 * protege — e o dano dela é limitado: só adultera a própria preferência.
 */

import { NOME_DO_COOKIE_DE_CONSENTIMENTO, REVISAO_COOKIES } from "../cookies.js";
import { podeGuardarCampanha, podeGuardarIdentificadoresDeMidia } from "./politica.js";
import { temAlgum, type Campanha, type IdentificadoresDeMidia } from "./tipos.js";

export type PreferenciaDeclarada = {
  categorias: string[];
  marketing: boolean;
  revisao: number;
  /** `lastConsentTimestamp` do CMP, tal como declarado pelo navegador. */
  registradaEm: string | null;
};

/**
 * Ausente, ilegível ou de outra revisão = `null`, tratado como NENHUMA
 * preferência. Nunca "concedido por padrão".
 */
export function lerPreferenciaDeclarada(cabecalhoCookie: string | null): PreferenciaDeclarada | null {
  if (!cabecalhoCookie) return null;

  const bruto = cabecalhoCookie
    .split(/;\s*/)
    .find((par) => par.startsWith(`${NOME_DO_COOKIE_DE_CONSENTIMENTO}=`))
    ?.slice(NOME_DO_COOKIE_DE_CONSENTIMENTO.length + 1);
  if (!bruto) return null;

  let dados: { categories?: unknown; revision?: unknown; lastConsentTimestamp?: unknown };
  try {
    dados = JSON.parse(decodeURIComponent(bruto));
  } catch {
    return null;
  }

  // Revisão antiga: o próprio CMP a descarta no navegador e pergunta de novo.
  // O servidor não pode ser mais permissivo que o banner.
  if (dados.revision !== REVISAO_COOKIES) return null;
  if (!Array.isArray(dados.categories)) return null;

  const categorias = dados.categories.filter((c): c is string => typeof c === "string");
  return {
    categorias,
    marketing: categorias.includes("marketing"),
    revisao: REVISAO_COOKIES,
    // Declarado pelo navegador: pode ser lixo. Só passa se for data válida,
    // senão o cast para timestamptz derrubaria o insert.
    registradaEm:
      typeof dados.lastConsentTimestamp === "string" && !Number.isNaN(Date.parse(dados.lastConsentTimestamp))
        ? new Date(dados.lastConsentTimestamp).toISOString()
        : null,
  };
}

export type AtribuicaoParaGravar = {
  campanha: Campanha | null;
  identificadoresDeMidia: IdentificadoresDeMidia | null;
  /** A preferência que AUTORIZOU a gravação — guardada junto, como contexto. */
  preferencia: PreferenciaDeclarada;
};

/**
 * Decide o que do payload pode ser gravado. `null` = nada a gravar (não cria
 * linha vazia só para registrar ausência).
 */
export function atribuicaoPermitida(
  cabecalhoCookie: string | null,
  payload: { campanha?: Campanha; identificadoresMidia?: IdentificadoresDeMidia },
): AtribuicaoParaGravar | null {
  const preferencia = lerPreferenciaDeclarada(cabecalhoCookie);
  if (!preferencia) return null;

  const campanha = podeGuardarCampanha(preferencia) && temAlgum(payload.campanha) ? payload.campanha! : null;
  const identificadoresDeMidia =
    podeGuardarIdentificadoresDeMidia(preferencia) && temAlgum(payload.identificadoresMidia)
      ? payload.identificadoresMidia!
      : null;

  if (!campanha && !identificadoresDeMidia) return null;
  return { campanha, identificadoresDeMidia, preferencia };
}
