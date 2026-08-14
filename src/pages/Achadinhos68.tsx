import { ArrowDown, Brain, ExternalLink, Heart, Puzzle, Star, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { products } from "@/data/achadinhos68";

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
