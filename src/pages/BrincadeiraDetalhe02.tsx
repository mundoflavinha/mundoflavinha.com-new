import { Link, Navigate, useParams } from "react-router-dom";
import type { ReactNode } from "react";
import { ArrowLeft, Clock, Heart, ShieldAlert, Sparkles, Star } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { getBrincadeira02BySlug } from "@/data/brincadeiras02";

const DetailBlock = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="rounded-2xl bg-card p-5 shadow-sm">
    <h2 className="font-heading text-xl font-bold text-foreground">{title}</h2>
    <div className="mt-3 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

const BrincadeiraDetalhe02 = () => {
  const { slug } = useParams();
  const brincadeira = getBrincadeira02BySlug(slug);

  if (!brincadeira) {
    return <Navigate to="/brincadeiras/0-a-2-anos" replace />;
  }

  return (
    <Layout>
      <article>
        <section className="bg-secondary/50 py-8 md:py-12">
          <div className="container">
            <Link to="/brincadeiras/0-a-2-anos">
              <Button variant="ghost" className="mb-6 rounded-full font-heading font-bold gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar para brincadeiras de 0 a 2 anos
              </Button>
            </Link>

            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-heading font-bold text-primary">
                  <Sparkles className="h-4 w-4" />
                  Card {String(brincadeira.id).padStart(2, "0")}
                </span>
                <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  {brincadeira.title}
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {brincadeira.importance}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-card p-4 shadow-sm">
                    <p className="text-xs font-heading font-bold uppercase tracking-wide text-primary">Idade</p>
                    <p className="mt-1 font-heading font-bold text-foreground">{brincadeira.age}</p>
                  </div>
                  <div className="rounded-2xl bg-card p-4 shadow-sm">
                    <p className="text-xs font-heading font-bold uppercase tracking-wide text-primary">Tempo</p>
                    <p className="mt-1 font-heading font-bold text-foreground">{brincadeira.time}</p>
                  </div>
                  <div className="rounded-2xl bg-card p-4 shadow-sm">
                    <p className="text-xs font-heading font-bold uppercase tracking-wide text-primary">Bagunça</p>
                    <p className="mt-1 font-heading font-bold text-foreground">{brincadeira.mess}</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl bg-card shadow-lg">
                <img src={brincadeira.image} alt={brincadeira.title} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-6">
                <DetailBlock title="Idade recomendada">
                  <p>{brincadeira.age}</p>
                </DetailBlock>

                <DetailBlock title="Tempo de atividade">
                  <p>{brincadeira.time}</p>
                </DetailBlock>

                <DetailBlock title="Nível de bagunça">
                  <p>{brincadeira.mess}</p>
                </DetailBlock>

                <DetailBlock title="Como preparar">
                  <p>{brincadeira.prepare}</p>
                </DetailBlock>

                <DetailBlock title="Como brincar">
                  <p>{brincadeira.play}</p>
                </DetailBlock>

                <DetailBlock title="O que a criança aprende?">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {brincadeira.learns.map((item) => (
                      <li key={item} className="rounded-xl bg-secondary/60 px-3 py-2 text-sm font-medium text-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </DetailBlock>

                <DetailBlock title="Habilidades desenvolvidas">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {brincadeira.skills.map((item) => (
                      <li key={item} className="rounded-xl bg-primary/10 px-3 py-2 text-sm font-medium text-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </DetailBlock>

                <DetailBlock title="Dica da Flavinha">
                  <p>{brincadeira.flavinhaTip}</p>
                </DetailBlock>

                <DetailBlock title="Adaptação por idade">
                  <ul className="space-y-2">
                    {brincadeira.adaptation.map((item) => (
                      <li key={item} className="rounded-xl bg-secondary/60 px-3 py-2 text-sm text-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </DetailBlock>

                <DetailBlock title="Atenção dos adultos">
                  <p>{brincadeira.adultAttention}</p>
                </DetailBlock>

                <div className="rounded-2xl bg-pastel-yellow/40 p-6 text-center">
                  <p className="font-heading text-xl font-bold text-foreground">{brincadeira.finalPhrase}</p>
                </div>
              </div>

              <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-2xl bg-card p-5 shadow-sm">
                  <h2 className="font-heading text-lg font-bold text-foreground">Resumo rápido</h2>
                  <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <p className="flex gap-2">
                      <Star className="mt-0.5 h-4 w-4 text-primary" />
                      {brincadeira.age}
                    </p>
                    <p className="flex gap-2">
                      <Clock className="mt-0.5 h-4 w-4 text-primary" />
                      {brincadeira.time}
                    </p>
                    <p className="flex gap-2">
                      <ShieldAlert className="mt-0.5 h-4 w-4 text-primary" />
                      {brincadeira.mess}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-primary/10 p-5">
                  <h2 className="font-heading text-lg font-bold text-foreground">Por que vale fazer?</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{brincadeira.summary}</p>
                </div>

                <Link to="/brincadeiras/0-a-2-anos">
                  <Button className="w-full rounded-full bg-primary font-heading font-bold text-primary-foreground gap-2">
                    <Heart className="h-4 w-4" />
                    Ver outras brincadeiras
                  </Button>
                </Link>
              </aside>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default BrincadeiraDetalhe02;
