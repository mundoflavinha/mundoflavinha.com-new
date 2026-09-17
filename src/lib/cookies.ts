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
  /**
   * Padrão que o CookieConsent usa para APAGAR o cookie quando a categoria é
   * recusada ou revogada. Sem ele, `autoClearCookies` não tem o que casar e a
   * revogação vira só uma promessa de não coletar MAIS — o identificador já
   * criado continua no navegador. Aceita string ou regex.
   */
  padrao?: string | RegExp;
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
 *
 * 2 → 3: entrou a categoria "Publicidade" (Meta Pixel). Quem escolheu sobre
 * três categorias não escolheu sobre quatro — reaproveitar aquele aceite seria
 * inventar um consentimento que ninguém deu, ainda mais para a finalidade que
 * mais exige escolha informada.
 */
export const REVISAO_COOKIES = 3;

/**
 * Nome do cookie do CMP. Constante porque quatro lugares precisam concordar:
 * a configuração do CookieConsent, a tabela da Política (gerada do catálogo
 * abaixo), a leitura server-side em `api/lead.ts` e os testes. Divergir aqui
 * faz a Política declarar um cookie que não existe e o servidor ler consentimento
 * de um cookie que nunca vai encontrar — ou seja, negar tudo, em silêncio.
 */
export const NOME_DO_COOKIE_DE_CONSENTIMENTO = "mundoflavinha_cookie_consent";

export const CATEGORIAS_COOKIES: CategoriaCookie[] = [
  {
    id: "necessary",
    titulo: "Necessários",
    descricao:
      "Guardam apenas a sua própria escolha sobre cookies. Sem eles, o site perguntaria de novo a cada página.",
    obrigatoria: true,
    cookies: [
      {
        nome: NOME_DO_COOKIE_DE_CONSENTIMENTO,
        fornecedor: "Mundo Flavinha (primeira parte)",
        finalidade: "Guarda quais categorias você aceitou ou recusou",
        // Bate com `expiresAfterDays: 365` em ConsentimentoCookies.astro.
        duracao: "12 meses",
      },
    ],
  },
  {
    id: "analytics",
    titulo: "Estatísticas",
    descricao:
      "Nos ajudam a entender quais páginas são úteis, de forma agregada. Nada é carregado antes de você aceitar, e recusar não muda nada no que você vê.",
    obrigatoria: false,
    cookies: [
      {
        nome: "_ga, _ga_*",
        padrao: /^_ga/,
        fornecedor: "Google Analytics",
        finalidade: "Distinguir visitantes e sessões para contagem agregada de acessos",
        duracao: "Até 2 anos",
      },
    ],
  },
  {
    id: "marketing",
    titulo: "Publicidade",
    descricao:
      "Permitem medir os resultados dos nossos anúncios na Meta (Facebook e Instagram) e mostrar conteúdo nosso para quem já visitou o site. Recusar não muda nada no que você vê aqui — só deixa de nos dizer se o anúncio funcionou.",
    obrigatoria: false,
    cookies: [
      {
        nome: "_fbp, _fbc",
        padrao: /^_fb/,
        fornecedor: "Meta Platforms (Facebook, Instagram)",
        finalidade:
          "Identificar o navegador para medir conversões de anúncios e formar público de remarketing",
        duracao: "Até 3 meses",
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
export const CATEGORIA_ESTATISTICAS = "analytics";
export const CATEGORIA_PUBLICIDADE = "marketing";
