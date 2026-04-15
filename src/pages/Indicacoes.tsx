import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";

const filters = ["Todos", "Brinquedos", "Livros", "Materiais Sensoriais", "Para Mães", "Organização"];

const products = [
  { name: "Blocos de Madeira Montessori", age: "2+ anos", category: "Brinquedos", desc: "Perfeitos para coordenação motora e criatividade" },
  { name: "Kit Massinha Sensorial", age: "3+ anos", category: "Materiais Sensoriais", desc: "Texturas incríveis para estimular os sentidos" },
  { name: "Livro 'Monstro das Cores'", age: "3+ anos", category: "Livros", desc: "Um clássico sobre emoções para os pequenos" },
  { name: "Torre de Empilhar Arco-íris", age: "1+ ano", category: "Brinquedos", desc: "Cores vibrantes e encaixe perfeito" },
  { name: "Organizador de Brinquedos", age: "Todas as idades", category: "Organização", desc: "Mantenha o cantinho de brincar organizado" },
  { name: "Colar de Amamentação", age: "Para mães", category: "Para Mães", desc: "Seguro e estimulante para o bebê" },
];

const Indicacoes = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");

  return (
    <Layout>
      <PageBanner
        title="Achadinhos da Flavinha"
        subtitle="Aqui estão os materiais, brinquedos e itens que a Flavinha usa e recomenda para sua família"
        bgColor="bg-pastel-yellow/20"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-secondary rounded-xl mb-4 flex items-center justify-center text-4xl">
                  🧸
                </div>
                <span className="text-xs font-heading font-semibold text-primary">{item.category}</span>
                <h3 className="font-heading font-bold text-foreground mt-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.age}</p>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="mt-4 rounded-full bg-primary text-primary-foreground font-heading font-semibold gap-1 w-full">
                    Ver indicação <ExternalLink className="w-3 h-3" />
                  </Button>
                </a>
              </motion.div>
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

export default Indicacoes;
