import { ArrowDown, Baby, Brain, ExternalLink, Heart, MessageCircle, Palette, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import andadorZebra from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-apoiador.webp";
import baldePrimeirosBlocos from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-baldeprimeirosblocos.webp";
import bichinhosBanho from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-bichinhoparabanho.webp";
import blocosSurpresa from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-blocossurpresa.webp";
import bolaSensorial from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-bola.webp";
import cachorrinhoInterativo from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-cachorromexe.webp";
import caixaEncaixe from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-caixaencaixa.webp";
import chocalhoMordedor from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-chocalhocommordedor.webp";
import chocalhoBolaFrutas from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-chocalhocommordedorbolafruta.webp";
import almofadaAtividades from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-almofadadeatividade.webp";
import controleRemoto from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-controleremoto.webp";
import mesaEducativa from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-mesaeducativa.webp";
import pandeiroInfantil from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-pandeiro.webp";
import forminhasPicole from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-forminhapicole.webp";
import girafaDidatica from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-girafadidatica.webp";
import girafaMordedor from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-girafamordedor.webp";
import livroColorir from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-livrocolorir.webp";
import cuboEducativo from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-cuboeducativo.webp";
import cuboGrande from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-cubogrande.webp";
import chocalhoColorido from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-chocalhocommordedorcolorido.webp";
import torreEmpilhar from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-torreempilhar.webp";
import tapeteAgua from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-tapetedeagua.webp";
import tapeteMusical from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-tapetemusical.webp";
import tapeteTermico from "@/assets/achadinho da flavinha/0 a 2 anos/0-2anos-tapetetermico.webp";

export const products = [
  {
    eyebrow: "Perfeito para incentivar os primeiros passos",
    title: "Andador Zebra Fisher-Price.",
    recommendedAge: "A partir de 9 meses",
    description: "Ajuda o bebê a ganhar confiança enquanto aprende andando e brincando.",
    image: andadorZebra,
    link: "https://amzn.to/4dHiHor",
  },
  {
    eyebrow: "O brinquedo que ensina brincando",
    title: "Balde Primeiros Blocos",
    recommendedAge: "A partir de 6 meses",
    description: "Cores, formas, encaixes e muita diversão em um único brinquedo.",
    image: baldePrimeirosBlocos,
    link: "https://amzn.to/3PQUvXu",
  },
  {
    eyebrow: "Banho sem choro",
    title: "Bichinhos para Banho",
    recommendedAge: "A partir de 6 meses",
    description: "Transforma o banho em um momento divertido e cheio de descobertas.",
    image: bichinhosBanho,
    link: "https://amzn.to/4uNdx04",
  },
  {
    eyebrow: "Aprender encaixando",
    title: "Blocos Surpresa Zebra",
    recommendedAge: "A partir de 6 meses",
    description: "Estimula coordenação, lógica e percepção através da brincadeira.",
    image: blocosSurpresa,
    link: "https://amzn.to/4edNjxL",
  },
  {
    eyebrow: "Feita para mãos pequeninas",
    title: "Bola Sensorial",
    recommendedAge: "A partir de 3 meses",
    description: "Macia, colorida e perfeita para os primeiros movimentos do bebê.",
    image: bolaSensorial,
    link: "https://amzn.to/49AB1gu",
  },
  {
    eyebrow: "Faz o bebê querer engatinhar",
    title: "Cachorrinho Interativo",
    recommendedAge: "A partir de 12 meses",
    description: "Luzes, sons e movimento que incentivam a exploração.",
    image: cachorrinhoInterativo,
    link: "https://amzn.to/4dGXGtT",
  },
  {
    eyebrow: "Um clássico que nunca falha",
    title: "Caixa de Encaixe",
    recommendedAge: "A partir de 12 meses",
    description: "Ajuda a desenvolver raciocínio e coordenação desde cedo.",
    image: caixaEncaixe,
    link: "https://amzn.to/3Qd6rms",
  },
  {
    eyebrow: "Alívio para a fase dos dentinhos",
    title: "Chocalho com Mordedor",
    recommendedAge: "A partir de 3 meses",
    description: "Texturas, cores e conforto para os pequenos exploradores.",
    image: chocalhoMordedor,
    link: "https://amzn.to/3REHvoo",
  },
  {
    eyebrow: "Pequeno, simples e irresistível",
    title: "Chocalho Bola Frutas",
    recommendedAge: "A partir de 3 meses",
    description: "Estimula visão, audição e coordenação de forma divertida.",
    image: chocalhoBolaFrutas,
    link: "https://amzn.to/435N7KQ",
  },
  {
    eyebrow: "Ideal para o tummy time",
    title: "Almofada de Atividades",
    recommendedAge: "A partir de 3 meses",
    description: "Ajuda a fortalecer músculos importantes para engatinhar e sentar.",
    image: almofadaAtividades,
    link: "https://amzn.to/4uCKQTn",
  },
  {
    eyebrow: "O brinquedo que salva o controle da televisão",
    title: "Controle Remoto Infantil",
    recommendedAge: "A partir de 6 meses",
    description: "Permite que o bebê explore botões, sons e curiosidades sem pegar o controle da casa.",
    image: controleRemoto,
    link: "https://amzn.to/4wZdf7N",
  },
  {
    eyebrow: "Diversão que acompanha o crescimento",
    title: "Mesa Educativa Infantil",
    recommendedAge: "A partir de 12 meses",
    description: "Reúne atividades que estimulam coordenação motora, formas, cores e descobertas.",
    image: mesaEducativa,
    link: "https://amzn.to/4o0zDK0",
  },
  {
    eyebrow: "Primeiros passos no mundo da música",
    title: "Pandeiro Infantil",
    recommendedAge: "A partir de 6 meses",
    description: "Estimula musicalidade, coordenação motora e percepção auditiva através da brincadeira.",
    image: pandeiroInfantil,
    link: "https://amzn.to/4fiE68G",
  },
  {
    eyebrow: "Introdução alimentar mais divertida",
    title: "Forminhas para Frutas e Picolés",
    recommendedAge: "A partir de 6 meses",
    description: "Uma forma segura e prática de apresentar frutas e novos sabores aos pequenos.",
    image: forminhasPicole,
    link: "https://amzn.to/4o39aeO",
  },
  {
    eyebrow: "Coordenação e diversão em cada encaixe",
    title: "Girafa Didática de Encaixe",
    recommendedAge: "A partir de 12 meses",
    description: "Estimula coordenação motora, encaixe de formas e percepção visual de forma divertida.",
    image: girafaDidatica,
    link: "https://amzn.to/4fTkRm5",
  },
  {
    eyebrow: "Um companheiro para abraçar e explorar",
    title: "Girafa de Atividades com Mordedores",
    recommendedAge: "A partir de 3 meses",
    description: "Combina texturas, cores, sons e mordedores para estimular os sentidos do bebê.",
    image: girafaMordedor,
    link: "https://amzn.to/4uHonEK",
  },
  {
    eyebrow: "Criatividade desde cedo",
    title: "Meu Livrão de Colorir Fisher-Price",
    recommendedAge: "A partir de 18 meses",
    description: "Uma atividade simples e divertida para incentivar criatividade e momentos longe das telas.",
    image: livroColorir,
    link: "https://amzn.to/4edtHKi",
  },
  {
    eyebrow: "Aprender formas e cores brincando",
    title: "Cubo Educativo de Encaixe",
    recommendedAge: "A partir de 12 meses",
    description: "Ajuda a desenvolver coordenação motora, percepção de formas, cores e raciocínio lógico.",
    image: cuboEducativo,
    link: "https://amzn.to/49wqDq3",
  },
  {
    eyebrow: "Um brinquedo, muitas descobertas",
    title: "Cubo Educativo Multifuncional",
    recommendedAge: "A partir de 12 meses",
    description: "Diversas atividades em um único brinquedo para estimular a curiosidade e o aprendizado.",
    image: cuboGrande,
    link: "https://amzn.to/49zV12F",
  },
  {
    eyebrow: "Alívio para os dentinhos e diversão para as mãozinhas",
    title: "Chocalho Colorido com Mordedor",
    recommendedAge: "A partir de 3 meses",
    description: "Texturas, cores e movimento para estimular os sentidos enquanto ajuda na fase da dentição.",
    image: chocalhoColorido,
    link: "https://amzn.to/3Qd9kUk",
  },
  {
    eyebrow: "Um clássico que ensina brincando",
    title: "Torre de Empilhar Colorida",
    recommendedAge: "A partir de 6 meses",
    description: "Ajuda o bebê a desenvolver coordenação motora, noção de tamanho, cores e sequência.",
    image: torreEmpilhar,
    link: "https://amzn.to/4vj8jZR",
  },
  {
    eyebrow: "Diversão que estimula o desenvolvimento",
    title: "Tapete de Água Sensorial",
    recommendedAge: "A partir de 3 meses",
    description: "Ajuda a fortalecer pescoço, braços e costas enquanto o bebê explora cores e movimentos.",
    image: tapeteAgua,
    link: "https://amzn.to/4x09fDX",
  },
  {
    eyebrow: "Brincar, ouvir e descobrir",
    title: "Tapete Musical com Atividades",
    recommendedAge: "Desde o nascimento",
    description: "Combina música, cores e atividades para estimular os sentidos desde os primeiros meses.",
    image: tapeteMusical,
    link: "https://amzn.to/4nZvh5P",
  },
  {
    eyebrow: "Um cantinho seguro para brincar",
    title: "Tapete Dobrável para Bebês",
    recommendedAge: "Desde o nascimento",
    description: "Ideal para o bebê explorar, engatinhar e brincar com mais conforto e segurança.",
    image: tapeteTermico,
    link: "https://amzn.to/4fRXLMI",
  },
];

const developmentItems = [
  "Coordenação motora",
  "Percepção de cores e formas",
  "Linguagem e comunicação",
  "Exploração sensorial",
  "Atenção e concentração",
  "Autonomia",
  "Vínculo afetivo com os pais",
];

const benefitHighlights = [
  { label: "Desenvolvimento Cognitivo", Icon: Brain },
  { label: "Coordenação Motora", Icon: Baby },
  { label: "Vínculo Familiar", Icon: Heart },
  { label: "Estímulo Sensorial", Icon: Palette },
  { label: "Linguagem", Icon: MessageCircle },
];

const favoriteProducts = products.slice(0, 3);

const Achadinhos02 = () => {
  return (
    <Layout>
      <PageBanner
        title="Brinquedos de 0 a 2 anos"
        subtitle="Primeiras descobertas, estímulos sensoriais e muita diversão para os pequenos exploradores."
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
                  Selecionados por Flavinha para estimular o desenvolvimento dos pequenos.
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
              Por que investir em brinquedos nessa fase?
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Os primeiros anos de vida são uma das fases mais importantes para o desenvolvimento infantil.
              </p>
              <p>
                É através das brincadeiras que os bebês descobrem o mundo, aprendem a resolver problemas,
                desenvolvem a coordenação motora, estimulam a linguagem e fortalecem vínculos com as pessoas que amam.
              </p>
              <p>
                Mais do que brinquedos, cada indicação desta página representa uma oportunidade de aprendizado,
                afeto e conexão.
              </p>
              <p>
                Aqui você encontrará brinquedos que estimulam os sentidos, incentivam a exploração e ajudam os
                pequenos a aprender brincando, exatamente como a infância deve ser.
              </p>
              <p className="font-heading font-semibold text-foreground">
                Porque brincar não é apenas diversão. É desenvolvimento.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-4xl rounded-2xl bg-secondary p-6 md:p-8 mb-12 shadow-sm">
            <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground text-center">
              O que as crianças desenvolvem dos 0 aos 2 anos?
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
                  Idade recomendada: {item.recommendedAge}
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

export default Achadinhos02;
