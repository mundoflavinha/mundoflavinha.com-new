/**
 * Fonte única dos textos de consentimento.
 *
 * Consumido pelo front (formulários) e pela função serverless (api/lead.ts).
 * Por isso: TypeScript puro, sem React, sem imports, sem alias `@/`.
 *
 * REGRA IMPORTANTE: o cliente nunca envia o texto do consentimento — envia
 * apenas a versão e os booleanos. O servidor resolve o texto a partir daqui.
 * É isso que impede alguém forjar "fulana consentiu com X".
 *
 * NUNCA edite o texto de uma versão já publicada: isso reescreveria
 * retroativamente aquilo que todo mundo aceitou. Crie uma versão nova.
 * O teste em src/test/consent.test.ts trava o hash de cada versão publicada.
 */

export const CONSENT_VERSION = "2026-08-v1";

export type Finalidade = "entrega_material" | "email_marketing" | "whatsapp_marketing";
export type AcaoConsentimento = "concedido" | "negado" | "revogado";
export type OrigemFormulario = "lead_magnet" | "newsletter_full" | "newsletter_compact";

export type ConsentTexts = {
  /** Aviso acima do botão do modal. Não é checkbox: clicar em baixar já é o pedido. */
  entrega_material: string;
  /** Checkbox opcional, desmarcada. */
  email_marketing: string;
  /** Checkbox opcional, desmarcada, só aparece se o WhatsApp foi preenchido. */
  whatsapp_marketing: string;
  /** Aviso do formulário compacto (sidebar dos artigos), que tem uma finalidade só. */
  newsletter_compact: string;
  /** Rodapé de ambos os formulários. */
  rodape: string;
};

const TEXTS_BY_VERSION: Record<string, ConsentTexts> = {
  "2026-08-v1": {
    entrega_material:
      "Ao clicar em “Quero baixar grátis”, você autoriza o Mundo Flavinha a usar seu nome e e-mail para liberar e enviar o material solicitado, conforme a Política de Privacidade.",
    email_marketing:
      "Quero receber e-mails do Mundo Flavinha com novidades, brincadeiras e materiais gratuitos. Posso cancelar quando quiser.",
    whatsapp_marketing:
      "Quero receber mensagens no WhatsApp do Mundo Flavinha. Posso pedir para parar quando quiser.",
    newsletter_compact:
      "Ao assinar, você autoriza o Mundo Flavinha a enviar e-mails com novidades e materiais, e concorda com a Política de Privacidade. Cancele quando quiser.",
    rodape:
      "Seus dados são tratados conforme nossa Política de Privacidade. Você pode pedir acesso, correção ou exclusão a qualquer momento.",
  },
};

export const CONSENT_TEXTS = TEXTS_BY_VERSION[CONSENT_VERSION];

export const getConsentTexts = (versao: string): ConsentTexts | undefined => TEXTS_BY_VERSION[versao];

export const isKnownConsentVersion = (versao: string): boolean =>
  Object.prototype.hasOwnProperty.call(TEXTS_BY_VERSION, versao);

/** Versões publicadas, em ordem. Usado pelo teste que trava os hashes. */
export const PUBLISHED_CONSENT_VERSIONS = Object.keys(TEXTS_BY_VERSION);

/**
 * Faixa etária de INTERESSE do adulto — preferência de conteúdo.
 * Nunca rotular como "idade do seu filho": o ponto da mudança é justamente
 * deixar de tratar dado individualizado de criança.
 * Os valores precisam bater com contacts_faixa_chk em sql/migrations/001_lgpd.sql.
 */
export const FAIXAS_ETARIAS = [
  { value: "0-2", label: "0 a 2 anos" },
  { value: "3-5", label: "3 a 5 anos" },
  { value: "6-8", label: "6 a 8 anos" },
  { value: "familia", label: "Brincadeiras em família" },
] as const;

/** Valores precisam bater com contacts_perfil_chk em sql/migrations/001_lgpd.sql. */
export const PERFIS = [
  { value: "mae_pai", label: "Mãe ou pai" },
  { value: "avo", label: "Avó ou avô" },
  { value: "educador", label: "Educador(a) ou professor(a)" },
  { value: "outro", label: "Outro" },
] as const;

export type FaixaEtaria = (typeof FAIXAS_ETARIAS)[number]["value"];
export type Perfil = (typeof PERFIS)[number]["value"];

export const FAIXA_ETARIA_VALUES = FAIXAS_ETARIAS.map((f) => f.value) as readonly FaixaEtaria[];
export const PERFIL_VALUES = PERFIS.map((p) => p.value) as readonly Perfil[];
