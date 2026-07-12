import { ArrowDown, Brain, ExternalLink, Heart, Puzzle, Star, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import dobble from "@/assets/achadinhos-normalizados/6-8/6-8anos-dobble-jogo-de-cartas-para-amigos-2-a-8-jogadores-idade-6-anos.jpg";
import kitRobotica from "@/assets/achadinhos-normalizados/6-8/6-8anos-blocosdemontarconstrucaoderobosciencia6em1.jpg";
import blocosMecanicos from "@/assets/achadinhos-normalizados/6-8/6-8anos-brastoy-blocos-de-construcao-152-pecas.jpg";
import cienciasTurmaMonica from "@/assets/achadinhos-normalizados/6-8/6-8anos-ciencias-turma-da-monica-franjinha-e-milena.jpg";
import tapaCerto from "@/assets/achadinhos-normalizados/6-8/6-8anos-estrela-jogo-tapa-certo.jpg";
import horaDoRush from "@/assets/achadinhos-normalizados/6-8/6-8anos-hora-rush-bigstar.jpg";
import bingoInfantil from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-bingo-com-48-cartelas.jpg";
import caiNaoCai from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-cai-nao-cai-brinquedos-estrela.jpg";
import cilada from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-cilada-estrela.jpg";
import comoEuMeSinto from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-como-eu-me-sinto-grow.jpg";
import geniusViagem from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-genius-para-viagem-versao-de-bolso-estrela.jpg";
import jogoForca from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-da-forca-educativo-infantil-jogo-de-palavras-em-portugues-com-pecas-magneticas-e-roleta-brinquedo-educativo-familia-7-anos.jpg";
import truqueMestre from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-de-magica-truque-de-mestre-junior-estrela.jpg";
import blokus from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-de-tabuleiro-blokus-para-criancas-a-partir-de-7-anos.jpg";
import lince from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-de-tabuleiro-lince-grow.jpg";
import imagemAcaoJunior from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-imagem-acao-junior.jpg";
import euSou from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-eu-sou-estrela.jpg";
import lig4 from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-lig-4-estrela.jpg";
import stop10Segundos from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-tabuleiro-stop-10-segundos.jpg";
import viraLetras from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-vira-letras-estrela.jpg";
import microscopioInfantil from "@/assets/achadinhos-normalizados/6-8/6-8anos-microscopio-infantil-polibrinq-22-cm-ate-1200x.jpg";
import superLudo from "@/assets/achadinhos-normalizados/6-8/6-8anos-pais-e-filhos-super-ludo-jogo-de-tabuleiro-com-cartas.jpg";
import mapaBrasil from "@/assets/achadinhos-normalizados/6-8/6-8anos-quebra-cabeca-mapa-do-brasil-100-pecas.jpg";
import puzzleDidatico from "@/assets/achadinhos-normalizados/6-8/6-8anos-tabuleiro-puzzle-didatico-5-6-7-8-9-anos.jpg";
import tacoGato from "@/assets/achadinhos-normalizados/6-8/6-8anos-taco-gato-cabra-queijo-pizza-papergames.jpg";
import paisesBandeiras from "@/assets/achadinhos-normalizados/6-8/6-8anos-toyster-jogo-educativo-paises-e-suas-bandeiras.jpg";
import twister from "@/assets/achadinhos-normalizados/6-8/6-8anos-twister-novos-movimentos-jogo-de-equilibrio-2-jogadores-ou-mais-a-partir-de-6-anos.jpg";
import unoNoMercy from "@/assets/achadinhos-normalizados/6-8/6-8anos-uno-jogo-de-cartas-no-mercy-7-anos.jpg";
import unoOriginal from "@/assets/achadinhos-normalizados/6-8/6-8anos-uno-original.jpg";
import contraTempo from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-contra-o-tempo-polibrinq.jpg";
import clubeDoJogo from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-de-tabuleiro-12-jogos-em-1-clube-do-jogo.jpg";
import conectaCano from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-de-tabuleiro-conecta-cano-estrategia-e-raciocinio.jpg";
import speedCups from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-speed-cups-paki-toys.jpg";
import operando from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-classic-operation-refresh.jpg";
import jogo4Em1 from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-4-em-1-junges.jpg";
import triominos from "@/assets/achadinhos-normalizados/6-8/6-8anos-elka-jogo-triominos-original.jpg";
import stopRodaLetras from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-de-tabuleiro-tipo-stop-cartas-em-portugues-com-roda-de-letras-36-cartas.jpg";
import gangorraPalavras from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-gangorra-de-palavras-original-grande.jpg";
import genius from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-genius-estrela-multicores.jpg";
import pizzariaMaluca from "@/assets/achadinhos-normalizados/6-8/6-8anos-pizza-maluca.jpg";
import rummikubJunior from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-rummikub-junior.jpg";
import magneton from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-magnetico-magneton-game-com-esferas-magneticas.jpg";

export const products = [
  {
    title: "Dobble - Encontre os Iguais",
    eyebrow: "Diversão rápida que faz a mente trabalhar",
    description: "Um jogo viciante onde vence quem encontra os símbolos iguais mais rápido. Desenvolve atenção, agilidade visual e raciocínio.",
    recommendedAge: "6 anos+",
    image: dobble,
    link: "https://amzn.to/4e6kjqL",
  },
  {
    title: "Kit Robótica STEM 6 em 1",
    eyebrow: "O brinquedo para pequenos inventores",
    description: "Monte robôs e descubra na prática conceitos de ciência e engenharia. Desenvolve lógica, criatividade e pensamento científico.",
    recommendedAge: "8 anos+",
    image: kitRobotica,
    link: "https://amzn.to/4acbmLa",
  },
  {
    title: "Blocos de Construção Mecânicos",
    eyebrow: "Construir, testar e descobrir",
    description: "A criança monta máquinas e entende como engrenagens funcionam. Desenvolve raciocínio lógico e resolução de problemas.",
    recommendedAge: "6 anos+",
    image: blocosMecanicos,
    link: "https://amzn.to/4eoT6AL",
  },
  {
    title: "Ciências Turma da Mônica",
    eyebrow: "Experimentos que despertam a curiosidade",
    description: "Transforma a criança em uma pequena cientista. Desenvolve investigação, observação e pensamento científico.",
    recommendedAge: "7 anos+",
    image: cienciasTurmaMonica,
    link: "https://amzn.to/4vsb0rU",
  },
  {
    title: "Tapa Certo",
    eyebrow: "Risadas garantidas em família",
    description: "Quem encontrar primeiro o animal correto leva vantagem. Desenvolve atenção, reflexos e percepção visual.",
    recommendedAge: "5 anos+",
    image: tapaCerto,
    link: "https://amzn.to/4g30gMd",
  },
  {
    title: "Hora do Rush",
    eyebrow: "O desafio que faz o cérebro trabalhar",
    description: "Encontre a saída do congestionamento usando lógica. Desenvolve planejamento, estratégia e concentração.",
    recommendedAge: "6 anos+",
    image: horaDoRush,
    link: "https://amzn.to/43N80dZ",
  },
  {
    title: "Bingo Infantil",
    eyebrow: "Um clássico que nunca sai de moda",
    description: "Perfeito para reunir família e amigos em momentos divertidos. Desenvolve atenção, números e socialização.",
    recommendedAge: "6 anos+",
    image: bingoInfantil,
    link: "https://amzn.to/43gPquI",
  },
  {
    title: "Cai Não Cai",
    eyebrow: "A tensão divertida que prende a atenção",
    description: "Retire as varetas sem deixar as bolinhas caírem. Desenvolve coordenação, estratégia e paciência.",
    recommendedAge: "5 anos+",
    image: caiNaoCai,
    link: "https://amzn.to/4xbOMw3",
  },
  {
    title: "Cilada",
    eyebrow: "O quebra-cabeça que desafia a mente",
    description: "Cada desafio exige raciocínio e criatividade para encontrar a solução. Desenvolve lógica, percepção espacial e foco.",
    recommendedAge: "6 anos+",
    image: cilada,
    link: "https://amzn.to/4xbtVZW",
  },
  {
    title: "Como Eu Me Sinto?",
    eyebrow: "Aprendendo a falar sobre emoções",
    description: "Ajuda crianças a identificar sentimentos e desenvolver empatia. Desenvolve inteligência emocional e comunicação.",
    recommendedAge: "7 anos+",
    image: comoEuMeSinto,
    link: "https://amzn.to/4x7PEBQ",
  },
  {
    title: "Genius Viagem",
    eyebrow: "O clássico desafio da memória",
    description: "Repita as sequências e desafie seu cérebro. Desenvolve memória e concentração.",
    recommendedAge: "6 anos+",
    image: geniusViagem,
    link: "https://amzn.to/4epc4Hu",
  },
  {
    title: "Jogo da Forca",
    eyebrow: "Aprender português brincando",
    description: "Uma forma divertida de ampliar vocabulário e estimular a leitura. Desenvolve alfabetização, ortografia e raciocínio.",
    recommendedAge: "7 anos+",
    image: jogoForca,
    link: "https://amzn.to/4uXSLeq",
  },
  {
    title: "Truque de Mestre Júnior",
    eyebrow: "O primeiro kit de mágica",
    description: "Transforme seu filho em um verdadeiro mágico e encante toda a família. Desenvolve comunicação, criatividade e autoconfiança.",
    recommendedAge: "8 anos+",
    image: truqueMestre,
    link: "https://amzn.to/4oapjzb",
  },
  {
    title: "Blokus",
    eyebrow: "Estratégia para pequenos gênios",
    description: "Um dos jogos mais premiados do mundo para estimular o raciocínio. Desenvolve lógica, planejamento e visão espacial.",
    recommendedAge: "7 anos+",
    image: blokus,
    link: "https://amzn.to/4vzALHc",
  },
  {
    title: "Lince",
    eyebrow: "Quem encontra primeiro?",
    description: "Um clássico que exige atenção e rapidez para localizar as figuras. Desenvolve percepção visual e concentração.",
    recommendedAge: "5 anos+",
    image: lince,
    link: "https://amzn.to/4fryTLN",
  },
  {
    title: "Jogo de Matemática com Palitos",
    eyebrow: "Matemática na prática",
    description: "Aprender números e operações fica muito mais divertido. Desenvolve raciocínio matemático e cálculo mental.",
    recommendedAge: "6 anos+",
    image: puzzleDidatico,
    link: "https://amzn.to/4e5zrEC",
  },
  {
    title: "Imagem & Ação Júnior",
    eyebrow: "Solte a imaginação",
    description: "Desenhe, adivinhe e divirta-se com a família. Desenvolve criatividade, expressão e comunicação.",
    recommendedAge: "5 anos+",
    image: imagemAcaoJunior,
    link: "https://amzn.to/49DcYNV",
  },
  {
    title: "Eu Sou?",
    eyebrow: "Descubra quem você é",
    description: "Um jogo divertido de perguntas e dedução. Desenvolve raciocínio lógico e comunicação.",
    recommendedAge: "6 anos+",
    image: euSou,
    link: "https://amzn.to/4e5mvi7",
  },
  {
    title: "Lig 4",
    eyebrow: "Estratégia que diverte gerações",
    description: "Alinhe quatro peças antes do adversário e vença o desafio. Desenvolve estratégia, planejamento e raciocínio lógico.",
    recommendedAge: "6 anos+",
    image: lig4,
    link: "https://amzn.to/4fZe3Dx",
  },
  {
    title: "Stop 10 Segundos",
    eyebrow: "Desafio contra o relógio",
    description: "A emoção do Stop agora ainda mais rápida e divertida. Desenvolve criatividade, vocabulário e rapidez de pensamento.",
    recommendedAge: "6 anos+",
    image: stop10Segundos,
    link: "https://amzn.to/3Q51LPA",
  },
  {
    title: "Vira Letras",
    eyebrow: "Brincando de formar palavras",
    description: "Um jogo perfeito para crianças que estão avançando na leitura. Desenvolve alfabetização, ortografia e raciocínio verbal.",
    recommendedAge: "6 anos+",
    image: viraLetras,
    link: "https://amzn.to/4vt4fGr",
  },
  {
    title: "Microscópio Infantil",
    eyebrow: "Um novo mundo escondido nos detalhes",
    description: "Descubra plantas, insetos e objetos como um verdadeiro pesquisador. Desenvolve observação, investigação e pensamento científico.",
    recommendedAge: "6 anos+",
    image: microscopioInfantil,
    link: "https://amzn.to/4dZJRFL",
  },
  {
    title: "Super Ludo",
    eyebrow: "Diversão em família que atravessa gerações",
    description: "Um clássico que ensina a ganhar, perder e esperar a vez. Desenvolve estratégia, convivência e paciência.",
    recommendedAge: "7 anos+",
    image: superLudo,
    link: "https://amzn.to/43TJbwU",
  },
  {
    title: "Quebra-Cabeça Mapa do Brasil",
    eyebrow: "Conheça o Brasil brincando",
    description: "Uma forma divertida de aprender geografia enquanto monta o mapa. Desenvolve concentração, memória e conhecimentos geográficos.",
    recommendedAge: "8 anos+",
    image: mapaBrasil,
    link: "https://amzn.to/4fZJcGW",
  },
  {
    title: "Puzzle Didático de Raciocínio",
    eyebrow: "Um desafio que prende a atenção por horas",
    description: "Encaixe as peças corretamente e encontre a solução. Desenvolve lógica, percepção espacial e resolução de problemas.",
    recommendedAge: "6 anos+",
    image: puzzleDidatico,
    link: "https://amzn.to/4dP1PMt",
  },
  {
    title: "Taco Gato Cabra Queijo Pizza",
    eyebrow: "Rápido, engraçado e viciante",
    description: "Um dos jogos de cartas mais divertidos para brincar em família. Desenvolve atenção, reflexos e concentração.",
    recommendedAge: "8 anos+",
    image: tacoGato,
    link: "https://amzn.to/4odAS8L",
  },
  {
    title: "Países e Suas Bandeiras",
    eyebrow: "Viaje pelo mundo sem sair de casa",
    description: "Aprenda sobre países, bandeiras e culturas brincando. Desenvolve memória, conhecimento geográfico e concentração.",
    recommendedAge: "6 anos+",
    image: paisesBandeiras,
    link: "https://amzn.to/4fmNlEK",
  },
  {
    title: "Twister",
    eyebrow: "A brincadeira que faz a família inteira rir",
    description: "Mãos e pés nos lugares certos... sem cair! Desenvolve coordenação motora, equilíbrio e interação social.",
    recommendedAge: "6 anos+",
    image: twister,
    link: "https://amzn.to/4e5mtXx",
  },
  {
    title: "UNO No Mercy",
    eyebrow: "O UNO para quem gosta de emoção até o último segundo",
    description: "Novas regras e cartas deixam a disputa ainda mais divertida. Desenvolve estratégia, atenção e tomada de decisões.",
    recommendedAge: "7 anos+",
    image: unoNoMercy,
    link: "https://amzn.to/4ocmr4H",
  },
  {
    title: "UNO Original",
    eyebrow: "O clássico que nunca sai de moda",
    description: "Um jogo simples de aprender e divertido para todas as idades. Desenvolve raciocínio rápido, observação e convivência familiar.",
    recommendedAge: "7 anos+",
    image: unoOriginal,
    link: "https://amzn.to/4xbOTaX",
  },
  {
    title: "Contra o Tempo",
    eyebrow: "Quem consegue pensar e agir antes do cronômetro explodir?",
    description: "Um desafio divertido que mistura rapidez, coordenação e muita emoção. Desenvolve agilidade mental, coordenação motora e concentração.",
    recommendedAge: "5 anos+",
    image: contraTempo,
    link: "https://amzn.to/4x7ax04",
  },
  {
    title: "Clube do Jogo 12 em 1",
    eyebrow: "Doze jogos clássicos em uma única caixa",
    description: "Diversão garantida para diferentes idades e momentos em família. Desenvolve raciocínio lógico, estratégia e convivência.",
    recommendedAge: "5 anos+",
    image: clubeDoJogo,
    link: "https://amzn.to/4uave8B",
  },
  {
    title: "Conecta Cano",
    eyebrow: "Monte caminhos e conecte as peças para vencer",
    description: "Um jogo que desafia a criatividade e o raciocínio. Desenvolve lógica, percepção espacial e planejamento.",
    recommendedAge: "5 anos+",
    image: conectaCano,
    link: "https://amzn.to/4uN5X5D",
  },
  {
    title: "Speed Cups",
    eyebrow: "Rapidez, atenção e muita emoção",
    description: "Observe, organize os copos e toque a campainha primeiro. Desenvolve atenção, velocidade de processamento e coordenação.",
    recommendedAge: "5 anos+",
    image: speedCups,
    link: "https://amzn.to/4vvroIr",
  },
  {
    title: "Operando",
    eyebrow: "Mãos firmes e muita concentração",
    description: "Retire os objetos sem tocar nas bordas e sem fazer barulho. Desenvolve coordenação motora fina e concentração.",
    recommendedAge: "6 anos+",
    image: operando,
    link: "https://amzn.to/4ftxioD",
  },
  {
    title: "Jogo 4 em 1",
    eyebrow: "Quatro clássicos em um único tabuleiro",
    description: "Diversão garantida para diferentes idades e momentos. Desenvolve estratégia, concentração e convivência familiar.",
    recommendedAge: "6 anos+",
    image: jogo4Em1,
    link: "https://amzn.to/4xchehr",
  },
  {
    title: "Triominos",
    eyebrow: "O dominó reinventado",
    description: "Um desafio inteligente que exige atenção e estratégia. Desenvolve lógica, matemática e pensamento estratégico.",
    recommendedAge: "6 anos+",
    image: triominos,
    link: "https://amzn.to/4unxwS1",
  },
  {
    title: "Stop com Roda de Letras",
    eyebrow: "O clássico Stop em uma versão super divertida",
    description: "Gire a roda, pense rápido e encontre as melhores respostas. Desenvolve vocabulário, criatividade e rapidez mental.",
    recommendedAge: "7 anos+",
    image: stopRodaLetras,
    link: "https://amzn.to/4vzIlBE",
  },
  {
    title: "Gangorra de Palavras",
    eyebrow: "Quem encontra as palavras mais rápido?",
    description: "Um desafio divertido para ampliar o vocabulário. Desenvolve leitura, ortografia e raciocínio rápido.",
    recommendedAge: "6 anos+",
    image: gangorraPalavras,
    link: "https://amzn.to/43hE7SU",
  },
  {
    title: "Genius",
    eyebrow: "O clássico desafio de memória que atravessa gerações",
    description: "Repita as sequências e tente superar seus limites. Desenvolve memória, concentração e atenção.",
    recommendedAge: "6 anos+",
    image: genius,
    link: "https://amzn.to/4uMAZuh",
  },
  {
    title: "Pizzaria Maluca",
    eyebrow: "Quem monta a pizza mais rápido?",
    description: "Um desafio divertido que mistura rapidez e observação. Desenvolve atenção, coordenação motora e agilidade.",
    recommendedAge: "6 anos+",
    image: pizzariaMaluca,
    link: "https://amzn.to/4fsJqpT",
  },
  {
    title: "Rummikub Júnior",
    eyebrow: "Matemática e diversão caminhando juntas",
    description: "Uma versão infantil de um dos jogos mais premiados do mundo. Desenvolve raciocínio lógico, números e planejamento.",
    recommendedAge: "6 anos+",
    image: rummikubJunior,
    link: "https://amzn.to/4xfvgiw",
  },
  {
    title: "Magneton",
    eyebrow: "Estratégia, suspense e magnetismo em cada jogada",
    description: "Um jogo simples de aprender e difícil de parar de jogar. Desenvolve raciocínio lógico, estratégia e planejamento.",
    recommendedAge: "6 anos+",
    image: magneton,
    link: "https://amzn.to/3ROwocC",
  },
];

const benefitHighlights = [
  { label: "Raciocínio Lógico", Icon: Brain },
  { label: "Autonomia", Icon: Star },
  { label: "Estratégia", Icon: Target },
  { label: "Concentração", Icon: Puzzle },
  { label: "Vínculo Familiar", Icon: Heart },
];

const developmentItems = [
  "Raciocínio lógico",
  "Estratégia e planejamento",
  "Atenção e concentração",
  "Autonomia",
  "Criatividade",
  "Inteligência emocional",
  "Interação em família",
];

const favoriteProducts = products.slice(0, 3);

const Achadinhos68 = () => {
  return (
    <Layout>
      <PageBanner
        title="Brinquedos de 6 a 8 anos"
        subtitle="Jogos, desafios e atividades que estimulam raciocínio, autonomia e criatividade."
        bgColor="bg-pastel-yellow/20"
      />

      <section className="pt-6 pb-12 md:pt-8 md:pb-16">
        <div className="container">
          <div className="mx-auto max-w-6xl rounded-3xl bg-card p-5 md:p-8 shadow-sm mb-12">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-center">
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benefitHighlights.map(({ label, Icon }) => (
                    <div key={label} className="flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-heading font-bold text-sm text-foreground">{label}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-lg font-heading font-semibold text-foreground">
                  Veja os brinquedos recomendados
                </p>
                <a href="#produtos">
                  <Button className="mt-4 rounded-full bg-primary text-primary-foreground font-heading font-bold gap-2">
                    Ver todos os brinquedos <ArrowDown className="w-4 h-4" />
                  </Button>
                </a>
              </div>

              <div>
                <p className="font-heading font-semibold text-primary">
                  Selecionados por Flavinha para estimular raciocínio, autonomia e criatividade brincando.
                </p>
                <div className="mt-2 flex items-center gap-1 text-pastel-yellow">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" />
                  ))}
                  <span className="ml-2 text-sm font-heading font-semibold text-foreground">Favoritos das famílias</span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {favoriteProducts.map((item) => (
                    <a key={item.title} href={item.link} target="_blank" rel="noopener noreferrer" className="group">
                      <div className="aspect-square rounded-2xl bg-white p-3 shadow-sm transition-transform group-hover:-translate-y-1">
                        <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                      </div>
                      <p className="mt-2 line-clamp-2 text-center text-xs font-heading font-bold text-foreground">
                        {item.title}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-4xl text-center mb-10">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
              Por que escolher brinquedos certos nessa fase?
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Dos 6 aos 8 anos, as crianças já conseguem lidar com desafios mais elaborados, seguir regras, criar
                estratégias e participar de jogos em família com mais autonomia.
              </p>
              <p>
                Jogos de lógica, ciência, construção e atenção ajudam a transformar curiosidade em aprendizado,
                fortalecendo pensamento crítico, criatividade e concentração.
              </p>
              <p className="font-heading font-semibold text-foreground">
                Cada indicação aqui foi pensada para unir diversão, desenvolvimento e momentos de conexão longe do excesso de telas.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-4xl rounded-2xl bg-secondary p-6 md:p-8 mb-12 shadow-sm">
            <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground text-center">
              O que as crianças desenvolvem dos 6 aos 8 anos?
            </h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {developmentItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 text-sm font-heading font-semibold text-foreground">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div id="produtos" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 scroll-mt-28">
            {products.map((item) => (
              <motion.article
                key={item.title}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-square bg-white rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-contain p-3" />
                </div>
                <h2 className="font-heading font-bold text-lg text-foreground">{item.title}</h2>
                <p className="text-xs font-heading font-semibold text-primary mt-2">{item.eyebrow}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">{item.description}</p>
                <p className="mt-4 rounded-full bg-secondary px-3 py-2 text-xs font-heading font-semibold text-foreground">
                  Indicado: {item.recommendedAge}
                </p>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <Button className="mt-5 rounded-full bg-primary text-primary-foreground font-heading font-semibold gap-2 w-full">
                    Ver mais <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </motion.article>
            ))}
          </div>

          <p className="text-center mt-8 text-xs text-muted-foreground/70">
            Alguns links desta página podem gerar comissão sem custo extra para você.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Achadinhos68;
