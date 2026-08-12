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
import albumDaCopa from "@/assets/Artigo/Album-da-Copa.png";
import momentosNatacao from "@/assets/Artigo/Momentos-Natação.png";
import empreendedorismoInfantil from "@/assets/Artigo/Empreendedorismo-Infantil.png";
import brincadeiraNoCarro from "@/assets/Artigo/brincadeira-no-carro.png";
import flaviaGuimaraes from "@/assets/Flavia-Guimaraes.png";

const articleUrl = "https://mundoflavinha.com/blog/empreendedorismo-infantil";
const articleTitle = "O dia em que meus filhos criaram uma lojinha no prédio";

const tags = [
  "Empreendedorismo Infantil",
  "Educação Financeira Infantil",
  "Criatividade Infantil",
  "Brincar",
  "Autonomia Infantil",
  "Crianças Empreendedoras",
  "Brincadeiras Sem Telas",
  "Infância",
  "Mundo Flavinha",
];

const relatedPosts = [
  {
    title: "Eu tinha prometido para mim mesma que NÃO iria comprar o álbum da Copa.",
    category: "Reflexão",
    image: albumDaCopa,
    href: "/blog/album-da-copa",
  },
  {
    title: "Presença se constrói nos pequenos momentos.",
    category: "Reflexão",
    image: momentosNatacao,
    href: "/blog/presenca-pequenos-momentos",
  },
  {
    title: "No carro da minha infância não existia tela. Existia conversa.",
    category: "Reflexão",
    image: brincadeiraNoCarro,
    href: "/blog/brincadeira-no-carro",
  },
];

const articleParagraphs = [
  "Eu sempre incentivei meus filhos a brincarem, pintarem, criarem, inventarem histórias, construírem coisas com as próprias mãos, descobrirem o mundo além das telas.",
  "E sem perceber... talvez eu também estivesse ensinando sobre empreendedorismo infantil, criatividade, coragem e valor do dinheiro.",
  "Nos últimos dias, Lucas e Bárbara começaram a produzir vários squishies artesanais de papel, feitos com algodão e muita imaginação. Também criaram pacotinhos surpresa.",
  "E havia uma frase que eles repetiam o tempo todo: “Vamos vender para comprar nossa casa.”",
  "Pode parecer apenas uma brincadeira infantil. Mas não era.",
  "Ali existia: iniciativa, criatividade, desejo, construção de sonhos, entendimento sobre esforço e recompensa. E eu sempre incentivei muito isso dentro de casa.",
  "Porque acredito que educação financeira infantil não começa falando sobre investimentos. Ela começa quando a criança entende de onde o dinheiro vem, que ele exige dedicação, que projetos podem gerar resultados e que, quando algo dá errado, precisamos encontrar soluções.",
  "Então, numa tarde comum, eu resolvi descer com eles para a portaria do prédio. Eles montaram literalmente uma lojinha no hall. Espalharam os squishies e começaram a abordar os moradores que passavam.",
  "E foi uma das experiências mais lindas que vivi como mãe.",
  "As pessoas paravam, conversavam, perguntavam o que era aquilo, elogiavam, diziam que eles já eram pequenos empreendedores. Mas... ninguém comprava.",
  "E ali veio a primeira grande lição. Nem todo interesse vira venda. Nem todo elogio vira resultado.",
  "Até que Lucas abordou uma pessoa e Bárbara finalizou a venda. Eles receberam o dinheiro com um sorriso que eu nunca vou esquecer.",
  "Depois disso, Bárbara percebeu quais corredores tinham mais movimento. Mudou os produtos de lugar. Começou a testar estratégias. E vendeu mais.",
  "Lucas ficou um pouco frustrado no início. Sem entender por que ela estava conseguindo vender mais do que ele. Mas ao invés de desistir, tomou uma decisão que me deixou emocionada. Enquanto ela vendia, ele subiria para produzir mais squishies. Porque os produtos estavam acabando.",
  "Naquele momento, sem perceber, eles estavam aprendendo sobre vendas, produção, estratégia, trabalho em equipe, adaptação e solução de problemas.",
  "Tudo através do lúdico.",
  "E Bárbara não parou por aí. Insatisfeita em vender apenas para os moradores do prédio, ela decidiu ir até o portão. Começou a abordar, pela grade mesmo, as pessoas que passavam na rua. Ela vendeu para pessoas caminhando na calçada.",
  "Já estava escuro. E ela não queria ir embora até vender quase tudo. E vendeu. Subimos para casa com o dinheirinho deles nas mãos.",
  "Dinheiro conquistado por eles. Pela criatividade deles. Pela coragem deles. E aquilo vale muito mais do que a venda dos squishies. Porque crianças que aprendem desde cedo sobre criatividade, comunicação, persistência e solução de problemas desenvolvem algo que nenhuma tela consegue ensinar: autonomia.",
  "O vídeo completo dessa experiência está no canal Mundo Flavinha e ficou emocionante porque mostra exatamente isso: a importância do brincar, da criatividade, da educação financeira infantil, do empreendedorismo desde cedo e de forma leve, saudável e lúdica.",
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

const ArtigoEmpreendedorismoInfantil = () => {
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
                    5 min de leitura
                  </span>
                </div>

                <h1 className="max-w-3xl font-heading text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  {articleTitle}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Uma brincadeira com squishies de papel virou uma experiência linda sobre criatividade, educação financeira, persistência e autonomia na infância.
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
                <img src={empreendedorismoInfantil} alt={articleTitle} className="h-full w-full object-cover" />
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
                    "Tudo através do lúdico."
                  </p>
                </div>

                <div className="prose prose-lg max-w-none text-foreground/80 prose-p:leading-relaxed prose-p:my-5 prose-strong:text-foreground">
                  {articleParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-baby-blue/40 bg-baby-blue/15 p-5">
                  <a
                    href="https://youtu.be/KGDxrRAvrQM"
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
                  <Link to="/blog/presenca-pequenos-momentos" className="group flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm transition-colors hover:bg-secondary/60">
                    <ArrowLeft className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-heading font-bold text-primary">Artigo anterior</p>
                      <p className="text-sm text-muted-foreground">Presença se constrói nos pequenos momentos</p>
                    </div>
                  </Link>
                  <Link to="/blog/brincadeira-no-carro" className="group flex items-center justify-end gap-3 rounded-2xl bg-card p-4 text-right shadow-sm transition-colors hover:bg-secondary/60">
                    <div>
                      <p className="text-sm font-heading font-bold text-primary">Próximo artigo</p>
                      <p className="text-sm text-muted-foreground">No carro da minha infância não existia tela</p>
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
                    Esse texto pode inspirar outra família a olhar para o brincar com mais potência.
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

export default ArtigoEmpreendedorismoInfantil;
