import { ArrowRight, BookOpen, MessageCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";

const categories = ["Todos", "Maternidade", "Desenvolvimento infantil", "Telas", "Escola", "Emoções", "Rotina"];

const posts = [
  { title: "Por que brincar é mais importante do que parece", category: "Desenvolvimento infantil", excerpt: "A ciência comprova: brincar não é apenas diversão. É a principal forma de aprendizado na infância e impacta diretamente o desenvolvimento cerebral.", date: "10 Abr 2026" },
  { title: "O que aprendi sobre infância depois de me tornar mãe", category: "Maternidade", excerpt: "Ser mãe mudou completamente a minha visão sobre o que as crianças realmente precisam. E não é o que eu imaginava.", date: "7 Abr 2026" },
  { title: "O dia que minha filha comprou um presente para o irmão", category: "Emoções", excerpt: "Uma história real e emocionante sobre como as crianças são capazes de atos de generosidade que nos surpreendem.", date: "3 Abr 2026" },
  { title: "Menos telas, mais presença", category: "Telas", excerpt: "Como reduzimos o tempo de tela na nossa casa e o que mudou na rotina e no comportamento das crianças.", date: "28 Mar 2026" },
  { title: "Como criar uma rotina de brincadeiras sem enlouquecer", category: "Rotina", excerpt: "Dicas práticas para encaixar brincadeiras no dia a dia sem sentir culpa quando não dá.", date: "24 Mar 2026" },
  { title: "A escola não substitui o brincar", category: "Escola", excerpt: "Por que mesmo com a melhor escola, as crianças ainda precisam de brincadeira livre e tempo em família.", date: "20 Mar 2026" },
];

const Blog = () => {
  return (
    <Layout>
      <PageBanner
        title="Blog da Flavinha"
        subtitle="Reflexões, dicas e histórias reais sobre maternidade, infância, vínculos, brincar e a vida como ela é"
        bgColor="bg-mint/15"
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((c) => (
              <button
                key={c}
                className="px-4 py-2 rounded-full text-sm font-heading font-semibold bg-secondary text-foreground/70 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <motion.div
                key={post.title}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="aspect-[4/3] bg-lilac/10 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-primary/30" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-heading font-semibold text-primary">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="font-heading font-bold text-foreground leading-snug">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-sm font-heading font-semibold text-primary">
                    Ler mais <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-baby-blue/15 rounded-3xl p-8 text-center">
              <Download className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-foreground">Material gratuito</h3>
              <p className="text-sm text-muted-foreground mt-2">Baixe uma atividade grátis para brincar com seus filhos.</p>
              <Button className="mt-4 rounded-full bg-primary text-primary-foreground font-heading font-bold">Baixar grátis</Button>
            </div>
            <div className="bg-mint/15 rounded-3xl p-8 text-center">
              <MessageCircle className="w-8 h-8 text-foreground mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-foreground">Grupo do WhatsApp</h3>
              <p className="text-sm text-muted-foreground mt-2">Receba ideias de brincadeiras e inspirações diárias.</p>
              <Button className="mt-4 rounded-full bg-[hsl(142,70%,45%)] text-primary-foreground font-heading font-bold">Entrar no grupo</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
