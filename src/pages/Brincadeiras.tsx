import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import age02 from "@/assets/age-0-2.jpg";
import age35 from "@/assets/age-3-5.jpg";
import age68 from "@/assets/age-6-8.jpg";
import familyPlay from "@/assets/family-play.jpg";

const filters = ["Todas", "0-2 anos", "3-5 anos", "6-8 anos", "Sem telas", "Sensorial", "Coordenação motora", "Emoções", "Em família"];

const brincadeiras = [
  { title: "Pintura com os dedos", age: "1-3 anos", category: "Sensorial", img: age35, desc: "Explore texturas e cores usando tinta atóxica e muita diversão." },
  { title: "Caça ao tesouro em casa", age: "4-6 anos", category: "Em família", img: familyPlay, desc: "Uma aventura pela casa que estimula o raciocínio e a cooperação." },
  { title: "Empilhando objetos", age: "0-2 anos", category: "Coordenação motora", img: age02, desc: "Desenvolve coordenação motora e concentração dos pequenos." },
  { title: "Teatro de fantoches", age: "3-5 anos", category: "Emoções", img: age35, desc: "Estimule a imaginação e a expressão emocional das crianças." },
  { title: "Circuito motor no quintal", age: "4-7 anos", category: "Coordenação motora", img: age68, desc: "Movimente o corpo com desafios divertidos ao ar livre." },
  { title: "Massinha caseira", age: "2-5 anos", category: "Sensorial", img: age35, desc: "Receita fácil e segura para horas de brincadeira criativa." },
];

const Brincadeiras = () => {
  const [activeFilter, setActiveFilter] = useState("Todas");

  return (
    <Layout>
      <PageBanner
        title="Brincadeiras"
        subtitle="Ideias práticas e divertidas para cada fase do desenvolvimento do seu filho"
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors ${
                  activeFilter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brincadeiras.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-heading font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{item.age}</span>
                    <span className="text-xs text-muted-foreground">{item.category}</span>
                  </div>
                  <h3 className="font-heading font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  <Button size="sm" className="mt-4 rounded-full bg-primary text-primary-foreground font-heading font-semibold gap-1">
                    <Star className="w-3 h-3" /> Ver brincadeira
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Brincadeiras;
