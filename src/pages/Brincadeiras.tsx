import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { brincadeiras02 } from "@/data/brincadeiras02";
import { brincadeiras35 } from "@/data/brincadeiras35";
import { brincadeiras68 } from "@/data/brincadeiras68";
import { brincadeirasFamilia } from "@/data/brincadeirasFamilia";

const filters = ["Todas", "0-2 anos", "3-5 anos", "6-8 anos", "Em família"];

type BrincadeiraCard = {
  id: string;
  title: string;
  age: string;
  category: string;
  image: string;
  summary: string;
  time?: string;
  path: string;
};

const allBrincadeiras: BrincadeiraCard[] = [
  ...brincadeiras02.map((item) => ({
    id: `0-2-${item.slug}`,
    title: item.title,
    age: item.age,
    category: "0-2 anos",
    image: item.image,
    summary: item.summary,
    time: item.time,
    path: `/brincadeiras/0-a-2-anos/${item.slug}`,
  })),
  ...brincadeiras35.map((item) => ({
    id: `3-5-${item.slug}`,
    title: item.title,
    age: item.age,
    category: "3-5 anos",
    image: item.image,
    summary: item.summary,
    time: item.time,
    path: `/brincadeiras/3-a-5-anos/${item.slug}`,
  })),
  ...brincadeiras68.map((item) => ({
    id: `6-8-${item.slug}`,
    title: item.title,
    age: item.age,
    category: "6-8 anos",
    image: item.image,
    summary: item.summary,
    time: item.time,
    path: `/brincadeiras/6-a-8-anos/${item.slug}`,
  })),
  ...brincadeirasFamilia.map((item) => ({
    id: `familia-${item.slug}`,
    title: item.title,
    age: item.age,
    category: "Em família",
    image: item.image,
    summary: item.summary,
    time: item.time,
    path: `/brincadeiras/em-familia/${item.slug}`,
  })),
];

const Brincadeiras = () => {
  const [activeFilter, setActiveFilter] = useState("Todas");

  const filteredBrincadeiras = useMemo(() => {
    if (activeFilter === "Todas") {
      return allBrincadeiras;
    }

    return allBrincadeiras.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <Layout>
      <PageBanner
        title="Brincadeiras"
        subtitle="Todas as ideias cadastradas no Mundo Flavinha, organizadas por fase e por momentos em família."
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-5 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              {filteredBrincadeiras.length} brincadeiras disponíveis
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBrincadeiras.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.01, 0.2) }}
                className="overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <Link to={item.path} className="block">
                  <div className="aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain p-1 transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </Link>
                <div className="p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-heading font-bold text-primary">
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-pastel-yellow/60 px-2.5 py-1 text-xs font-heading font-bold text-foreground">
                      <Star className="h-3 w-3" />
                      {item.age.split(".")[0]}
                    </span>
                  </div>
                  <h2 className="font-heading text-xl font-bold leading-tight text-foreground">{item.title}</h2>
                  <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    {item.time ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {item.time.split(".")[0]}
                      </span>
                    ) : (
                      <span />
                    )}
                    <Link to={item.path}>
                      <Button size="sm" className="gap-1 rounded-full bg-primary font-heading font-bold text-primary-foreground">
                        Ver brincadeira
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Brincadeiras;
