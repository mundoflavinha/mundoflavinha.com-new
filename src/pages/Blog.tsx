import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";
import vinteReais from "@/assets/Artigo/20-reais-para-meus-filhos.webp";
import albumDaCopa from "@/assets/Artigo/Album-da-Copa.webp";
import momentosNatacao from "@/assets/Artigo/Momentos-Natação.webp";
import empreendedorismoInfantil from "@/assets/Artigo/Empreendedorismo-Infantil.webp";
import brincadeiraNoCarro from "@/assets/Artigo/brincadeira-no-carro.webp";

const categories = [
  "Todos",
  "Reflexão",
  "Maternidade",
  "Infância",
  "Brincadeiras sem telas",
  "Memórias afetivas",
  "Educação financeira",
];

const posts = [
  {
    title: "Dei R$20 para cada filho meu no shopping e o que aconteceu me fez pensar!",
    category: "Reflexão",
    excerpt: "Uma experiência simples no shopping virou uma reflexão sobre escolhas, espera, limites e educação financeira infantil na prática.",
    date: "30 Mai 2026",
    image: vinteReais,
    href: "/blog/20-reais-shopping",
  },
  {
    title: "No carro da minha infância não existia tela. Existia conversa.",
    category: "Reflexão",
    excerpt: "Uma reflexão sobre como brincadeiras simples no carro podem criar conexão, memórias afetivas e presença entre pais e filhos.",
    date: "30 Mai 2026",
    image: brincadeiraNoCarro,
    href: "/blog/brincadeira-no-carro",
  },
  {
    title: "O dia em que meus filhos criaram uma lojinha no prédio.",
    category: "Reflexão",
    excerpt: "Uma brincadeira com squishies de papel virou uma experiência linda sobre criatividade, educação financeira e autonomia.",
    date: "30 Mai 2026",
    image: empreendedorismoInfantil,
    href: "/blog/empreendedorismo-infantil",
  },
  {
    title: "Presença se constrói nos pequenos momentos.",
    category: "Reflexão",
    excerpt: "Entre brincadeiras na piscina, risadas e pequenos gestos de cuidado, uma reflexão sobre presença, vínculos e infância.",
    date: "30 Mai 2026",
    image: momentosNatacao,
    href: "/blog/presenca-pequenos-momentos",
  },
  {
    title: "Eu tinha prometido para mim mesma que NÃO iria comprar o álbum da Copa.",
    category: "Reflexão",
    excerpt: "Entre figurinhas repetidas, pacotinhos e memórias afetivas, entendi que o álbum da Copa vai muito além do consumo.",
    date: "30 Mai 2026",
    image: albumDaCopa,
    href: "/blog/album-da-copa",
  },
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
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-heading font-semibold bg-secondary text-foreground/70 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link to={post.href} key={post.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-lilac/10">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
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
              </Link>
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
