import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";
import cartaoDiaDosPais from "@/assets/loja flavinha/cartaodiadospais.webp";
import monocromaticoProduto from "@/assets/loja flavinha/01 monocromatico.webp";

const products = [
  {
    name: "Kit Cartão Criativo Dia dos Pai",
    price: "R$ 14,99",
    image: cartaoDiaDosPais,
    href: "https://www.mundoflavinha.com/dia-dos-pais",
    desc: "Atividade pronta para imprimir, criar e celebrar com carinho.",
  },
  {
    name: "Cartões de Alto Contraste para Bebês",
    price: "Material digital",
    image: monocromaticoProduto,
    path: "/loja/cartoes-alto-contraste-bebes",
    desc: "Um kit imprimível para estimular os primeiros olhares do bebê, sem telas e com muito carinho.",
  },
];

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
        subtitle="Atividades prontas para imprimir, brincar e aprender - em casa ou na escola."
        bgColor="bg-lilac/15"
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.name}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden bg-lilac/15">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg text-foreground">{product.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{product.desc}</p>
                  <p className="text-primary font-bold mt-3">{product.price}</p>
                  {"href" in product ? (
                    <a href={product.href} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="mt-4 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-xs w-full">
                        Conhecer material
                      </Button>
                    </a>
                  ) : (
                    <Link to={product.path}>
                      <Button size="sm" className="mt-4 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-xs w-full">
                        Conhecer material
                      </Button>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <h2 className="mt-12 mb-6 text-center font-heading text-2xl font-bold text-foreground">
            Explore por categoria
          </h2>
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
