import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CalendarDays,
  Clock,
  Heart,
  Link2,
  Mail,
  MessageCircle,
  Play,
  Send,
  Tag,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import vinteReais from "@/assets/Artigo/20-reais-para-meus-filhos.png";
import albumDaCopa from "@/assets/Artigo/Album-da-Copa.png";
import momentosNatacao from "@/assets/Artigo/Momentos-Natação.png";
import empreendedorismoInfantil from "@/assets/Artigo/Empreendedorismo-Infantil.png";
import flaviaGuimaraes from "@/assets/Flavia-Guimaraes.png";

const articleUrl = "https://mundoflavinha.com/blog/20-reais-shopping";
const articleTitle = "Dei R$20 para cada filho meu no shopping e o que aconteceu me fez pensar!";

const tags = [
  "Educação Financeira Infantil",
  "Maternidade",
  "Infância",
  "Consumo Consciente",
  "Dinheiro",
  "Filhos",
  "Escolhas",
  "Autonomia Infantil",
  "Shopping com Crianças",
  "Mundo Flavinha",
];

const relatedPosts = [
  {
    title: "O dia em que meus filhos criaram uma lojinha no prédio.",
    category: "Reflexão",
    image: empreendedorismoInfantil,
    href: "/blog/empreendedorismo-infantil",
  },
  {
    title: "Presença se constrói nos pequenos momentos.",
    category: "Reflexão",
    image: momentosNatacao,
    href: "/blog/presenca-pequenos-momentos",
  },
  {
    title: "Eu tinha prometido para mim mesma que NÃO iria comprar o álbum da Copa.",
    category: "Reflexão",
    image: albumDaCopa,
    href: "/blog/album-da-copa",
  },
];

const articleParagraphs = [
  "Fui ao shopping com uma proposta simples: dar R$20 para cada um dos meus filhos e deixar que eles escolhessem o que quisessem.",
  "Parece pouco...",
  "Mas às vezes, é no pouco que a gente ensina o que realmente importa.",
  "Assim que entramos na loja de brinquedos, os olhos brilharam. Eles foram direto nos brinquedos que mais gostaram.",
  "O problema? Nada custava R$20.",
  "Foi aí que comecei a provocar: “Vocês podem juntar o dinheiro e comprar algo juntos...” Ou: “Guardar e comprar depois algo que realmente valha a pena...”",
  "E pronto. Começou ali uma das conversas mais importantes que já tivemos.",
  "Eles tinham gostos diferentes. Cada um queria uma coisa. E precisaram negociar, ceder e pensar antes de decidir.",
  "E foi justamente nesse momento que algo me surpreendeu.",
  "Vale assistir, porque a reação deles diz muito mais do que qualquer teoria sobre educação financeira.",
  "O que essa experiência me mostrou: a gente fala muito sobre ensinar os filhos. Mas, na prática, quantas vezes a gente realmente deixa eles vivenciarem a decisão?",
  "Educação financeira não é sobre falar. É sobre sentir. Sentir que não dá pra ter tudo. Sentir que precisa escolher. Sentir que esperar pode ser melhor. E, principalmente, sentir que dinheiro não é só gastar.",
  "Dinheiro não é infinito. Eles precisam entender que existe limite. E isso não é frustração, é aprendizado.",
  "Nem todo desejo precisa virar compra. A vontade passa. O dinheiro, não volta.",
  "Esperar também é uma escolha inteligente. Guardar hoje pode significar algo muito melhor amanhã.",
  "E pra gente, como pais, essa experiência também é sobre nós.",
  "Porque é muito mais fácil comprar logo, evitar o choro e resolver rápido.",
  "Mas ensinar dá trabalho. E, muitas vezes, exige que a gente aguente o desconforto do momento pra construir algo maior lá na frente.",
  "No final, a decisão deles me fez refletir muito mais do que eu imaginava. E talvez vá te fazer pensar também.",
  "O que seu filho faria com R$20 hoje?",
  "Você já passou por uma situação assim com seus filhos?",
];

const shareLinks = [
  {
    label: "WhatsApp",
    icon: MessageCircle,
    href: `https://wa.me/?text=${encodeURIComponent(`${articleTitle} ${articleUrl}`)}`,
  },
  {
    label: "Facebook",
    icon: Send,
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
  },
  {
    label: "Instagram",
    icon: Heart,
    href: "https://www.instagram.com/",
  },
  {
    label: "Copiar link",
    icon: Link2,
    href: articleUrl,
  },
];

const ShareButtons = ({ compact = false }: { compact?: boolean }) => (
  <div className="flex flex-wrap items-center gap-2">
    {shareLinks.map((item) => {
      const Icon = item.icon;

      return (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className={`inline-flex items-center justify-center rounded-full border border-primary/20 bg-card text-primary transition-colors hover:bg-primary hover:text-primary-foreground ${
            compact ? "h-9 w-9" : "h-10 w-10"
          }`}
        >
          <Icon className="h-4 w-4" />
        </a>
      );
    })}
  </div>
);

