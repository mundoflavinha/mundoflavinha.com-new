import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Sparkles, Star } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { brincadeiras35 } from "@/data/brincadeiras35";

const Brincadeiras35 = () => {
  return (
    <Layout>
      <section className="bg-pink/20 py-8 md:py-10">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-heading font-bold text-primary">
              <Sparkles className="h-4 w-4" />
              23 ideias práticas para brincar em casa
            </span>
            <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              Brincadeiras de 3 a 5 anos
            </h1>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Ideias para aprender brincando todos os dias, com atividades simples, criativas e cheias de desenvolvimento.
              Nessa fase, a criança aprende muito pelo movimento, pela repetição, pela curiosidade e pela imaginação.
              Aqui você encontra brincadeiras com materiais simples para estimular coordenação, linguagem, atenção,
              criatividade e autonomia.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-6 pb-12 md:pt-8 md:pb-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brincadeiras35.map((item, index) => (
              <motion.article
                key={item.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.25) }}
                className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Link to={`/brincadeiras/3-a-5-anos/${item.slug}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </Link>
                <div className="p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-heading font-bold text-primary">
                      Card {String(item.id).padStart(2, "0")}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-pastel-yellow/60 px-2.5 py-1 text-xs font-heading font-bold text-foreground">
                      <Star className="h-3 w-3" />
                      {item.age}
                    </span>
                  </div>
                  <h2 className="font-heading text-xl font-bold leading-tight text-foreground">{item.title}</h2>
                  <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {item.time}
                    </span>
                    <Link to={`/brincadeiras/3-a-5-anos/${item.slug}`}>
                      <Button size="sm" className="rounded-full bg-primary font-heading font-bold text-primary-foreground gap-1">
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

export default Brincadeiras35;
