import { ArrowDown, Brain, ExternalLink, Heart, MessageCircle, Puzzle, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { products } from "@/data/achadinhosFamilia";

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
