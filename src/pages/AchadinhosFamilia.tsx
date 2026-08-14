import { ArrowDown, Brain, ExternalLink, Heart, MessageCircle, Puzzle, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import azul from "@/assets/achadinhos-normalizados/familia/jf-asmodee-azul-jogo-de-tabuleiro-para-amigos.webp";
import entreLinhas from "@/assets/achadinhos-normalizados/familia/jf-entre-linhas.webp";
import perfilExpress from "@/assets/achadinhos-normalizados/familia/jf-jogo-perfil-express-filmes-e-series-grow.webp";
import senha from "@/assets/achadinhos-normalizados/familia/jf-jogo-senha-grow.webp";
import tdah from "@/assets/achadinhos-normalizados/familia/jf-jogo-tdah-tente-dizer-algo-hilario-jogo-para-familia.webp";
import ito from "@/assets/achadinhos-normalizados/familia/jf-meeplebr-ito-party-game-cooperativo-jogo-de-cartas-familia.webp";
import dixit from "@/assets/achadinhos-normalizados/familia/jf-dixit.webp";
import manualDoMundo from "@/assets/achadinhos-normalizados/6-8/6-8anos-laboratorio-manual-do-mundo-85-experiencias.webp";
import ticketToRide from "@/assets/achadinhos-normalizados/familia/jf-asmodee-ticket-to-ride-jogo-de-tabuleiro-para-familia.webp";
import coresComDicas from "@/assets/achadinhos-normalizados/familia/jf-grok-games-cores-com-dicas.webp";
import infiltrado from "@/assets/achadinhos-normalizados/familia/jf-grok-games-infiltrado.webp";
import bancoImobiliario from "@/assets/achadinhos-normalizados/familia/jf-jogo-banco-imobiliario-mundo-estrela.webp";
import batalhaNaval from "@/assets/achadinhos-normalizados/familia/jf-jogo-batalha-naval.webp";
import estrategiaTriangular from "@/assets/achadinhos-normalizados/familia/jf-jogo-de-estrategia-em-familia-cadeia-triangular-geometrica-com-84-pecas.webp";
import familiaEmAcao from "@/assets/achadinhos-normalizados/familia/jf-jogo-familia-em-acao-perfeito-para-familias.webp";
import geomundo from "@/assets/achadinhos-normalizados/familia/jf-jogo-geomundo.webp";
import flowers from "@/assets/achadinhos-normalizados/familia/jf-savana-flowers-jogo-de-cartas-estrategico-de-cores-e-numeros-combine-empilhe-e-marque-com-borboletas-e-flores.webp";
import lab42 from "@/assets/achadinhos-normalizados/6-8/6-8anos-jogo-lab-42-experiencias-estrela.webp";
import imagemAcao2 from "@/assets/achadinhos-normalizados/familia/jf-jogo-imagem-acao-2.webp";
import quartz from "@/assets/achadinhos-normalizados/familia/jf-quartz-mandala-jogos.webp";
import saboteur from "@/assets/achadinhos-normalizados/familia/jf-saboteur-jogo-de-cartas-papergames-portugues.webp";

export const products = [
  {
    title: "Azul",
    eyebrow: "Um dos jogos mais premiados do mundo",
    description: "Planeje cada jogada e crie os mosaicos mais bonitos para vencer. Desenvolve estratégia, planejamento e raciocínio lógico.",
    recommendedAge: "8 anos+",
    image: azul,
    link: "https://amzn.to/43LAPrg",
  },
  {
    title: "Entre Linhas",
    eyebrow: "Será que você consegue ler o que os outros estão pensando?",
    description: "Dê pistas, interprete intenções e descubra os significados escondidos. Desenvolve comunicação, criatividade, empatia e interpretação.",
    recommendedAge: "10 anos+",
    image: entreLinhas,
    link: "https://amzn.to/49IcSol",
  },
  {
    title: "Perfil Express Filmes e Séries",
    eyebrow: "Quem consegue descobrir primeiro?",
    description: "Perfeito para famílias apaixonadas por cinema e séries. Desenvolve memória, associação e conhecimentos gerais.",
    recommendedAge: "12 anos+",
    image: perfilExpress,
    link: "https://amzn.to/4x9JuRF",
  },
  {
    title: "Senha",
    eyebrow: "Descubra o código secreto antes do seu adversário",
    description: "Um clássico que desafia a lógica a cada rodada. Desenvolve dedução, estratégia e pensamento lógico.",
    recommendedAge: "8 anos+",
    image: senha,
    link: "https://amzn.to/4a1kzpR",
  },
  {
    title: "TDAH (Tente Dizer Algo Hilário)",
    eyebrow: "O jogo que transforma qualquer encontro em uma sessão de risadas",
    description: "Criatividade e humor para reunir toda a família. Desenvolve criatividade, improviso e comunicação.",
    recommendedAge: "12 anos+",
    image: tdah,
    link: "https://amzn.to/4fswxwa",
  },
  {
    title: "Ito",
    eyebrow: "Será que vocês conseguem pensar da mesma forma?",
    description: "Um jogo cooperativo que cria conversas divertidas e inesperadas. Desenvolve comunicação, empatia e trabalho em equipe.",
    recommendedAge: "8 anos+",
    image: ito,
    link: "https://amzn.to/3Q5ZyDx",
  },
  {
    title: "Dixit",
    eyebrow: "Um jogo onde a imaginação vale mais do que a resposta certa",
    description: "Use pistas criativas, interprete imagens e descubra como cada pessoa pensa. Desenvolve criatividade, interpretação, comunicação e imaginação.",
    recommendedAge: "8 anos+",
    image: dixit,
    link: "https://amzn.to/4dZQ6cF",
  },
  {
    title: "Laboratório Manual do Mundo - 85 Experiências",
    eyebrow: "O brinquedo perfeito para crianças curiosas",
    description: "Transforme a casa em um verdadeiro laboratório de descobertas. Desenvolve pensamento científico, criatividade e curiosidade.",
    recommendedAge: "10 anos+",
    image: manualDoMundo,
    link: "https://amzn.to/4e3m6wt",
  },
  {
    title: "Ticket to Ride",
    eyebrow: "Uma viagem de trem cheia de aventuras",
    description: "Conecte cidades, complete rotas e explore novos caminhos. Desenvolve planejamento, estratégia e tomada de decisões.",
    recommendedAge: "8 anos+",
    image: ticketToRide,
    link: "https://amzn.to/4vuNsmf",
  },
  {
    title: "Cores com Dicas",
    eyebrow: "Você consegue descobrir a cor certa?",
    description: "Um jogo criativo onde as pistas levam à resposta. Desenvolve criatividade, interpretação e comunicação.",
    recommendedAge: "10 anos+",
    image: coresComDicas,
    link: "https://amzn.to/43cdgI1",
  },
  {
    title: "Infiltrado",
    eyebrow: "Quem está escondendo a verdade?",
    description: "Observe, investigue e descubra quem é o infiltrado. Desenvolve argumentação, observação e pensamento crítico.",
    recommendedAge: "10 anos+",
    image: infiltrado,
    link: "https://amzn.to/4o7HA05",
  },
  {
    title: "Banco Imobiliário Mundo",
    eyebrow: "Viaje pelo mundo sem sair da mesa",
    description: "Compre, venda e administre seus investimentos para vencer. Desenvolve educação financeira e planejamento.",
    recommendedAge: "8 anos+",
    image: bancoImobiliario,
    link: "https://amzn.to/3ROPkYF",
  },
  {
    title: "Batalha Naval",
    eyebrow: "Quem encontrará a frota primeiro?",
    description: "Um clássico que mistura suspense e estratégia. Desenvolve lógica, memória e planejamento.",
    recommendedAge: "8 anos+",
    image: batalhaNaval,
    link: "https://amzn.to/4vvE9Ti",
  },
  {
    title: "Jogo de Estratégia Triangular",
    eyebrow: "Um desafio para quem gosta de pensar vários passos à frente",
    description: "Estratégia, observação e planejamento em cada jogada. Desenvolve lógica, estratégia e resolução de problemas.",
    recommendedAge: "8 anos+",
    image: estrategiaTriangular,
    link: "https://amzn.to/43cMcbB",
  },
  {
    title: "Família em Ação",
    eyebrow: "Risadas garantidas para toda a família",
    description: "Um jogo de mímicas e desafios que aproxima gerações. Desenvolve comunicação, criatividade e interação social.",
    recommendedAge: "8 anos+",
    image: familiaEmAcao,
    link: "https://amzn.to/4uU7ua8",
  },
  {
    title: "Geomundo",
    eyebrow: "Viaje pelo planeta sem sair da mesa",
    description: "Descubra países, culturas e curiosidades do mundo inteiro. Desenvolve conhecimentos de geografia e cultura geral.",
    recommendedAge: "10 anos+",
    image: geomundo,
    link: "https://amzn.to/4eapmqd",
  },
  {
    title: "Flowers",
    eyebrow: "Um jogo lindo que desafia a mente",
    description: "Combine cartas, planeje jogadas e conquiste a maior pontuação. Desenvolve raciocínio lógico, planejamento e percepção visual.",
    recommendedAge: "8 anos+",
    image: flowers,
    link: "https://amzn.to/4ulTBAz",
  },
  {
    title: "Jogo LAB 42 Experiências",
    eyebrow: "A ciência ganha vida dentro de casa",
    description: "Experiências incríveis para despertar a curiosidade e o amor pelo conhecimento. Desenvolve pensamento científico, observação e criatividade.",
    recommendedAge: "10 anos+",
    image: lab42,
    link: "https://amzn.to/4vt4kKf",
  },
  {
    title: "Imagem & Ação 2",
    eyebrow: "As melhores risadas começam com um desenho impossível",
    description: "Desenhe, adivinhe e descubra quem conhece melhor a família. Desenvolve criatividade, comunicação e interação social.",
    recommendedAge: "10 anos+",
    image: imagemAcao2,
    link: "https://amzn.to/3Q5Zqnx",
  },
  {
    title: "Quartz",
    eyebrow: "Quem será o minerador mais esperto da mesa?",
    description: "Colete cristais valiosos e faça as melhores escolhas para vencer. Desenvolve estratégia, planejamento e tomada de decisão.",
    recommendedAge: "8 anos+",
    image: quartz,
    link: "https://amzn.to/4dP8Exz",
  },
  {
    title: "Saboteur",
    eyebrow: "Nem todo mundo está jogando do mesmo lado...",
    description: "Descubra quem está ajudando e quem está sabotando o grupo. Desenvolve estratégia, observação e interação social.",
    recommendedAge: "8 anos+",
    image: saboteur,
    link: "https://amzn.to/4uRyqaj",
  },
];

const benefitHighlights = [
  { label: "Conexão Familiar", Icon: Heart },
  { label: "Raciocínio Lógico", Icon: Brain },
  { label: "Criatividade", Icon: Sparkles },
  { label: "Comunicação", Icon: MessageCircle },
  { label: "Estratégia", Icon: Puzzle },
];

const featuredProducts = products.slice(0, 3);

const AchadinhosFamilia = () => {
  return (
    <Layout>
      <PageBanner
        title="Jogos para Brincar em Família"
        subtitle="Momentos de conexão, risadas e memórias longe das telas."
        bgColor="bg-secondary"
      />

      <section className="py-8 md:py-10 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6 items-start">
            <div className="rounded-3xl bg-card border border-border p-5 md:p-6 shadow-soft">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefitHighlights.map(({ label, Icon }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-heading font-semibold text-sm text-foreground">{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
                <p className="font-heading font-bold text-xl text-foreground">Veja os jogos recomendados</p>
                <a href="#produtos" className="sm:ml-auto">
                  <Button className="rounded-full font-heading">
                    Ver todos os jogos
                    <ArrowDown className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-lilac/15 border border-lilac/25 p-5 md:p-6">
              <p className="text-sm font-heading font-bold text-primary">Selecionados por Flavinha</p>
              <h2 className="mt-2 font-heading font-bold text-2xl text-foreground">Favoritos das famílias</h2>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {featuredProducts.map((product) => (
                  <div key={product.title} className="overflow-hidden rounded-2xl bg-white shadow-soft">
                    <img src={product.image} alt={product.title} className="h-28 w-full object-contain p-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-[1fr_0.9fr] gap-6">
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                Por que investir em jogos em família?
              </h2>
              <div className="mt-4 space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Jogos de tabuleiro, cartas e desafios em grupo são uma forma simples de reunir a família, diminuir o excesso de telas e criar momentos de presença de verdade.
                </p>
                <p>
                  Além da diversão, eles ajudam as crianças a esperar a vez, lidar com regras, conversar, pensar em estratégias e conviver melhor com vitórias e frustrações.
                </p>
                <p>
                  Cada indicação desta página foi pensada para transformar o tempo juntos em aprendizado, afeto e boas memórias.
                </p>
              </div>
            </div>
            <div className="rounded-3xl bg-primary/10 border border-primary/20 p-5 md:p-6">
              <h3 className="font-heading font-bold text-xl text-foreground">
                O que os jogos em família desenvolvem?
              </h3>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm font-medium text-foreground">
                <li className="rounded-2xl bg-white/70 px-4 py-3">Convivência e vínculo</li>
                <li className="rounded-2xl bg-white/70 px-4 py-3">Comunicação</li>
                <li className="rounded-2xl bg-white/70 px-4 py-3">Raciocínio lógico</li>
                <li className="rounded-2xl bg-white/70 px-4 py-3">Estratégia</li>
                <li className="rounded-2xl bg-white/70 px-4 py-3">Criatividade</li>
                <li className="rounded-2xl bg-white/70 px-4 py-3">Memórias afetivas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="produtos" className="py-12 md:py-16 bg-secondary/40">
        <div className="container">
          <div className="mb-8 text-center">
            <p className="text-sm font-heading font-bold text-primary">Achadinhos da Flavinha</p>
            <h2 className="mt-2 font-heading font-bold text-3xl text-foreground">Jogos recomendados</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {products.map((product, index) => (
              <motion.article
                key={product.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.25) }}
                className="flex h-full flex-col overflow-hidden rounded-3xl bg-card border border-border shadow-soft"
              >
                <div className="aspect-square bg-white">
                  <img src={product.image} alt={product.title} className="h-full w-full object-contain p-4" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading font-bold text-xl text-foreground">{product.title}</h3>
                  <p className="mt-2 font-heading font-semibold text-primary">{product.eyebrow}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                  <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    Indicado: {product.recommendedAge}
                  </div>
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="mt-auto">
                    <Button className="w-full rounded-full font-heading">
                      Ver mais
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AchadinhosFamilia;
