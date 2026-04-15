import { Link } from "react-router-dom";
import { Heart, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import aboutFamily from "@/assets/about-family.jpg";
import heroFamily from "@/assets/hero-family.jpg";

const values = [
  { icon: "📵", title: "Menos telas", desc: "Acreditamos que as crianças precisam de menos telas e mais presença." },
  { icon: "🎲", title: "Brincar é aprender", desc: "O brincar é a linguagem natural da infância e a melhor forma de aprender." },
  { icon: "💛", title: "Criar memórias", desc: "Cada brincadeira é uma oportunidade de criar memórias que duram para sempre." },
  { icon: "👨‍👩‍👧‍👦", title: "Aproximar famílias", desc: "Queremos inspirar famílias a se conectarem de verdade, com simplicidade e afeto." },
];

const Sobre = () => {
  return (
    <Layout>
      <section className="relative bg-secondary py-12 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
                Sobre o <span className="text-primary">Mundo Flavinha</span>
              </h1>
              <div className="mt-5 flex items-center gap-2">
                <span className="w-8 h-1 rounded-full bg-pink" />
                <span className="w-3 h-3 rounded-full bg-lilac" />
                <span className="w-8 h-1 rounded-full bg-baby-blue" />
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={aboutFamily} alt="Flávia com Lucas e Bárbara" className="w-full h-auto object-cover" loading="lazy" width={1280} height={720} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <div className="prose prose-lg mx-auto text-foreground/80">
            <p className="text-lg leading-relaxed">
              O <strong className="text-foreground">Mundo Flavinha</strong> nasceu do desejo de uma mãe de oferecer mais conexão, mais brincadeira e mais presença na vida dos seus filhos.
            </p>
            <p className="leading-relaxed">
              Sou Flávia, mãe do Lucas e da Bárbara. Quando me tornei mãe, percebi que o mundo corria cada vez mais rápido, e que as telas estavam ocupando um espaço enorme na vida das crianças — e na nossa também.
            </p>
            <p className="leading-relaxed">
              Foi então que decidi transformar o nosso dia a dia em um laboratório de brincadeiras, descobertas e momentos simples, mas cheios de significado. O que começou em casa virou conteúdo, virou comunidade, virou o Mundo Flavinha.
            </p>
            <p className="leading-relaxed">
              Aqui, você vai encontrar brincadeiras para todas as idades, materiais para download, vídeos, dicas e muita inspiração para criar memórias afetivas com seus filhos. Porque acredito que infância é coisa séria — e merece ser vivida com mais presença e menos telas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-secondary/50">
        <div className="container">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-center text-foreground mb-8">
            Nossos valores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card rounded-2xl p-6 text-center shadow-sm">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-heading font-bold text-foreground">{v.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container text-center">
          <Heart className="w-10 h-10 text-pink mx-auto mb-4" />
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">Explore o Mundo Flavinha</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Descubra brincadeiras, baixe materiais gratuitos, assista vídeos e encontre tudo que você precisa para brincar mais em família.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/brincadeiras">
              <Button className="rounded-full bg-primary text-primary-foreground font-heading font-bold gap-2">
                <Star className="w-4 h-4" /> Ver brincadeiras
              </Button>
            </Link>
            <Link to="/downloads">
              <Button variant="outline" className="rounded-full font-heading font-bold border-primary/30 text-foreground gap-2">
                Baixar materiais <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
