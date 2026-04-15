import { useState } from "react";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";
import familyPlay from "@/assets/family-play.jpg";
import age35 from "@/assets/age-3-5.jpg";
import age68 from "@/assets/age-6-8.jpg";
import age02 from "@/assets/age-0-2.jpg";

const categories = ["Todos", "Recentes", "Brincadeiras", "Experiências", "Vlogs em Família"];

const videos = [
  { title: "5 brincadeiras para dias de chuva", category: "Brincadeiras", img: age35 },
  { title: "Rotina de brincadeiras da semana", category: "Vlogs em Família", img: familyPlay },
  { title: "Experiência com cores e água", category: "Experiências", img: age68 },
  { title: "Primeiro dia sem telas do Lucas", category: "Vlogs em Família", img: age02 },
  { title: "Massinha sensorial caseira", category: "Brincadeiras", img: age35 },
  { title: "O que compramos de brinquedos educativos", category: "Recentes", img: age68 },
];

const Videos = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");

  return (
    <Layout>
      <PageBanner
        title="Vídeos do Canal"
        subtitle="Toda segunda e quinta tem vídeo novo no canal Mundo Flavinha"
        bgColor="bg-pink/15"
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video group cursor-pointer">
              <img src={familyPlay} alt="Vídeo em destaque" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center group-hover:bg-foreground/30 transition-colors">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/90 flex items-center justify-center shadow-lg">
                  <Play className="w-8 h-8 text-primary ml-1" />
                </div>
              </div>
            </div>
            <h3 className="font-heading font-bold text-xl text-foreground mt-4 text-center">Vídeo em Destaque</h3>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors ${
                  activeCategory === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <motion.div
                key={video.title}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={video.img} alt={video.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-foreground/10 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/80 flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs font-heading font-semibold text-primary">{video.category}</span>
                  <h3 className="font-heading font-bold text-sm text-foreground mt-1">{video.title}</h3>
                  <Button size="sm" variant="outline" className="mt-3 rounded-full font-heading text-xs border-primary/30 text-foreground gap-1">
                    Assistir <ArrowRight className="w-3 h-3" />
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

export default Videos;
