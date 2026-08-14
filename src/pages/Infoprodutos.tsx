import { Download, ShoppingCart, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";
import aboutFamily from "@/assets/about-family.webp";

const products = [
  { name: "100 Brincadeiras para Pais Sem Habilidades", price: "R$ 47,00", emoji: "🎲", age: "1-8 anos", desc: "Um guia completo com brincadeiras simples e divertidas que qualquer pai ou mãe pode fazer, sem precisar de nenhuma habilidade especial.", benefits: ["Sem materiais complicados", "Para todas as idades", "Passo a passo ilustrado"] },
  { name: "Brincando com as Emoções", price: "R$ 37,00", emoji: "💜", age: "3-7 anos", desc: "Atividades para ajudar as crianças a reconhecer, expressar e lidar com seus sentimentos.", benefits: ["Desenvolvimento emocional", "Cartas e jogos", "Guia para pais"] },
  { name: "Desafio Desconectar para Conectar", price: "R$ 27,00", emoji: "🌟", age: "Toda a família", desc: "30 dias de desafios para reduzir telas e aumentar a conexão em família.", benefits: ["Menos telas", "Rotina saudável", "Conexão familiar"] },
  { name: "Atividades Sensoriais", price: "R$ 37,00", emoji: "🎨", age: "0-5 anos", desc: "Kit completo de atividades sensoriais para estimular o desenvolvimento dos pequenos.", benefits: ["Receitas caseiras", "Seguro para bebês", "Estimulação precoce"] },
];

const Infoprodutos = () => {
  return (
    <Layout>
      <PageBanner
        title="Infoprodutos Mundo Flavinha"
        subtitle="Materiais digitais criados com carinho para famílias que querem brincar mais e se conectar melhor"
        bgColor="bg-pink/15"
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { icon: "💜", title: "Desenvolvimento emocional" },
              { icon: "📵", title: "Menos telas" },
              { icon: "👨‍👩‍👧‍👦", title: "Conexão familiar" },
              { icon: "🎨", title: "Brincadeiras criativas" },
            ].map((b) => (
              <div key={b.title} className="bg-card rounded-2xl p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">{b.icon}</div>
                <p className="font-heading font-semibold text-sm text-foreground">{b.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[3/2] bg-lilac/15 flex items-center justify-center text-6xl">
                  {item.emoji}
                </div>
                <div className="p-6">
                  <span className="text-xs font-heading font-semibold text-primary">{item.age}</span>
                  <h3 className="font-heading font-bold text-lg text-foreground mt-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                  <ul className="mt-3 space-y-1">
                    {item.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                        <Star className="w-3 h-3 text-pastel-yellow" /> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-heading font-bold text-xl text-primary">{item.price}</span>
                    <Button className="rounded-full bg-primary text-primary-foreground font-heading font-bold gap-2">
                      <ShoppingCart className="w-4 h-4" /> Quero esse material
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-mint/15 rounded-3xl p-8 text-center">
            <Heart className="w-8 h-8 text-pink mx-auto mb-3" />
            <h3 className="font-heading font-bold text-xl text-foreground">Quer experimentar antes?</h3>
            <p className="text-muted-foreground mt-2">Baixe um material gratuito e conheça a qualidade do Mundo Flavinha.</p>
            <Button className="mt-4 rounded-full bg-primary text-primary-foreground font-heading font-bold gap-2">
              <Download className="w-4 h-4" /> Baixar material gratuito
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Infoprodutos;
