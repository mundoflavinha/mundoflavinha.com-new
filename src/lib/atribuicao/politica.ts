/**
 * Regras de persistência de atribuição. UMA função por conceito, mesmo que
 * hoje as duas tenham o mesmo corpo — porque a decisão de cada uma é
 * independente e muda por motivos diferentes.
 */

export type PreferenciaParaAtribuicao = { marketing: boolean };

/**
 * Identificadores de mídia (fbclid, _fbp, _fbc): exigem consentimento de
 * Publicidade. São identificadores de navegador para atribuição publicitária
 * — é exatamente a finalidade descrita na categoria "Publicidade" do banner.
 */
export const podeGuardarIdentificadoresDeMidia = (p: PreferenciaParaAtribuicao): boolean => p.marketing;

/**
 * UTMs: ⚠ PENDÊNCIA JURÍDICA — ver docs/adr/0001, seção "Pendências".
 *
 * Hoje exige consentimento de Publicidade. Isto NÃO afirma que UTM equivale a
 * cookie publicitário; é a regra mais conservadora, mantida até a revisão
 * decidir. A Política de Privacidade atual não menciona coleta de UTM, e
 * passar a gravá-las sem consentimento seria mudar a prática antes do texto.
 *
 * Se a revisão concluir que UTMs podem ser gravadas junto ao lead por outra
 * base legal (ex.: legítimo interesse, com menção na Política), a mudança é
 * esta linha e o texto da Política — nada mais no sistema.
 */
export const POLITICA_DE_CAMPANHA_PENDENTE_DE_REVISAO_JURIDICA = true;
export const podeGuardarCampanha = (p: PreferenciaParaAtribuicao): boolean => p.marketing;
