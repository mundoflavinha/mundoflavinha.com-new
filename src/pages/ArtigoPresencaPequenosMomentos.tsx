import ArtigoLayout from "@/components/ArtigoLayout";
import albumDaCopa from "@/assets/Artigo/Album-da-Copa.webp";
import momentosNatacao from "@/assets/Artigo/Momentos-Natação.webp";
import empreendedorismoInfantil from "@/assets/Artigo/Empreendedorismo-Infantil.webp";
import brincadeiraNoCarro from "@/assets/Artigo/brincadeira-no-carro.webp";

const articleUrl = "https://mundoflavinha.com/blog/presenca-pequenos-momentos";
const articleTitle = "Presença se constrói nos pequenos momentos";

const tags = [
  "Maternidade",
  "Infância",
  "Presença Materna",
  "Memórias Afetivas",
  "Tempo de Qualidade",
  "Mães e Filhos",
  "Natação Infantil",
  "Desenvolvimento Infantil",
  "Brincadeiras em Família",
  "Mundo Flavinha",
];

const relatedPosts = [
  {
    title: "Eu tinha prometido para mim mesma que NÃO iria comprar o álbum da Copa.",
    category: "Reflexão",
    image: albumDaCopa,
    href: "/blog/album-da-copa",
  },
  {
    title: "O dia em que meus filhos criaram uma lojinha no prédio.",
    category: "Reflexão",
    image: empreendedorismoInfantil,
    href: "/blog/empreendedorismo-infantil",
  },
  {
    title: "No carro da minha infância não existia tela. Existia conversa.",
    category: "Reflexão",
    image: brincadeiraNoCarro,
    href: "/blog/brincadeira-no-carro",
  },
];

const articleParagraphs = [
  "Participar da vida dos filhos de perto sempre foi algo muito importante para mim.",
  "Não apenas estar presente em datas especiais ou grandes acontecimentos, mas viver com eles os detalhes do dia a dia: os passeios, as conversas, as brincadeiras, as pequenas descobertas e também os momentos simples que, para eles, se tornam enormes.",
  "Recentemente, participei de uma aula de natação junto com meus filhos. A proposta era uma atividade entre mães e filhos, com brincadeiras, desafios e dinâmicas dentro da piscina.",
  "Antes mesmo de chegarmos à aula, o caminho já virou uma aventura. Encontramos o Homem-Aranha, uma girafa divertida e até o solzinho da Ri Happy, que a Bárbara adora. E é exatamente isso que torna a infância tão especial: a capacidade de transformar um trajeto comum em uma lembrança cheia de alegria.",
  "Na piscina, participamos de desafios com macarrão, equilíbrio no tatame, mergulhos, competição entre mães e filhos e muitas risadas. Foi uma aula diferente, leve, divertida e cheia de conexão.",
  "Para mim, momentos assim reforçam algo em que eu acredito muito: criança precisa de presença, participação e vínculo.",
  "Não precisa ser nada grandioso. Muitas vezes, o que marca é a mãe entrando na piscina, segurando a mão, torcendo, rindo junto, incentivando e vivendo aquela experiência de verdade.",
  "A natação, além de trabalhar coordenação, confiança, autonomia e segurança na água, também se torna uma oportunidade linda de fortalecer laços. Quando a família participa, a atividade ganha outro significado.",
  "No final, teve brincadeira, teve competição, teve sorteio, teve muita água para cima... e não, a gente não ganhou o sorteio. Mas saímos de lá com uma memória muito melhor: mais um dia especial vivido juntos.",
  "Porque, no fim, é isso que eu mais valorizo: construir memórias com eles enquanto ainda são pequenos.",
  "A infância passa rápido. E eu quero estar presente não apenas para ver, mas para viver junto.",
];

const ArtigoPresencaPequenosMomentos = () => (
  <ArtigoLayout
    url={articleUrl}
    title={articleTitle}
    subtitle="Entre brincadeiras na piscina, risadas e pequenos gestos de cuidado, uma reflexão sobre como a presença dos pais fortalece vínculos e constrói memórias afetivas na infância."
    category="Reflexão"
    readingTime="4 min de leitura"
    date="30 de maio de 2026"
    heroImage={momentosNatacao}
    pullQuote={"\"A infância passa rápido. E eu quero estar presente não apenas para ver, mas para viver junto.\""}
    paragraphs={articleParagraphs}
    youtubeUrl="https://youtu.be/3PM1AH6mUWA"
    tags={tags}
    relatedPosts={relatedPosts}
    next={{ to: "/blog/empreendedorismo-infantil", label: "O dia em que meus filhos criaram uma lojinha no prédio" }}
  />
);

export default ArtigoPresencaPequenosMomentos;
