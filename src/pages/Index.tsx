import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Download, Star, Heart, BookOpen, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import heroFamily from "@/assets/hero-family.jpg";
import age02 from "@/assets/age-0-2.jpg";
import age35 from "@/assets/age-3-5.jpg";
import age68 from "@/assets/age-6-8.jpg";
import familyPlay from "@/assets/family-play.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Index = () => {
  const [downloadModal, setDownloadModal] = useState<string | null>(null);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-secondary py-12 md:py-20 lg:py-24">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pastel-yellow/40 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-baby-blue/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink/20 rounded-full blur-2xl" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-yellow/60 text-sm font-heading font-semibold text-foreground mb-4">
                <Sparkles className="w-4 h-4" /> Mundo Flavinha
              </span>
              <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground leading-tight">
                Menos telas.
                <br />
                <span className="text-primary">Mais infância.</span>
                <br />
                Mais memórias em família.
              </h1>
              <p className="mt-4 md:mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
                Brincadeiras, ideias, atividades, materiais, vídeos e recursos para famílias que querem mais conexão com seus filhos.
              </p>
              <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
                <Link to="/brincadeiras">
                  <Button className="rounded-full bg-primary text-primary-foreground font-heading font-bold text-base px-6 py-3 h-auto gap-2">
                    <Star className="w-4 h-4" /> Ver brincadeiras
                  </Button>
                </Link>
                <Link to="/downloads">
                  <Button variant="outline" className="rounded-full font-heading font-bold text-base px-6 py-3 h-auto gap-2 border-primary/30 text-foreground hover:bg-primary/10">
                    <Download className="w-4 h-4" /> Baixar atividade gratuita
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src={heroFamily} alt="Flávia brincando com Lucas e Bárbara" className="w-full h-auto object-cover" width={1024} height={1024} />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-mint/50 rounded-full blur-xl" />
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-pastel-yellow/50 rounded-full blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* VIDEO DESTAQUE */}
      <section className="py-16 md:py-20">
        <div className="container">
          <SectionTitle
            title="Novo vídeo no canal"
            subtitle="Toda segunda e quinta tem vídeo novo no canal Mundo Flavinha."
          />
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-foreground/5 aspect-video flex items-center justify-center group cursor-pointer">
              <img src={familyPlay} alt="Vídeo em destaque" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center group-hover:bg-foreground/30 transition-colors">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/90 flex items-center justify-center shadow-lg">
                  <Play className="w-8 h-8 text-primary ml-1" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="https://youtube.com/@mundoflavinha" target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-primary text-primary-foreground font-heading font-bold gap-2">
                  <Play className="w-4 h-4" /> Assistir no YouTube
                </Button>
              </a>
              <Link to="/videos">
                <Button variant="outline" className="rounded-full font-heading font-bold border-primary/30 text-foreground hover:bg-primary/10 gap-2">
                  Ver todos os vídeos <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BRINCADEIRAS POR IDADE */}
      <section className="py-16 md:py-20 bg-secondary/50">
        <div className="container">
          <SectionTitle title="Brincadeiras por idade" subtitle="Encontre brincadeiras perfeitas para cada fase do desenvolvimento" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "0 a 2 anos", img: age02, desc: "Estímulo sensorial e motor" },
              { label: "3 a 5 anos", img: age35, desc: "Criatividade e imaginação" },
              { label: "6 a 8 anos", img: age68, desc: "Desafios e aprendizado" },
              { label: "Em família", img: familyPlay, desc: "Momentos de conexão" },
            ].map((item) => (
              <Link to="/brincadeiras" key={item.label}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={item.img} alt={item.label} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-heading font-bold text-foreground">{item.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOADS GRATUITOS */}
      <section className="py-16 md:py-20">
        <div className="container">
          <SectionTitle title="Atividades gratuitas para brincar em casa" subtitle="Baixe materiais prontos para imprimir e brincar com seus filhos" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Roda das Emoções", emoji: "🎡", color: "bg-pink/30" },
              { name: "Desafio 7 Dias Sem Telas", emoji: "📵", color: "bg-baby-blue/30" },
              { name: "Cartas de Sentimentos", emoji: "💌", color: "bg-pastel-yellow/30" },
              { name: "Jogo da Memória", emoji: "🧩", color: "bg-mint/30" },
            ].map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer"
                onClick={() => setDownloadModal(item.name)}
              >
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3`}>
                  {item.emoji}
                </div>
                <h3 className="font-heading font-bold text-sm md:text-base text-foreground">{item.name}</h3>
                <Button size="sm" className="mt-3 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-xs gap-1">
                  <Download className="w-3 h-3" /> Baixar grátis
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INDICAÇÕES DA FLAVINHA */}
      <section className="py-16 md:py-20 bg-pastel-yellow/20">
        <div className="container">
          <SectionTitle title="Achadinhos da Flavinha" subtitle="Brinquedos, livros e materiais que a Flavinha usa e recomenda para sua família" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Blocos de Madeira Montessori", age: "2+ anos", price: "R$ 89,90" },
              { name: "Kit Massinha Sensorial", age: "3+ anos", price: "R$ 49,90" },
              { name: "Livro 'Monstro das Cores'", age: "3+ anos", price: "R$ 39,90" },
              { name: "Torre de Empilhar Arco-íris", age: "1+ ano", price: "R$ 69,90" },
            ].map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-secondary rounded-xl mb-3 flex items-center justify-center text-3xl">
                  🧸
                </div>
                <h3 className="font-heading font-bold text-sm text-foreground">{item.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.age}</p>
                <Button size="sm" variant="outline" className="mt-3 rounded-full font-heading text-xs w-full border-primary/30 text-foreground hover:bg-primary/10">
                  Ver indicação
                </Button>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/indicacoes">
              <Button variant="outline" className="rounded-full font-heading font-bold border-primary/30 text-foreground hover:bg-primary/10 gap-2">
                Ver todas as indicações <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* LOJA FLAVINHA */}
      <section className="py-16 md:py-20">
        <div className="container">
          <SectionTitle title="Loja Flavinha" subtitle="Materiais criados com carinho para ajudar famílias a brincar mais e se conectar melhor" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "100 Brincadeiras para Pais Sem Habilidades", price: "R$ 47,00", emoji: "🎲" },
              { name: "Brincando com as Emoções", price: "R$ 37,00", emoji: "💜" },
              { name: "Desafio Desconectar para Conectar", price: "R$ 27,00", emoji: "🌟" },
              { name: "Atividades Sensoriais", price: "R$ 37,00", emoji: "🎨" },
            ].map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] bg-lilac/20 rounded-xl mb-3 flex items-center justify-center text-4xl">
                  {item.emoji}
                </div>
                <h3 className="font-heading font-bold text-sm text-foreground">{item.name}</h3>
                <p className="text-primary font-bold mt-1">{item.price}</p>
                <Button size="sm" className="mt-3 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-xs w-full">
                  Conhecer material
                </Button>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/loja">
              <Button variant="outline" className="rounded-full font-heading font-bold border-primary/30 text-foreground hover:bg-primary/10 gap-2">
                Ver toda a loja <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-16 md:py-20 bg-secondary/50">
        <div className="container">
          <SectionTitle title="Blog da Flavinha" subtitle="Reflexões, dicas e histórias reais sobre maternidade, infância e conexão em família" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: "Por que brincar é mais importante do que parece", category: "Desenvolvimento" },
              { title: "O que aprendi sobre infância depois de me tornar mãe", category: "Maternidade" },
              { title: "O dia que minha filha comprou um presente para o irmão", category: "Histórias" },
              { title: "Menos telas, mais presença", category: "Telas" },
            ].map((post) => (
              <Link to="/blog" key={post.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full"
                >
                  <div className="aspect-[4/3] bg-mint/20 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-primary/50" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-heading font-semibold text-primary">{post.category}</span>
                    <h3 className="font-heading font-bold text-sm text-foreground mt-1 leading-snug">{post.title}</h3>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs font-heading font-semibold text-primary">
                      Ler mais <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHATSAPP GROUP */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center bg-mint/20 rounded-3xl p-8 md:p-12">
            <div className="w-16 h-16 rounded-full bg-mint/50 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-foreground" />
            </div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
              Grupo do WhatsApp sobre brincar
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Entre para o grupo do WhatsApp e receba ideias de brincadeiras, inspirações e novidades do Mundo Flavinha.
            </p>
            <a href="https://chat.whatsapp.com/example" target="_blank" rel="noopener noreferrer">
              <Button className="mt-6 rounded-full bg-[hsl(142,70%,45%)] text-primary-foreground font-heading font-bold text-base px-8 py-3 h-auto gap-2 hover:bg-[hsl(142,70%,40%)]">
                <MessageCircle className="w-5 h-5" /> Entrar no grupo
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 md:py-20 bg-lilac/10">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <Heart className="w-10 h-10 text-pink mx-auto mb-4" />
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
              Receba novidades e ideias para brincar
            </h2>
            <p className="mt-3 text-muted-foreground">
              Receba novidades, materiais e ideias para brincar com seus filhos.
            </p>
            <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Seu nome" className="rounded-full border-border text-center" />
              <Input type="email" placeholder="Seu e-mail" className="rounded-full border-border text-center" />
              <Input placeholder="WhatsApp (com DDD)" className="rounded-full border-border text-center" />
              <Button type="submit" className="w-full rounded-full bg-primary text-primary-foreground font-heading font-bold text-base h-12">
                Quero receber ✨
              </Button>
            </form>
          </div>
        </div>
      </section>

      <LeadCaptureModal
        isOpen={!!downloadModal}
        onClose={() => setDownloadModal(null)}
        materialName={downloadModal || ""}
      />
    </Layout>
  );
};

export default Index;
