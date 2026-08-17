/**
 * Catálogo de cookies e conteúdo externo — fonte única do banner E da Política.
 *
 * Existe para que a tabela exibida na Política e o que o banner oferece nunca
 * divirjam. Divergir aqui não é bug de layout: é o site declarando uma coisa e
 * fazendo outra, num documento que existe para ser confiável.
 *
 * NÃO CONFUNDIR com `src/lib/consent.ts`. São dois consentimentos diferentes,
 * com bases legais diferentes:
 *
 *   - consent.ts  → o que a pessoa aceitou ao ENVIAR UM FORMULÁRIO (e-mail
 *     marketing, WhatsApp, entrega de material). É prova jurídica, gravada
 *     append-only na tabela `consent_events`, com texto versionado e hash
 *     congelado em teste. Nunca é apagado nem reaproveitado.
 *   - este arquivo → preferência de NAVEGAÇÃO sobre cookies e conteúdo de
 *     terceiros. Mora num cookie do próprio navegador, pode ser trocada a
 *     qualquer momento e não vale como registro de nada.
 *
 * Misturar os dois corromperia o registro que já existe.
 */

export type CookieDeclarado = {
  nome: string;
  fornecedor: string;
  finalidade: string;
  duracao: string;
};

export type CategoriaCookie = {
  id: string;
  titulo: string;
  descricao: string;
  /** Necessários não podem ser recusados; o resto começa desligado. */
  obrigatoria: boolean;
  cookies: CookieDeclarado[];
};

/**
 * Sobe de número quando as categorias mudam de forma relevante — por exemplo
 * quando o Google Analytics entrar. O CookieConsent compara com o que está
 * gravado e mostra o banner de novo: uma escolha feita sobre um conjunto antigo
 * de categorias não vale como escolha sobre um conjunto novo.
 */
export const REVISAO_COOKIES = 1;

export const CATEGORIAS_COOKIES: CategoriaCookie[] = [
  {
    id: "necessary",
    titulo: "Necessários",
    descricao:
      "Guardam apenas a sua própria escolha sobre cookies. Sem eles, o site perguntaria de novo a cada página.",
    obrigatoria: true,
    cookies: [
      {
        nome: "cc_cookie",
        fornecedor: "Mundo Flavinha (primeira parte)",
        finalidade: "Guarda quais categorias você aceitou ou recusou",
        duracao: "6 meses",
      },
    ],
  },
  {
    id: "external_media",
    titulo: "Conteúdo externo",
    descricao:
      "Permite carregar os vídeos hospedados no YouTube. Enquanto você não autorizar, nenhum player é carregado e o Google não recebe nada por meio deles.",
    obrigatoria: false,
    cookies: [
      {
        nome: "Cookies do YouTube",
        fornecedor: "Google (YouTube, modo de privacidade ampliada)",
        finalidade: "Reprodução do vídeo e preferências do player",
        duracao: "Definida pelo Google",
      },
    ],
  },
];

/** Serviço do iframemanager e do CookieConsent. Mesma string nos dois lados. */
export const SERVICO_YOUTUBE = "youtube";
export const CATEGORIA_MIDIA_EXTERNA = "external_media";
