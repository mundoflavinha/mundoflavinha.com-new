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
import Layout from "@/components/Layout";
import NewsletterForm from "@/components/NewsletterForm";
import albumDaCopa from "@/assets/Artigo/Album-da-Copa.webp";
import momentosNatacao from "@/assets/Artigo/Momentos-Natação.webp";
import empreendedorismoInfantil from "@/assets/Artigo/Empreendedorismo-Infantil.webp";
import brincadeiraNoCarro from "@/assets/Artigo/brincadeira-no-carro.webp";
import flaviaGuimaraes from "@/assets/Flavia-Guimaraes.webp";

const articleUrl = "https://mundoflavinha.com/blog/album-da-copa";
const articleTitle = "Eu tinha prometido para mim mesma que NÃO iria comprar o álbum da Copa.";

const tags = [
  "álbum da copa",
  "álbum da copa 2026",
  "figurinhas da copa",
  "infância",
  "maternidade",
  "parentalidade",
  "memória afetiva",
  "consumo consciente",
  "família",
  "infância e tecnologia",
  "filhos",
  "experiências em família",
  "educação infantil",
  "copa do mundo",
  "rotina com filhos",
];

const relatedPosts = [
  {
    title: "Presença se constrói nos pequenos momentos.",
    category: "Reflexão",
    image: momentosNatacao,
    href: "/blog/presenca-pequenos-momentos",
  },
  {
    title: "O dia em que meus filhos criaram uma lojinha no prédio.",
    category: "Reflexão",
    image: empreendedorismoInfantil,
    href: "/blog/empreendedorismo-infantil",
  },
  {
    title: "No carro da minha infância não existia tela. Existia conversa.",
    category: "Reflexão",
    image: brincadeiraNoCarro,
    href: "/blog/brincadeira-no-carro",
  },
];

const articleParagraphs = [
  "Na minha cabeça, era só mais um gasto. Mais uma febre infantil. Mais uma coisa que começaria pequena e depois viraria exagero.",
  "Inclusive, no começo, pedi para ninguém comentar sobre o álbum com as crianças. O que, sinceramente, era impossível. Porque o assunto já estava em todo lugar: na escola, no bairro, entre amigos, grupos de família...",
  "E então eu lembrei de mim mesma quando era pequena. Do quanto eu amava colecionar figurinhas. Da emoção de abrir um pacotinho. Da surpresa de encontrar uma figurinha diferente. Da troca das repetidas. Da sensação de participar de algo junto com todo mundo.",
  "E percebi uma coisa: talvez a questão não seja evitar toda febre. Talvez seja ensinar como viver essas experiências com equilíbrio.",
  "Nós compramos o álbum. Mas sem neurose. Sem obsessão para completar. Sem transformar isso em consumo sem limite.",
  "A ideia é simples: abrir alguns pacotinhos, brincar, trocar figurinhas, viver o momento. Talvez um pacote essa semana. Outro na próxima. Pouco a pouco. Porque também existe aprendizado na espera.",
  "As crianças não precisam ter tudo. Mas também não precisam ficar de fora de tudo. E acho que esse é um dos desafios da parentalidade hoje: encontrar equilíbrio entre limite e pertencimento.",
  "No final, percebi que eu não estava comprando apenas figurinhas. Eu estava comprando memória afetiva.",
  "E vocês? Também viveram alguma febre de infância que hoje entendem de outro jeito como pais?",
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

const ArtigoAlbumDaCopa = () => {
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
                    3 min de leitura
                  </span>
                </div>

                <h1 className="max-w-3xl font-heading text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  {articleTitle}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Entre figurinhas repetidas, pacotinhos e memórias afetivas, entendi que o álbum da Copa vai muito além do consumo. Um texto sobre infância, equilíbrio e experiências em família.
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
                <img src={albumDaCopa} alt={articleTitle} className="h-full w-full object-cover" />
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
                    "As crianças não precisam ter tudo. Mas também não precisam ficar de fora de tudo."
                  </p>
                </div>

                <div className="prose prose-lg max-w-none text-foreground/80 prose-p:leading-relaxed prose-p:my-5 prose-strong:text-foreground">
                  {articleParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-baby-blue/40 bg-baby-blue/15 p-5">
                  <a
                    href="https://youtu.be/XbKScLm5R5U"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-heading font-bold text-foreground hover:text-primary"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Play className="h-5 w-5 fill-current" />
                    </span>
                    Assistir ao vídeo sobre esse assunto no YouTube
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
                  <Link to="/blog" className="group flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm transition-colors hover:bg-secondary/60">
                    <ArrowLeft className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-heading font-bold text-primary">Artigo anterior</p>
                      <p className="text-sm text-muted-foreground">Voltar para todos os artigos</p>
                    </div>
                  </Link>
                  <Link to="/blog/presenca-pequenos-momentos" className="group flex items-center justify-end gap-3 rounded-2xl bg-card p-4 text-right shadow-sm transition-colors hover:bg-secondary/60">
                    <div>
                      <p className="text-sm font-heading font-bold text-primary">Próximo artigo</p>
                      <p className="text-sm text-muted-foreground">Presença se constrói nos pequenos momentos</p>
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
                  <NewsletterForm />
                </div>

                <div className="rounded-2xl bg-mint/20 p-5 shadow-sm">
                  <h2 className="mb-3 flex items-center gap-2 font-heading text-lg font-bold text-foreground">
                    <Bookmark className="h-5 w-5 text-primary" />
                    Compartilhe
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Esse texto pode ajudar outra família a encontrar equilíbrio também.
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

export default ArtigoAlbumDaCopa;
