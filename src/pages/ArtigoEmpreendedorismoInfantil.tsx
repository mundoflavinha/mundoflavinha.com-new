import ArtigoLayout from "@/components/ArtigoLayout";
import albumDaCopa from "@/assets/Artigo/Album-da-Copa.webp";
import momentosNatacao from "@/assets/Artigo/Momentos-Natação.webp";
import empreendedorismoInfantil from "@/assets/Artigo/Empreendedorismo-Infantil.webp";
import brincadeiraNoCarro from "@/assets/Artigo/brincadeira-no-carro.webp";

const articleUrl = "https://mundoflavinha.com/blog/empreendedorismo-infantil";
const articleTitle = "O dia em que meus filhos criaram uma lojinha no prédio";

const tags = [
  "Empreendedorismo Infantil",
  "Educação Financeira Infantil",
  "Criatividade Infantil",
  "Brincar",
  "Autonomia Infantil",
  "Crianças Empreendedoras",
  "Brincadeiras Sem Telas",
  "Infância",
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
    title: "Presença se constrói nos pequenos momentos.",
    category: "Reflexão",
    image: momentosNatacao,
    href: "/blog/presenca-pequenos-momentos",
  },
  {
    title: "No carro da minha infância não existia tela. Existia conversa.",
    category: "Reflexão",
    image: brincadeiraNoCarro,
    href: "/blog/brincadeira-no-carro",
  },
];

const articleParagraphs = [
  "Eu sempre incentivei meus filhos a brincarem, pintarem, criarem, inventarem histórias, construírem coisas com as próprias mãos, descobrirem o mundo além das telas.",
  "E sem perceber... talvez eu também estivesse ensinando sobre empreendedorismo infantil, criatividade, coragem e valor do dinheiro.",
  "Nos últimos dias, Lucas e Bárbara começaram a produzir vários squishies artesanais de papel, feitos com algodão e muita imaginação. Também criaram pacotinhos surpresa.",
  "E havia uma frase que eles repetiam o tempo todo: “Vamos vender para comprar nossa casa.”",
  "Pode parecer apenas uma brincadeira infantil. Mas não era.",
  "Ali existia: iniciativa, criatividade, desejo, construção de sonhos, entendimento sobre esforço e recompensa. E eu sempre incentivei muito isso dentro de casa.",
  "Porque acredito que educação financeira infantil não começa falando sobre investimentos. Ela começa quando a criança entende de onde o dinheiro vem, que ele exige dedicação, que projetos podem gerar resultados e que, quando algo dá errado, precisamos encontrar soluções.",
  "Então, numa tarde comum, eu resolvi descer com eles para a portaria do prédio. Eles montaram literalmente uma lojinha no hall. Espalharam os squishies e começaram a abordar os moradores que passavam.",
  "E foi uma das experiências mais lindas que vivi como mãe.",
  "As pessoas paravam, conversavam, perguntavam o que era aquilo, elogiavam, diziam que eles já eram pequenos empreendedores. Mas... ninguém comprava.",
  "E ali veio a primeira grande lição. Nem todo interesse vira venda. Nem todo elogio vira resultado.",
  "Até que Lucas abordou uma pessoa e Bárbara finalizou a venda. Eles receberam o dinheiro com um sorriso que eu nunca vou esquecer.",
  "Depois disso, Bárbara percebeu quais corredores tinham mais movimento. Mudou os produtos de lugar. Começou a testar estratégias. E vendeu mais.",
  "Lucas ficou um pouco frustrado no início. Sem entender por que ela estava conseguindo vender mais do que ele. Mas ao invés de desistir, tomou uma decisão que me deixou emocionada. Enquanto ela vendia, ele subiria para produzir mais squishies. Porque os produtos estavam acabando.",
  "Naquele momento, sem perceber, eles estavam aprendendo sobre vendas, produção, estratégia, trabalho em equipe, adaptação e solução de problemas.",
  "Tudo através do lúdico.",
  "E Bárbara não parou por aí. Insatisfeita em vender apenas para os moradores do prédio, ela decidiu ir até o portão. Começou a abordar, pela grade mesmo, as pessoas que passavam na rua. Ela vendeu para pessoas caminhando na calçada.",
  "Já estava escuro. E ela não queria ir embora até vender quase tudo. E vendeu. Subimos para casa com o dinheirinho deles nas mãos.",
  "Dinheiro conquistado por eles. Pela criatividade deles. Pela coragem deles. E aquilo vale muito mais do que a venda dos squishies. Porque crianças que aprendem desde cedo sobre criatividade, comunicação, persistência e solução de problemas desenvolvem algo que nenhuma tela consegue ensinar: autonomia.",
  "O vídeo completo dessa experiência está no canal Mundo Flavinha e ficou emocionante porque mostra exatamente isso: a importância do brincar, da criatividade, da educação financeira infantil, do empreendedorismo desde cedo e de forma leve, saudável e lúdica.",
];

const ArtigoEmpreendedorismoInfantil = () => (
  <ArtigoLayout
    url={articleUrl}
    title={articleTitle}
    subtitle="Uma brincadeira com squishies de papel virou uma experiência linda sobre criatividade, educação financeira, persistência e autonomia na infância."
    category="Reflexão"
    readingTime="5 min de leitura"
    date="30 de maio de 2026"
    heroImage={empreendedorismoInfantil}
    pullQuote={"\"Tudo através do lúdico.\""}
    paragraphs={articleParagraphs}
    youtubeUrl="https://youtu.be/KGDxrRAvrQM"
    tags={tags}
    relatedPosts={relatedPosts}
    next={{ to: "/blog/brincadeira-no-carro", label: "No carro da minha infância não existia tela" }}
  />
);

export default ArtigoEmpreendedorismoInfantil;
