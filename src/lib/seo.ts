/**
 * Metadados de SEO por rota (issue #10).
 *
 * A cópia de cada entrada foi reaproveitada do que já existe na própria
 * página (subtitle do PageBanner, texto do hero) — não é texto novo
 * inventado para SEO, é o que a página já diz sobre si mesma.
 *
 * Páginas com dado dinâmico (artigos, detalhe de brincadeira, home) não
 * entram aqui — elas passam title/description explícitos para `<Layout>`.
 * Ver src/components/Seo.tsx para a resolução (explícito > esta tabela > default).
 */
import heroFamily from "@/assets/hero_family_01.webp";
import { REDES_SOCIAIS } from "./site";

export const SITE_URL = "https://mundoflavinha.com";

export const DEFAULT_SEO = {
  title: "Mundo Flavinha — Menos telas, mais infância",
  description:
    "Brincadeiras, atividades, vídeos e materiais para famílias que querem menos telas e mais memórias em família. Por Flávia, mãe do Lucas e da Bárbara.",
  image: heroFamily,
};

export { REDES_SOCIAIS };

export const ROUTE_SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Mundo Flavinha — Menos telas, mais infância",
    description:
      "Brincadeiras, ideias, atividades, materiais, vídeos e recursos para famílias que querem mais conexão com seus filhos.",
  },
  "/brincadeiras": {
    title: "Brincadeiras",
    description: "Todas as ideias cadastradas no Mundo Flavinha, organizadas por fase e por momentos em família.",
  },
  "/brincadeiras/0-a-2-anos": {
    title: "Brincadeiras de 0 a 2 anos",
    description: "Brincadeiras sem telas para bebês de 0 a 2 anos, com o que preparar e o que a criança desenvolve em cada uma.",
  },
  "/brincadeiras/3-a-5-anos": {
    title: "Brincadeiras de 3 a 5 anos",
    description: "Brincadeiras sem telas para crianças de 3 a 5 anos, com o que preparar e o que a criança desenvolve em cada uma.",
  },
  "/brincadeiras/6-a-8-anos": {
    title: "Brincadeiras de 6 a 8 anos",
    description: "Brincadeiras sem telas para crianças de 6 a 8 anos, com o que preparar e o que a criança desenvolve em cada uma.",
  },
  "/brincadeiras/em-familia": {
    title: "Brincadeiras em Família",
    description: "Brincadeiras para fazer em família, sem telas, para criar memórias e fortalecer vínculos.",
  },
  "/downloads": {
    title: "Materiais gratuitos para imprimir e brincar",
    description:
      "Atividades educativas prontas para famílias, professores e escolas incentivarem o aprendizado de forma lúdica.",
  },
  "/videos": {
    title: "Vídeos do Canal",
    description: "Toda segunda e quinta tem vídeo novo no canal Mundo Flavinha.",
  },
  "/indicacoes": {
    title: "Achadinhos da Flavinha",
    description:
      "Brinquedos, jogos e materiais que ajudam a criar memórias. Uma seleção especial para incentivar o brincar, a criatividade e a conexão entre pais e filhos.",
  },
  "/indicacoes/0-a-2-anos": {
    title: "Brinquedos de 0 a 2 anos",
    description: "Primeiras descobertas, estímulos sensoriais e muita diversão para os pequenos exploradores.",
  },
  "/indicacoes/3-a-5-anos": {
    title: "Brinquedos de 3 a 5 anos",
    description: "Imaginação, criatividade e brincadeiras que transformam aprendizado em aventura.",
  },
  "/indicacoes/6-a-8-anos": {
    title: "Brinquedos de 6 a 8 anos",
    description: "Jogos, desafios e atividades que estimulam raciocínio, autonomia e criatividade.",
  },
  "/indicacoes/jogos-em-familia": {
    title: "Jogos para Brincar em Família",
    description: "Momentos de conexão, risadas e memórias longe das telas.",
  },
  "/loja": {
    title: "Loja Flavinha",
    description: "Atividades prontas para imprimir, brincar e aprender - em casa ou na escola.",
  },
  "/loja/cartoes-alto-contraste-bebes": {
    title: "Cartões de Alto Contraste para Bebês",
    description: "Um kit imprimível para estimular os primeiros olhares do bebê de forma simples, segura, afetiva e sem telas.",
  },
  "/infoprodutos": {
    title: "Infoprodutos Mundo Flavinha",
    description:
      "Materiais digitais criados com carinho para famílias que querem brincar mais e se conectar melhor.",
  },
  "/blog": {
    title: "Blog da Flavinha",
    description: "Reflexões, dicas e histórias reais sobre maternidade, infância, vínculos, brincar e a vida como ela é.",
  },
  "/sobre": {
    title: "Sobre o Mundo Flavinha",
    description:
      "Conheça a história por trás do Mundo Flavinha, criado por Flávia, mãe do Lucas e da Bárbara, para famílias que querem mais presença e menos telas.",
  },
  "/politica-de-privacidade": {
    title: "Política de Privacidade",
    description: "Como o Mundo Flavinha coleta, usa e protege os seus dados.",
  },
  "/termos-de-uso": {
    title: "Termos de Uso",
    description: "As condições de uso do site e dos materiais do Mundo Flavinha.",
  },
  "/contato": {
    title: "Contato",
    description: "Fale com o Mundo Flavinha ou exerça seus direitos sobre os dados que você compartilhou.",
  },
};

export type JsonLd = Record<string, unknown>;

export const organizationJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mundo Flavinha",
  url: SITE_URL,
  logo: `${SITE_URL}${DEFAULT_SEO.image}`,
  sameAs: REDES_SOCIAIS.map((r) => r.href),
});

export const articleJsonLd = (params: {
  headline: string;
  description: string;
  image: string;
  url: string;
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: params.headline,
  description: params.description,
  image: params.image.startsWith("http") ? params.image : `${SITE_URL}${params.image}`,
  url: params.url,
  author: { "@type": "Person", name: "Flávia" },
  publisher: { "@type": "Organization", name: "Mundo Flavinha", url: SITE_URL },
});
