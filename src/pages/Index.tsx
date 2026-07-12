import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Download, Star, Heart, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import heroFamily from "@/assets/hero_family_01.png";
import age02 from "@/assets/age-0-2-(1).png";
import age35 from "@/assets/age-3-5-(1).png";
import age68 from "@/assets/age-6-8-(1).png";
import familyPlay from "@/assets/family-play-(1).png";
import vinteReais from "@/assets/Artigo/20-reais-para-meus-filhos.png";
import albumDaCopa from "@/assets/Artigo/Album-da-Copa.png";
import empreendedorismoInfantil from "@/assets/Artigo/Empreendedorismo-Infantil.png";
import brincadeiraNoCarro from "@/assets/Artigo/brincadeira-no-carro.png";
import jogoDaReciclagem from "@/assets/downloadgratuito/JogodaReciclagem.png";
import jogoDaTampinha from "@/assets/downloadgratuito/JogodaTampinha.png";
import semaforoDoToque from "@/assets/downloadgratuito/semaforodotoque.png";
import coleteEducativo from "@/assets/downloadgratuito/coleteeducativo.png";
import cartaoDiaDosPais from "@/assets/loja flavinha/cartaodiadospais.png";
import monocromaticoProduto from "@/assets/loja flavinha/01 monocromatico.png";
import achadinho02 from "@/assets/achadinho da flavinha/0-2-achadinhoflavinha.png";
import achadinho35 from "@/assets/achadinho da flavinha/3-5-achadinhoflavinha.png";
import achadinho68 from "@/assets/achadinho da flavinha/6-8-achadinhoflavinha.png";
import achadinhoFamilia from "@/assets/achadinho da flavinha/emfamilia-achadinhoflavinha.png";

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
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-foreground/5 aspect-video">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/uuaYyN7v8H4?start=19"
                title="Novo vídeo no canal Mundo Flavinha"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="https://www.youtube.com/@mundoflavinha" target="_blank" rel="noopener noreferrer">
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
              { label: "Brincadeiras de 0 a 2 anos", img: age02, desc: "Atividades para explorar, descobrir e se desenvolver.", path: "/brincadeiras/0-a-2-anos" },
              { label: "Brincadeiras de 3 a 5 anos", img: age35, desc: "Ideias para aprender brincando todos os dias.", path: "/brincadeiras/3-a-5-anos" },
              { label: "Brincadeiras de 6 a 8 anos", img: age68, desc: "Desafios criativos para estimular habilidades e autonomia.", path: "/brincadeiras/6-a-8-anos" },
              { label: "Brincadeiras em família", img: familyPlay, desc: "Para criar memórias, fortalecer vínculos e se divertir juntos.", path: "/brincadeiras/em-familia" },
            ].map((item) => (
              <Link to={"path" in item ? item.path : "/brincadeiras"} key={item.label}>
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
          <SectionTitle
            title="Materiais gratuitos para imprimir e brincar"
            subtitle="Atividades educativas prontas para famílias, professores e escolas incentivarem o aprendizado de forma lúdica."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Jogo da Reciclagem", img: jogoDaReciclagem },
              { name: "Cada Tampinha no Seu Lugar", img: jogoDaTampinha },
              { name: "Semáforo do Toque", img: semaforoDoToque },
              { name: "Colete Educativo", img: coleteEducativo },
            ].map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer"
                onClick={() => setDownloadModal(item.name)}
              >
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img src={item.img} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-sm md:text-base text-foreground">{item.name}</h3>
                  <Button size="sm" className="mt-3 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-xs gap-1">
                    <Download className="w-3 h-3" /> Baixar grátis
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INDICAÇÕES DA FLAVINHA */}
      <section className="py-16 md:py-20 bg-pastel-yellow/20">
        <div className="container">
          <SectionTitle
            title="Achadinhos da Flavinha"
            subtitle="Brinquedos, jogos e materiais que ajudam a criar memórias. Uma seleção especial de produtos que fizeram parte da infância dos meus filhos, Lucas e Bárbara, além de outras recomendações que acredito no poder do brincar, da criatividade e da conexão entre pais e filhos."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                name: "Brinquedos de 0 a 2 anos",
                age: "Primeiras descobertas, estímulos sensoriais e muita diversão para os pequenos exploradores.",
                price: "R$ 89,90",
                image: achadinho02,
                path: "/indicacoes/0-a-2-anos",
              },
              {
                name: "Brinquedos de 3 a 5 anos",
                age: "Imaginação, criatividade e brincadeiras que transformam aprendizado em aventura.",
                price: "R$ 49,90",
                image: achadinho35,
                path: "/indicacoes/3-a-5-anos",
              },
              {
                name: "Brinquedos de 6 a 8 anos",
                age: "Jogos, desafios e atividades que estimulam raciocínio, autonomia e criatividade.",
                price: "R$ 39,90",
                image: achadinho68,
                path: "/indicacoes/6-a-8-anos",
              },
              {
                name: "Jogos para Brincar em Família",
                age: "Momentos de conexão, risadas e memórias longe das telas.",
                price: "R$ 69,90",
                image: achadinhoFamilia,
                path: "/indicacoes/jogos-em-familia",
              },
            ].map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <Link to={item.path} className="block cursor-pointer group">
                  <div className="aspect-square bg-secondary rounded-xl mb-3 flex items-center justify-center text-3xl overflow-hidden">
                    {"image" in item ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      "🧸"
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-sm text-foreground transition-colors group-hover:text-primary">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{item.age}</p>
                </Link>
                {"path" in item ? (
                  <Link to={item.path}>
                    <Button size="sm" variant="outline" className="mt-3 rounded-full font-heading text-xs w-full border-primary/30 text-foreground hover:bg-primary/10">
                      Ver recomendações
                    </Button>
                  </Link>
                ) : (
                  <Button size="sm" variant="outline" className="mt-3 rounded-full font-heading text-xs w-full border-primary/30 text-foreground hover:bg-primary/10">
                    Ver recomendações
                  </Button>
                )}
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
          <SectionTitle title="Loja Flavinha" subtitle="Atividades prontas para imprimir, brincar e aprender - em casa ou na escola." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Kit Cartão Criativo Dia dos Pai", price: "R$ 14,99", img: cartaoDiaDosPais, href: "https://www.mundoflavinha.com/dia-dos-pais" },
              {
                name: "Cartões de Alto Contraste para Bebês",
                price: "Um kit imprimível para estimular os primeiros olhares do bebê, sem telas e com muito carinho.",
                img: monocromaticoProduto,
                path: "/loja/cartoes-alto-contraste-bebes",
              },
              { name: "Desafio Desconectar para Conectar", price: "R$ 27,00", emoji: "🌟" },
              { name: "Atividades Sensoriais", price: "R$ 37,00", emoji: "🎨" },
            ].map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] bg-lilac/20 rounded-xl mb-3 flex items-center justify-center text-4xl overflow-hidden">
                  {"img" in item ? (
                    <img src={item.img} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    item.emoji
                  )}
                </div>
                <h3 className="font-heading font-bold text-sm text-foreground">{item.name}</h3>
                <p className="text-primary font-bold mt-1">{item.price}</p>
                {"href" in item ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="mt-3 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-xs w-full">
                      Conhecer material
                    </Button>
                  </a>
                ) : "path" in item ? (
                  <Link to={item.path}>
                    <Button size="sm" className="mt-3 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-xs w-full">
                      Conhecer material
                    </Button>
                  </Link>
                ) : (
                  <Button size="sm" className="mt-3 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-xs w-full">
                    Conhecer material
                  </Button>
                )}
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
              { title: "Dei R$20 para cada filho meu no shopping e o que aconteceu me fez pensar!", category: "Reflexão", img: vinteReais, href: "/blog/20-reais-shopping" },
              { title: "Eu tinha prometido para mim mesma que NÃO iria comprar o álbum da Copa.", category: "Reflexão", img: albumDaCopa, href: "/blog/album-da-copa" },
              { title: "No carro da minha infância não existia tela. Existia conversa.", category: "Reflexão", img: brincadeiraNoCarro, href: "/blog/brincadeira-no-carro" },
              { title: "O dia em que meus filhos criaram uma lojinha no prédio.", category: "Reflexão", img: empreendedorismoInfantil, href: "/blog/empreendedorismo-infantil" },
            ].map((post) => (
              <Link to={post.href} key={post.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-mint/20">
                    <img src={post.img} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
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
          <div className="mt-8 text-center">
            <Link to="/blog">
              <Button variant="outline" className="rounded-full font-heading font-bold border-primary/30 text-foreground hover:bg-primary/10 gap-2">
                Leia mais <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
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
