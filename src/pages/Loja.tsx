import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";

const categories = [
  { name: "Infoprodutos", desc: "E-books, guias e materiais digitais completos", emoji: "📚", path: "/infoprodutos" },
  { name: "Atividades", desc: "Atividades para imprimir e brincar", emoji: "🎨", path: "/infoprodutos" },
  { name: "Desafios", desc: "Desafios para famílias que querem mais conexão", emoji: "🌟", path: "/infoprodutos" },
];

const Loja = () => {
  return (
    <Layout>
      <PageBanner
        title="Loja Flavinha"
        subtitle="Materiais criados para ajudar famílias a brincar mais, fortalecer vínculos e reduzir telas"
        bgColor="bg-lilac/15"
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <Link to={cat.path} key={cat.name}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center h-full"
                >
                  <div className="text-5xl mb-4">{cat.emoji}</div>
                  <h3 className="font-heading font-bold text-xl text-foreground">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{cat.desc}</p>
                  <Button variant="outline" size="sm" className="mt-4 rounded-full font-heading border-primary/30 text-foreground gap-1">
                    Explorar <ArrowRight className="w-3 h-3" />
                  </Button>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Loja;
