import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { products as products02 } from "@/pages/Achadinhos02";
import { products as products35 } from "@/pages/Achadinhos35";
import { products as products68 } from "@/pages/Achadinhos68";
import { products as productsFamilia } from "@/pages/AchadinhosFamilia";

const filters = ["Todos", "0-2 anos", "3-5 anos", "6-8 anos", "Em família"];

type Product = {
  title: string;
  eyebrow?: string;
  description: string;
  recommendedAge: string;
  image: string;
  link?: string;
  category: string;
};

const allProducts: Product[] = [
  ...products02.map((item) => ({ ...item, category: "0-2 anos" })),
  ...products35.map((item) => ({ ...item, category: "3-5 anos" })),
  ...products68.map((item) => ({ ...item, category: "6-8 anos" })),
  ...productsFamilia.map((item) => ({ ...item, category: "Em família" })),
];

const Indicacoes = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "Todos") {
      return allProducts;
    }

    return allProducts.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <Layout>
      <PageBanner
        title="Achadinhos da Flavinha"
        subtitle="Brinquedos, jogos e materiais que ajudam a criar memórias. Uma seleção especial para incentivar o brincar, a criatividade e a conexão entre pais e filhos."
        bgColor="bg-pastel-yellow/20"
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-5 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              {filteredProducts.length} achadinhos disponíveis
            </p>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-heading font-semibold transition-colors ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((item, index) => {
              const cardContent = (
                <>
                  <div className="aspect-square overflow-hidden rounded-xl bg-secondary">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-heading font-bold text-primary">
                      <Star className="h-3 w-3" />
                      {item.category}
                    </span>
                    <span className="rounded-full bg-pastel-yellow/60 px-2.5 py-1 text-xs font-heading font-bold text-foreground">
                      {item.recommendedAge}
                    </span>
                  </div>
                  <h2 className="mt-3 font-heading text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                  </h2>
                  {item.eyebrow ? (
                    <p className="mt-1 text-sm font-heading font-semibold text-primary">{item.eyebrow}</p>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </>
              );

              return (
                <motion.article
                  key={`${item.category}-${item.title}-${index}`}
                  whileHover={{ y: -4 }}
                  className="overflow-hidden rounded-2xl bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="group block">
                      {cardContent}
                    </a>
                  ) : (
                    <div className="group">{cardContent}</div>
                  )}
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        className="mt-4 w-full gap-1 rounded-full bg-primary font-heading font-bold text-primary-foreground"
                      >
                        Ver mais
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                  ) : (
                    <Button
                      size="sm"
                      disabled
                      className="mt-4 w-full rounded-full bg-primary font-heading font-bold text-primary-foreground"
                    >
                      Link em breve
                    </Button>
                  )}
                </motion.article>
              );
            })}
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground/70">
            Alguns links desta página podem gerar comissão sem custo extra para você.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Indicacoes;