const Artigo20ReaisShopping = () => {
  return (
    <Layout>
      <article className="bg-background">
        <section className="py-8 md:py-12">
          <div className="container">
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Início</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-primary">Blog</Link>
              <span>/</span>
              <span className="text-primary">Reflexão</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-center">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-lilac/20 px-4 py-2 text-xs font-heading font-bold uppercase tracking-wide text-primary">
                    <Heart className="h-4 w-4" />
                    Reflexão
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-baby-blue/25 px-4 py-2 text-sm font-semibold text-foreground/70">
                    <Clock className="h-4 w-4 text-primary" />
                    4 min de leitura
                  </span>
                </div>

                <h1 className="max-w-3xl font-heading text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  {articleTitle}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Uma experiência simples no shopping virou uma reflexão sobre escolhas, espera, limites e educação financeira infantil na prática.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <img src={flaviaGuimaraes} alt="Flavia Guimarães" className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-heading font-bold text-foreground">Escrito por Flavia Guimarães</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        30 de maio de 2026
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="mb-2 text-sm font-heading font-bold text-foreground">Compartilhe:</p>
                  <ShareButtons />
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img src={vinteReais} alt={articleTitle} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="min-w-0">
                <div className="mb-8 rounded-2xl bg-pastel-yellow/25 p-6 text-foreground shadow-sm">
                  <p className="font-heading text-lg font-bold text-primary">
                    "Educação financeira não é sobre falar. É sobre sentir."
                  </p>
                </div>

                <div className="prose prose-lg max-w-none text-foreground/80 prose-p:leading-relaxed prose-p:my-5 prose-strong:text-foreground">
                  {articleParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-baby-blue/40 bg-baby-blue/15 p-5">
                  <a
                    href="https://youtu.be/6o3T8RqZPPo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-heading font-bold text-foreground hover:text-primary"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Play className="h-5 w-5 fill-current" />
                    </span>
                    Ver o vídeo sobre essa experiência
                  </a>
                </div>

                <div className="mt-10">
                  <div className="mb-3 flex items-center gap-2 font-heading font-bold text-foreground">
                    <Tag className="h-5 w-5 text-primary" />
                    Assuntos
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-primary/20 bg-card px-3 py-1 text-sm text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-10 grid gap-5 rounded-2xl border border-pastel-yellow/70 bg-card p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
                  <div className="flex gap-4">
                    <img src={flaviaGuimaraes} alt="Flavia Guimarães" className="h-16 w-16 rounded-full object-cover" />
                    <div>
                      <h2 className="font-heading text-lg font-bold text-foreground">Sobre a autora</h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        Sou Flavinha, mãe do Lucas e da Bárbara, apaixonada por infância, brincadeiras e por criar memórias afetivas em família.
                      </p>
                      <Link to="/sobre" className="mt-2 inline-flex items-center gap-1 text-sm font-heading font-bold text-primary">
                        Saiba mais sobre mim <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-heading font-bold text-foreground">Gostou do artigo?</p>
                    <p className="mb-3 max-w-xs text-sm text-muted-foreground">Salve para ler depois ou compartilhe com outras famílias!</p>
                    <ShareButtons compact />
                  </div>
                </div>

                <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
                  <Link to="/blog/brincadeira-no-carro" className="group flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm transition-colors hover:bg-secondary/60">
                    <ArrowLeft className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-heading font-bold text-primary">Artigo anterior</p>
                      <p className="text-sm text-muted-foreground">No carro da minha infância não existia tela</p>
                    </div>
                  </Link>
                  <Link to="/blog" className="group flex items-center justify-end gap-3 rounded-2xl bg-card p-4 text-right shadow-sm transition-colors hover:bg-secondary/60">
                    <div>
                      <p className="text-sm font-heading font-bold text-primary">Próximo artigo</p>
                      <p className="text-sm text-muted-foreground">Ver todos os artigos</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </Link>
                </div>
              </div>

              <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-2xl border border-primary/15 bg-card p-5 shadow-sm">
                  <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-bold text-foreground">
                    <UserRound className="h-5 w-5 text-primary" />
                    Leia também
                  </h2>
                  <div className="space-y-4">
                    {relatedPosts.map((post) => (
                      <Link key={post.title} to={post.href} className="grid grid-cols-[72px_1fr] gap-3 rounded-xl p-2 transition-colors hover:bg-secondary/50">
                        <img src={post.image} alt={post.title} className="h-16 w-[72px] rounded-xl object-cover" />
                        <div>
                          <p className="text-xs font-heading font-bold text-primary">{post.category}</p>
                          <h3 className="mt-1 text-sm font-bold leading-snug text-foreground">{post.title}</h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-lilac/15 p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
                    <Mail className="h-5 w-5 text-primary" />
                    Receba conteúdos exclusivos no seu e-mail
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Atividades, dicas e histórias para uma infância com mais conexão.
                  </p>
                  <form className="mt-4 flex gap-2" onSubmit={(event) => event.preventDefault()}>
                    <Input type="email" placeholder="Seu e-mail" className="rounded-full bg-card" />
                    <Button type="submit" className="h-10 w-10 shrink-0 rounded-full bg-primary p-0 text-primary-foreground">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>

                <div className="rounded-2xl bg-mint/20 p-5 shadow-sm">
                  <h2 className="mb-3 flex items-center gap-2 font-heading text-lg font-bold text-foreground">
                    <Bookmark className="h-5 w-5 text-primary" />
                    Compartilhe
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Esse texto pode ajudar outra família a falar sobre dinheiro de forma leve.
                  </p>
                  <ShareButtons compact />
                </div>
              </aside>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default Artigo20ReaisShopping;
