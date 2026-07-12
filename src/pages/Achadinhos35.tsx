import { ArrowDown, Brain, ExternalLink, Heart, MessageCircle, Palette, Puzzle, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import pegaPompom from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-pegapompom.jpg";
import livroSensorialMontessori from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-placademontessorisensorial.jpg";
import quadroMagnetico from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-quadrodedesenhomagnetico.jpg";
import tangram from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-tangram.jpg";
import livroSensorialGirafa from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-placasensorialgirafa.jpg";
import jogoPescaria from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-pegapeixe.jpg";
import equiliTetris from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-tetris.jpg";
import escavadeiraInfantil from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-tratorate50kg.jpg";
import quebraCabecaDinossauros from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-quebracabecadinossauro.jpg";
import quebraCabecaArca from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-quebracabecaarcadenoe.jpg";
import laptopMadeira from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-laptopdemadeiraeducativo.jpg";
import laptopPatrulha from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-laptopinfantil.jpg";
import legoClassic from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-legoclassicmaletadeconstrucao.jpg";
import livroInterativoBilingue from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-livrointerativobilingue.jpg";
import livroInterativoSemTela from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-livrointerativosemtela.jpg";
import livroMagneticoAnimais from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-livromagnetico40peças.jpg";
import playDohCorteMaluco from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-massinhacortemaluco.jpg";
import mesinhaProjetora from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-mesinhaprojetora.jpg";
import primeiroTabuleiro from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-meuprimeirotabuleiro.jpg";
import separandoCores from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-montessorimagneticocontarcoresenumeros.jpg";
import kitLetrasNumerosFormas from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-3tabuleiroseducativos.jpg";
import acheEncaixeSinto from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-acheeencaixecomomesinto.jpg";
import bicicletaBuba from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-bicicletabuba.jpg";
import bingoAnimais from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-bingodosanimais.jpg";
import blocosMagneticos from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-blocodeconstruçãomagnetico.jpg";
import mesaMontarBlocos from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-blocomontarcommesa.jpg";
import brincandoEngenheiro from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-brincandodeengenheiro73peças.jpg";
import montaBichinhos from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-brinquedodemontarbrinchinho.jpg";
import cabecaBatata from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-cabecadebatata.jpg";
import caiuPerdeu from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-caiuperdeu.jpg";
import canetinhasLavaveis from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-canetinhaslavaveis.jpg";
import cartoesEducativos from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-cartoeseducativosingleseportugues.jpg";
import cuboEmocoes from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-cubodasemocoes.jpg";
import descobrindoEmocoes from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-descobrindoasemocoes.jpg";
import dominoFrutas from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-dominofrutas.jpg";
import formaBichos from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-formasebichos.jpg";
import hipopotamosComiloes from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-hipopotamoscomiloes.jpg";
import jogoGangorra from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-jogodegangorra.jpg";
import jogoSoletrando from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-jogosoletrando.jpg";
import kitPinturaPatrulha from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-kitpinturapatrulhacanina.jpg";
import montarFuradeira from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-Brinquedo Educativo de Montar com Furadeira Elétrica - 106 Peças - 3 a 7 Anos.jpg";
import playDohHamburguer from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-Massinha de Modelar Infantil, Festa do Hambúrguer.jpg";

import memoriaPinosColoridos from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-Jogo da Memória em Madeira Com Pinos Coloridos –.jpg";
import quebraMuro from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-Jogo Quebra Muro Infantil – Brinquedo Educativo.jpg";
import crocodiloCrocCroc from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-Jogo Crocodilo Croc Croc BBR Toys.jpg";
import equilibraFilhotes from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-Jogo Equilibra Filhotes Patrulha Canina.jpg";
import pinguimNumaFria from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-Jogo Pinguim Numa Fria Jogo Quebra Gelo.jpg";
import pulaMacaco from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-Jogo Pula Macaco, Estrela.jpg";
import puxaPuxaBatatinha from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-Jogo Puxa Puxa Batatinha, Estrela.jpg";
import respondaSePuder from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-Jogo Responda Se Puder, Estrela.jpg";
import matematicaKinderland from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-Kinderland Brinquedo Educativo de Matemática para Crianças 2 a 7 Anos.jpg";
import kitAdicaoSubtracao from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-Kit 2 Placas Educativas de Madeira para Adição e Subtração.jpg";
import laboratorioShowLuna from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-Laboratório Show da Luna Criativo Infantil Kit com 24 Experimentos.jpg";
import jogoEducativoMatematica from "@/assets/achadinho da flavinha/3 a 5 anos/3-5anos-Jogo Educativo de Matematica para crianças,Didatico com Numeros Símbolos e Palitos Coloridos.jpg";

export const products = [
  {
    title: "Pega Pompom Montessori",
    eyebrow: "Coordenação motora brincando com cores",
    description: "Uma atividade simples que trabalha pinça fina, percepção das cores e concentração.",
    recommendedAge: "3 anos+",
    image: pegaPompom,
    link: "https://amzn.to/3Q2DF86",
  },
  {
    title: "Livro Sensorial Montessori",
    eyebrow: "Diversão inteligente sem telas",
    description: "Perfeito para viagens, restaurantes e momentos em que a criança precisa se entreter aprendendo.",
    recommendedAge: "3 a 6 anos",
    image: livroSensorialMontessori,
    link: "https://amzn.to/4ohzv91",
  },
  {
    title: "Quadro Magnético de Desenho",
    eyebrow: "Criatividade sem bagunça",
    description: "A criança cria desenhos, padrões e desafios enquanto desenvolve coordenação e imaginação.",
    recommendedAge: "3 anos+",
    image: quadroMagnetico,
    link: "https://amzn.to/4x7duhf",
  },
  {
    title: "Tangram Montessori",
    eyebrow: "Um brinquedo, centenas de desafios",
    description: "A criança cria figuras, exercita o raciocínio e aprende brincando.",
    recommendedAge: "4 anos+",
    image: tangram,
    link: "https://amzn.to/43M2ubv",
  },
  {
    title: "Livro Sensorial Girafa",
    eyebrow: "Aprender brincando todos os dias",
    description: "Com atividades de encaixe, coordenação e lógica, ajuda no desenvolvimento infantil de forma divertida.",
    recommendedAge: "3 anos+",
    image: livroSensorialGirafa,
    link: "https://amzn.to/3RLZDga",
  },
  {
    title: "Jogo da Pescaria Musical",
    eyebrow: "Diversão que trabalha atenção e coordenação",
    description: "Enquanto tenta pescar os peixinhos, a criança desenvolve concentração, coordenação motora e paciência brincando.",
    recommendedAge: "3 a 6 anos",
    image: jogoPescaria,
    link: "https://amzn.to/4g5asDU",
  },
  {
    title: "Equili Tetris",
    eyebrow: "O desafio que prende a atenção das crianças",
    description: "Trabalha equilíbrio, estratégia e coordenação de forma divertida.",
    recommendedAge: "4 anos+",
    image: equiliTetris,
    link: "https://amzn.to/4uK7wRH",
  },
  {
    title: "Escavadeira Infantil Gigante",
    eyebrow: "A brincadeira que vira aventura",
    description: "Perfeita para estimular imaginação, movimento e brincadeiras ao ar livre.",
    recommendedAge: "3 a 6 anos",
    image: escavadeiraInfantil,
    link: "https://amzn.to/4flWTQp",
  },
  {
    title: "Quebra-Cabeça Dinossauros",
    eyebrow: "Para os pequenos apaixonados por dinossauros",
    description: "Diversão que estimula atenção, observação e resolução de desafios.",
    recommendedAge: "4 anos+",
    image: quebraCabecaDinossauros,
    link: "https://amzn.to/4ocUM3S",
  },
  {
    title: "Quebra-Cabeça Arca de Noé",
    eyebrow: "Montar, aprender e imaginar",
    description: "Uma atividade clássica que fortalece raciocínio lógico e percepção visual.",
    recommendedAge: "4 anos+",
    image: quebraCabecaArca,
    link: "https://amzn.to/49YPAuz",
  },
  {
    title: "Laptop Educativo de Madeira Montessori",
    eyebrow: "Aprender letras e números brincando",
    description: "Uma forma lúdica de despertar o interesse pela alfabetização e pelos primeiros cálculos.",
    recommendedAge: "3 a 6 anos",
    image: laptopMadeira,
    link: "https://amzn.to/43LC8Gz",
  },
  {
    title: "Laptop Infantil Patrulha Canina",
    eyebrow: "A tecnologia que ensina",
    description: "Letras, números, palavras e sons para aprender enquanto se diverte com personagens que as crianças adoram.",
    recommendedAge: "3 a 6 anos",
    image: laptopPatrulha,
    link: "https://amzn.to/3S15nCI",
  },
  {
    title: "LEGO Classic Maleta de Construção",
    eyebrow: "Um brinquedo, infinitas possibilidades",
    description: "Estimula criatividade, imaginação e resolução de problemas através da construção livre.",
    recommendedAge: "4 anos+",
    image: legoClassic,
    link: "https://amzn.to/4xd404c",
  },
  {
    title: "Livro Interativo Bilíngue",
    eyebrow: "Aprender brincando e ouvindo",
    description: "Combina sons, palavras e atividades para tornar o aprendizado mais divertido.",
    recommendedAge: "3 a 6 anos",
    image: livroInterativoBilingue,
    link: "https://amzn.to/43fayRW",
  },
  {
    title: "Livro Interativo Sem Tela",
    eyebrow: "Diversão inteligente para qualquer lugar",
    description: "Perfeito para viagens, restaurantes e momentos em que a criança precisa se entreter sem celular.",
    recommendedAge: "3 a 6 anos",
    image: livroInterativoSemTela,
    link: "https://amzn.to/4vrnIas",
  },
  {
    title: "Livro Magnético de Animais",
    eyebrow: "Criar histórias desenvolve imaginação",
    description: "A criança monta cenários, personagens e inventa suas próprias aventuras.",
    recommendedAge: "3 anos+",
    image: livroMagneticoAnimais,
    link: "https://amzn.to/43M2oAC",
  },
  {
    title: "Play-Doh Corte Maluco",
    eyebrow: "Massinha que vira diversão sem fim",
    description: "Trabalha coordenação motora, criatividade e faz de conta.",
    recommendedAge: "3 anos+",
    image: playDohCorteMaluco,
    link: "https://amzn.to/4dMpGMO",
  },
  {
    title: "Mesinha Projetora para Desenho",
    eyebrow: "Desenhar fica ainda mais divertido",
    description: "Ajuda a desenvolver coordenação motora, criatividade e interesse pelo desenho.",
    recommendedAge: "3 a 7 anos",
    image: mesinhaProjetora,
    link: "https://amzn.to/4dY9I0L",
  },
  {
    title: "Meu Primeiro Tabuleiro",
    eyebrow: "O primeiro jogo de regras da criança",
    description: "Ensina a esperar a vez, seguir regras e lidar com vitórias e derrotas.",
    recommendedAge: "3 a 5 anos",
    image: primeiroTabuleiro,
    link: "https://amzn.to/4dXsWnf",
  },
  {
    title: "Separando as Cores Montessori",
    eyebrow: "Aprender cores virou brincadeira",
    description: "Estimula coordenação motora fina, atenção e reconhecimento das cores.",
    recommendedAge: "3 anos+",
    image: separandoCores,
    link: "https://amzn.to/43LCEEv",
  },
  {
    title: "Kit Educativo Letras, Números e Formas",
    eyebrow: "Aprender brincando é muito mais divertido",
    description: "Uma forma lúdica de apresentar letras, números e formas geométricas para os pequenos. Desenvolve: alfabetização, matemática inicial e coordenação motora.",
    recommendedAge: "3 a 5 anos",
    image: kitLetrasNumerosFormas,
    link: "https://amzn.to/4fqiuHj",
  },
  {
    title: "Ache e Encaixe - Como Me Sinto?",
    eyebrow: "Ensinar emoções é um presente para a vida toda",
    description: "Ajuda a criança a reconhecer sentimentos e aprender a falar sobre suas emoções. Desenvolve: inteligência emocional, empatia e comunicação.",
    recommendedAge: "4 anos+",
    image: acheEncaixeSinto,
    link: "https://amzn.to/4e3TLq8",
  },
  {
    title: "Bicicleta de Equilíbrio Buba",
    eyebrow: "O primeiro passo para pedalar sem rodinhas",
    description: "Desenvolve equilíbrio e confiança de forma natural e divertida. Desenvolve: coordenação motora grossa, equilíbrio e autonomia.",
    recommendedAge: "2 a 5 anos",
    image: bicicletaBuba,
    link: "",
  },
  {
    title: "Bingo dos Animais",
    eyebrow: "Aprender sobre animais virou brincadeira",
    description: "Perfeito para momentos em família enquanto estimula atenção e memória. Desenvolve: linguagem, memória e associação.",
    recommendedAge: "3 anos+",
    image: bingoAnimais,
    link: "https://amzn.to/4uOPU7g",
  },
  {
    title: "Blocos Magnéticos de Construção",
    eyebrow: "O brinquedo que prende a atenção por horas",
    description: "Permite criar casas, castelos e cenários usando apenas a imaginação. Desenvolve: criatividade, raciocínio espacial e concentração.",
    recommendedAge: "4 anos+",
    image: blocosMagneticos,
    link: "https://amzn.to/4xd93BG",
  },
  {
    title: "Mesa de Montar com Blocos",
    eyebrow: "Construir nunca foi tão divertido",
    description: "Uma estação criativa para montar, desmontar e criar sem parar. Desenvolve: criatividade, coordenação motora e planejamento.",
    recommendedAge: "3 anos+",
    image: mesaMontarBlocos,
    link: "https://amzn.to/4e6gGRC",
  },
  {
    title: "Brincando de Engenheiro",
    eyebrow: "Construções que atravessam gerações",
    description: "Um clássico que desenvolve criatividade e pensamento lógico. Desenvolve: raciocínio espacial, criatividade e coordenação.",
    recommendedAge: "3 anos+",
    image: brincandoEngenheiro,
    link: "https://amzn.to/4e4HxNU",
  },
  {
    title: "Monta Bichinhos",
    eyebrow: "Montar, encaixar e descobrir",
    description: "As crianças aprendem sobre animais enquanto desenvolvem coordenação motora. Desenvolve: coordenação motora fina, atenção e percepção visual.",
    recommendedAge: "2 anos+",
    image: montaBichinhos,
    link: "https://amzn.to/3RE3kVc",
  },
  {
    title: "Senhor Cabeça de Batata",
    eyebrow: "Um brinquedo que faz a imaginação correr solta",
    description: "Misture olhos, boca, nariz e crie personagens engraçados. Desenvolve: criatividade, percepção corporal e imaginação.",
    recommendedAge: "3 anos+",
    image: cabecaBatata,
    link: "https://amzn.to/4vtd57a",
  },
  {
    title: "Caiu Perdeu (Torre de Madeira)",
    eyebrow: "Diversão para toda a família",
    description: "Um jogo simples que ensina paciência, estratégia e controle dos movimentos. Desenvolve: concentração, coordenação e raciocínio.",
    recommendedAge: "6 anos+ (com supervisão pode brincar antes)",
    image: caiuPerdeu,
    link: "https://amzn.to/4vnnLEg",
  },
  {
    title: "Canetinhas Ultra Laváveis Faber-Castell",
    eyebrow: "Criatividade sem preocupação para a mamãe",
    description: "Canetinhas grossas, fáceis de segurar e que saem facilmente da pele e da maioria dos tecidos. Desenvolve: criatividade, coordenação motora e expressão artística.",
    recommendedAge: "3 anos+",
    image: canetinhasLavaveis,
    link: "https://amzn.to/49BdNa6",
  },
  {
    title: "Cartões Educativos Português e Inglês",
    eyebrow: "Aprender inglês brincando desde pequeno",
    description: "A criança associa imagens, palavras e sons de forma natural e divertida. Desenvolve: vocabulário, memória e aprendizado bilíngue.",
    recommendedAge: "3 anos+",
    image: cartoesEducativos,
    link: "https://amzn.to/4auzEQG",
  },
  {
    title: "Cubo das Emoções",
    eyebrow: "Aprender a reconhecer sentimentos brincando",
    description: "Transforma conversas sobre emoções em uma atividade divertida e educativa. Desenvolve: inteligência emocional, empatia e comunicação.",
    recommendedAge: "3 anos+",
    image: cuboEmocoes,
    link: "https://amzn.to/3SlPWVK",
  },
  {
    title: "Descobrindo as Emoções",
    eyebrow: "Um brinquedo que ensina algo para a vida inteira",
    description: "Ajuda a criança a entender o que sente e a lidar melhor com suas emoções. Desenvolve: autoconhecimento, empatia e habilidades sociais.",
    recommendedAge: "3 anos+",
    image: descobrindoEmocoes,
    link: "https://amzn.to/4x5pzU4",
  },
  {
    title: "Dominó das Frutas",
    eyebrow: "Aprender brincando à mesa",
    description: "Um clássico que ensina frutas, atenção e raciocínio enquanto diverte. Desenvolve: memória, associação e concentração.",
    recommendedAge: "4 anos+",
    image: dominoFrutas,
    link: "https://amzn.to/4ueU9YM",
  },
  {
    title: "Forma Bichos Montessori",
    eyebrow: "Criar animais usando a imaginação",
    description: "A criança monta, desmonta e inventa novos bichinhos usando formas geométricas. Desenvolve: criatividade, percepção visual e coordenação motora.",
    recommendedAge: "3 anos+",
    image: formaBichos,
    link: "https://amzn.to/3PGet7l",
  },
  {
    title: "Hipopótamos Comilões",
    eyebrow: "Gargalhadas garantidas em família",
    description: "Um dos jogos infantis mais divertidos para brincar junto e criar memórias. Desenvolve: coordenação motora, atenção e interação social.",
    recommendedAge: "4 anos+",
    image: hipopotamosComiloes,
    link: "https://amzn.to/4dXSrow",
  },
  {
    title: "Jogo de Gangorra",
    eyebrow: "Pensar antes de agir faz toda a diferença",
    description: "A criança precisa equilibrar os pintinhos sem derrubar a gangorra. Desenvolve: raciocínio lógico, estratégia e concentração.",
    recommendedAge: "3 anos+",
    image: jogoGangorra,
    link: "https://amzn.to/4auzb0S",
  },
  {
    title: "Jogo Soletrando",
    eyebrow: "As primeiras palavras surgem brincando",
    description: "Um jeito divertido de aprender letras e formar palavras. Desenvolve: alfabetização, leitura inicial e percepção visual.",
    recommendedAge: "4 anos+",
    image: jogoSoletrando,
    link: "https://amzn.to/4fqHluO",
  },
  {
    title: "Kit de Pintura Patrulha Canina",
    eyebrow: "O personagem favorito agora ganha cor",
    description: "Uma atividade tranquila que incentiva criatividade e concentração. Desenvolve: coordenação motora fina, criatividade e foco.",
    recommendedAge: "3 anos+",
    image: kitPinturaPatrulha,
    link: "https://amzn.to/3S42rFn",
  },
  {
    title: "Brinquedo de Montar com Furadeira Infantil",
    eyebrow: "O brinquedo que faz a criança se sentir uma pequena inventora",
    description: "Parafusar, montar, desmontar e criar diferentes projetos enquanto aprende brincando. Desenvolve: coordenação motora fina, criatividade, raciocínio lógico e concentração.",
    recommendedAge: "3 a 7 anos",
    image: montarFuradeira,
    link: "https://amzn.to/4uRs4aX",
  },
  {
    title: "Play-Doh Festa do Hambúrguer",
    eyebrow: "A brincadeira que mistura imaginação e criatividade",
    description: "A criança cria hambúrgueres, lanches e refeições divertidas usando massinha. Desenvolve: criatividade, coordenação motora fina e faz de conta.",
    recommendedAge: "3 anos+",
    image: playDohHamburguer,
    link: "https://amzn.to/4unqSv3",
  },
  {
    title: "Crocodilo Croc Croc",
    eyebrow: "Quem será corajoso o suficiente?",
    description: "Uma brincadeira cheia de suspense e risadas. Nunca se sabe qual dente vai fechar a boca do crocodilo! Trabalha coragem, atenção e diversão em grupo.",
    recommendedAge: "4 anos+",
    image: crocodiloCrocCroc,
    link: "https://amzn.to/4x7Pj22",
  },
  {
    title: "Equilibra Filhotes Patrulha Canina",
    eyebrow: "Equilíbrio e diversão",
    description: "Empilhe os personagens sem derrubar a torre. Desenvolve coordenação motora e concentração.",
    recommendedAge: "4 anos+",
    image: equilibraFilhotes,
    link: "https://amzn.to/4epA2Co",
  },
  {
    title: "Pinguim Numa Fria",
    eyebrow: "Quem vai derrubar o gelo?",
    description: "Suspense, risadas e muita emoção em cada jogada. Desenvolve coordenação motora, estratégia e concentração.",
    recommendedAge: "5 anos+",
    image: pinguimNumaFria,
    link: "https://amzn.to/3PVgsol",
  },
  {
    title: "Pula Macaco",
    eyebrow: "Diversão que não sai de moda",
    description: "Acerte os macacos na árvore e veja quem consegue mais bananas. Desenvolve coordenação motora e percepção visual.",
    recommendedAge: "4 anos+",
    image: pulaMacaco,
    link: "https://amzn.to/4x6lMWJ",
  },
  {
    title: "Puxa Puxa Batatinha",
    eyebrow: "Mão firme e muita atenção",
    description: "Retire os palitos sem deixar tudo cair. Desenvolve coordenação motora fina e concentração.",
    recommendedAge: "5 anos+",
    image: puxaPuxaBatatinha,
    link: "https://amzn.to/4xa1Ced",
  },
  {
    title: "Responda Se Puder",
    eyebrow: "Pensou rápido? Então responda!",
    description: "Um jogo acelerado que desafia o conhecimento e a agilidade mental. Desenvolve vocabulário, raciocínio rápido e comunicação.",
    recommendedAge: "5 anos+",
    image: respondaSePuder,
    link: "https://amzn.to/4uUWgCi",
  },
  {
    title: "Matemática Divertida Kinderland",
    eyebrow: "Aprender matemática brincando",
    description: "As operações ganham vida de forma concreta e visual. Desenvolve cálculo mental, lógica e compreensão dos números.",
    recommendedAge: "5 anos+",
    image: matematicaKinderland,
    link: "https://amzn.to/4xfoh9i",
  },
  {
    title: "Kit Educativo de Adição e Subtração",
    eyebrow: "Contas que fazem sentido para a criança",
    description: "Uma maneira lúdica de aprender matemática com as próprias mãos. Desenvolve raciocínio matemático e resolução de problemas.",
    recommendedAge: "5 anos+",
    image: kitAdicaoSubtracao,
    link: "https://amzn.to/4x56dOR",
  },
  {
    title: "Laboratório Criativo Show da Luna",
    eyebrow: "Aprender ciência virou uma aventura",
    description: "Experimentos simples e divertidos para despertar o pequeno cientista. Desenvolve observação, criatividade e interesse pela ciência.",
    recommendedAge: "5 anos+",
    image: laboratorioShowLuna,
    link: "https://amzn.to/43TJ98g",
  },
  {
    title: "Jogo Educativo de Matematica",
    eyebrow: "Matemática que faz sentido na prática",
    description: "Aprenda somas e subtrações manipulando peças e números. Desenvolve raciocínio matemático e resolução de problemas.",
    recommendedAge: "5 anos+",
    image: jogoEducativoMatematica,
    link: "https://amzn.to/4e5zrEC",
  },
  {
    title: "Jogo da Memória com Pinos Coloridos",
    eyebrow: "Um desafio que faz a memória trabalhar de verdade",
    description: "Observe, memorize e encontre as combinações corretas. Desenvolve memória, atenção e raciocínio lógico.",
    recommendedAge: "4 anos+",
    image: memoriaPinosColoridos,
    link: "https://amzn.to/4fLfghZ",
  },
  {
    title: "Quebra Muro",
    eyebrow: "Um jogo simples que deixa todo mundo na expectativa",
    description: "Retire os blocos com cuidado sem derrubar o personagem. Desenvolve coordenação motora, paciência e estratégia.",
    recommendedAge: "4 anos+",
    image: quebraMuro,
    link: "https://amzn.to/49D2sq2",
  },
];

const benefitHighlights = [
  { label: "Criatividade", Icon: Palette },
  { label: "Coordenação Motora", Icon: Puzzle },
  { label: "Raciocínio Lógico", Icon: Brain },
  { label: "Vínculo Familiar", Icon: Heart },
  { label: "Linguagem", Icon: MessageCircle },
];

const developmentItems = [
  "Coordenação motora fina",
  "Criatividade e imaginação",
  "Atenção e concentração",
  "Raciocínio lógico",
  "Linguagem e comunicação",
  "Autonomia",
  "Brincadeiras sem telas",
];

const favoriteProducts = products.slice(0, 3);

const Achadinhos35 = () => {
  return (
    <Layout>
      <PageBanner
        title="Brinquedos de 3 a 5 anos"
        subtitle="Imaginação, criatividade e brincadeiras que transformam aprendizado em aventura."
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
                  Selecionados por Flavinha para estimular criatividade, autonomia e aprendizado brincando.
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
                Dos 3 aos 5 anos, a criança começa a criar histórias, testar hipóteses, resolver pequenos desafios e
                ganhar mais autonomia nas brincadeiras.
              </p>
              <p>
                Brinquedos com encaixes, cores, movimento, desenho e faz de conta ajudam a transformar curiosidade em
                aprendizado de um jeito leve, divertido e longe do excesso de telas.
              </p>
              <p className="font-heading font-semibold text-foreground">
                Cada indicação aqui foi pensada para unir desenvolvimento, criatividade e conexão em família.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-4xl rounded-2xl bg-secondary p-6 md:p-8 mb-12 shadow-sm">
            <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground text-center">
              O que as crianças desenvolvem dos 3 aos 5 anos?
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
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <Button className="mt-5 rounded-full bg-primary text-primary-foreground font-heading font-semibold gap-2 w-full">
                      Ver mais <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                ) : (
                  <Button disabled className="mt-5 rounded-full font-heading font-semibold gap-2 w-full">
                    Link em breve
                  </Button>
                )}
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

export default Achadinhos35;
