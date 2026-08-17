/**
 * Dados institucionais do site, em um lugar só.
 *
 * Antes de publicar: substituir TODOS os placeholders entre colchetes.
 * A Política de Privacidade, os Termos e a página de Contato leem daqui —
 * assim os três nunca apontam para um e-mail diferente um do outro.
 */

/** Vira `false` quando os placeholders forem preenchidos e o texto revisado juridicamente. */
export const LEGAL_EM_REVISAO = true;

/** Versão dos documentos legais. Bump quando o conteúdo mudar de forma relevante. */
export const LEGAL_VERSAO = "2026-08-v2";
export const LEGAL_ATUALIZADO_EM = "17 de agosto de 2026";

export const CONTROLADOR = {
  nomeFantasia: "Mundo Flavinha",
  razaoSocial: "[RAZÃO SOCIAL]",
  cnpj: "[CNPJ]",
  endereco: "[ENDEREÇO COMPLETO]",
} as const;

export const CONTATO = {
  /** Contato geral do público. */
  email: "[E-MAIL DE CONTATO]",
  /** Canal para exercer direitos da LGPD (art. 18). Pode ser o mesmo do geral. */
  emailPrivacidade: "[E-MAIL DE PRIVACIDADE]",
  /** Encarregado / DPO. Facultativo para pequenos agentes, mas se houver, declare. */
  encarregado: "[NOME DO ENCARREGADO]",
  prazoRespostaDias: 15,
} as const;

export const WHATSAPP = {
  /** Só dígitos, com código do país (55) e DDD. Formato exigido pelo wa.me. */
  numero: "5521999854707",
  /** Convite do grupo único da comunidade Mundo Flavinha. */
  convitegrupo: "https://chat.whatsapp.com/JfktmjBesi274HxeFyuUJZ?s=sh&p=a&ilr=1" as string | null,
} as const;

/** Link direto de conversa. `texto` vira mensagem pré-preenchida. */
export const linkWhatsApp = (texto?: string) =>
  `https://wa.me/${WHATSAPP.numero}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;

export const REDES_SOCIAIS = [
  { label: "Instagram", href: "https://www.instagram.com/mundoflavinhaoficial/" },
  { label: "YouTube", href: "https://www.youtube.com/@mundoflavinha" },
  { label: "TikTok", href: "https://www.tiktok.com/@mundoflavinha" },
] as const;

export const ROTAS_LEGAIS = {
  privacidade: "/politica-de-privacidade",
  termos: "/termos-de-uso",
  contato: "/contato",
} as const;

/**
 * Operadores e terceiros que recebem ou processam dados dos visitantes.
 * Usado na seção de compartilhamento da Política — manter em sincronia com
 * a realidade do código, não com a intenção.
 */
export const OPERADORES = [
  { nome: "Vercel", papel: "Hospedagem do site e execução das funções de servidor", pais: "Estados Unidos" },
  { nome: "Neon", papel: "Banco de dados onde ficam os cadastros", pais: "Estados Unidos" },
  {
    nome: "Google / YouTube",
    papel:
      "Exibição dos vídeos incorporados, apenas depois que você autoriza conteúdo externo. A lista e as miniaturas passam pelo nosso servidor, então abrir a página de Vídeos não expõe seus dados ao Google",
    pais: "Estados Unidos",
  },
  { nome: "Amazon Associados", papel: "Links de recomendação de produtos", pais: "Estados Unidos" },
  { nome: "Meta / WhatsApp", papel: "Contato por WhatsApp, quando você opta por isso", pais: "Estados Unidos" },
] as const;
