import { Link } from "react-router-dom";
import {
  ArrowRight,
  Baby,
  Check,
  ChevronDown,
  Eye,
  Heart,
  Layers,
  Printer,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import babyCards01 from "@/assets/loja flavinha/01 monocromatico.webp";
import babyCards02 from "@/assets/loja flavinha/02 monocromatico.webp";
import preview01 from "@/assets/loja flavinha/monocromatico01.webp";
import preview02 from "@/assets/loja flavinha/monocromatico02.webp";
import preview03 from "@/assets/loja flavinha/monocromatico03.webp";
import preview04 from "@/assets/loja flavinha/monocromatico04.webp";

const checkoutUrl = "#comprar";

const benefits = [
  {
    title: "Estimula o olhar",
    text: "Ajuda o bebê a observar formas simples, contrastantes e marcantes.",
    icon: Eye,
  },
  {
    title: "Favorece a atenção",
    text: "Pequenos momentos de observação ajudam o bebê a manter o foco visual por alguns segundos.",
    icon: Sparkles,
  },
  {
    title: "Fortalece o vínculo",
    text: "O adulto mostra o cartão, conversa, sorri e transforma o estímulo em um momento de conexão.",
    icon: Heart,
  },
];

const kitItems = [
  ["PDF com 6 cartões por folha", "Versão econômica para imprimir, recortar e plastificar."],
  ["PDF com 1 cartão por folha", "Versão ampliada, ideal para tummy time, parede, trocador ou tapetinho."],
  ["Cartões individuais", "Arquivos separados para imprimir apenas os modelos que quiser."],
  ["Guia de uso para os pais", "Explicação simples sobre como apresentar os cartões ao bebê."],
  ["Orientação por idade", "Sugestões de uso para diferentes fases do bebê, com orientações simples e práticas."],
  ["Sugestões de atividades", "Ideias para usar no colo, no trocador, no carrinho, no tapetinho e no tummy time."],
  ["Cuidados de segurança", "Orientações importantes para usar o material com tranquilidade."],
  ["Bônus checklist de uso", "Uma página para acompanhar quais cartões chamaram mais atenção do bebê."],
];

const steps = [
  "Imprima os cartões em casa ou em uma gráfica.",
  "Recorte e, se quiser, plastifique para durar mais.",
  "Mostre um cartão por vez, a uma distância confortável do rosto do bebê.",
  "Observe a reação do bebê e respeite o tempo dele.",
  "Use em momentos simples da rotina, como no trocador, no tapetinho, no colo ou no tummy time.",
];

const phases = [
  ["0 a 2 meses", "Primeiros estímulos visuais com cartões parados e formas simples."],
  ["2 a 4 meses", "Momentos de observação e acompanhamento visual."],
  ["4 a 6 meses", "Uso no tummy time e na rotina de estímulos."],
  ["6 meses ou mais", "Exploração dos cartões com supervisão."],
];

const desireItems = [
  "Fácil de imprimir",
  "Pronto para usar",
  "Sem telas",
  "Econômico",
  "Pode ser usado em diferentes momentos da rotina",
  "Ideal para os primeiros meses do bebê",
  "Ajuda a criar momentos de conexão",
];

const audienceItems = [
  "Mães e pais de bebês de 0 a 6 meses",
  "Famílias que buscam atividades sem telas",
  "Cuidadores e berçaristas",
  "Professoras de berçário",
  "Gestantes que querem preparar estímulos para a chegada do bebê",
  "Quem procura um presente simples, útil e afetivo para recém-nascidos",
];

const bonuses = [
  ["Checklist de uso dos cartões", "Uma página para acompanhar quais cartões o bebê observou e quais chamaram mais atenção."],
  ["Mini guia de estímulos sem telas", "Ideias simples para estimular o bebê no dia a dia com presença, carinho e recursos acessíveis."],
  ["Capinha imprimível para guardar os cartões", "Uma opção prática para organizar os cartões depois de imprimir e recortar."],
];

const faqs = [
  ["O produto é físico ou digital?", "É um produto digital. Você recebe os arquivos para imprimir em casa ou em uma gráfica."],
  ["Preciso imprimir colorido?", "Não. Os cartões são em preto e branco, pensados justamente para alto contraste."],
  ["Para qual idade é indicado?", "É indicado principalmente para bebês de 0 a 6 meses, mas também pode ser usado com bebês maiores, sempre com supervisão."],
  ["Posso plastificar?", "Sim. Plastificar ajuda a aumentar a durabilidade dos cartões."],
  ["Posso deixar no berço?", "Os cartões devem ser usados sempre com supervisão. Não é recomendado deixar objetos soltos no berço durante o sono."],
  ["Recebo o material na hora?", "Sim. Após a confirmação da compra, o acesso ao material digital é liberado pela plataforma."],
];

const SectionHeading = ({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) => (
  <div className="mx-auto mb-8 max-w-3xl text-center">
    {eyebrow && (
      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-heading font-bold text-primary">
        <Sparkles className="h-4 w-4" />
        {eyebrow}
      </span>
    )}
    <h2 className="mt-3 font-heading text-2xl font-bold leading-tight text-foreground md:text-4xl">{title}</h2>
    {text && <p className="mt-4 text-muted-foreground leading-relaxed">{text}</p>}
  </div>
);

const CheckoutButton = ({ children, variant = "primary" }: { children: string; variant?: "primary" | "secondary" }) => (
  <a href={checkoutUrl}>
    <Button
      className={
        variant === "primary"
          ? "rounded-full bg-primary px-6 font-heading font-bold text-primary-foreground shadow-sm"
          : "rounded-full border-primary/30 font-heading font-bold text-foreground hover:bg-primary/10"
      }
      variant={variant === "primary" ? "default" : "outline"}
    >
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </a>
);

const ProtectedPreview = () => (
  <div className="grid grid-cols-2 gap-3">
    {[preview01, preview02, preview03, preview04].map((preview, index) => (
      <div key={preview} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-sm">
        <img
          src={preview}
          alt={`Prévia parcial dos cartões ${index + 1}`}
          className="h-full w-full scale-110 object-cover opacity-45 blur-[1px]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/45 to-lilac/40" />
        <div className="absolute left-1/2 top-1/2 w-[150%] -translate-x-1/2 -translate-y-1/2 -rotate-12 bg-primary/80 py-2 text-center font-heading text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground">
          Prévia
        </div>
      </div>
    ))}
  </div>
);

const CartoesAltoContraste = () => {
  return (
    <Layout>
      <section className="overflow-hidden bg-[hsl(32,70%,97%)] py-10 md:py-16">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-lilac/30 px-4 py-2 text-sm font-heading font-bold text-foreground">
                <Baby className="h-4 w-4 text-primary" />
                Imprima e use
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground md:text-6xl">
                Cartões de Alto Contraste para Bebês
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Um kit imprimível para estimular os primeiros olhares do bebê de forma simples, segura, afetiva e sem telas.
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                Nos primeiros meses de vida, o bebê ainda está descobrindo o mundo através do olhar. Imagens em preto e branco,
                com formas simples e alto contraste, ajudam a chamar a atenção visual do bebê e transformam pequenos momentos
                da rotina em oportunidades de estímulo, conexão e carinho.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CheckoutButton>Quero os cartões para o meu bebê</CheckoutButton>
                <a href="#kit">
                  <Button variant="outline" className="rounded-full border-primary/30 font-heading font-bold text-foreground hover:bg-primary/10">
                    Ver o que vem no kit
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-pastel-yellow/60" />
              <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-full bg-pink/30" />
              <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-xl">
                <img src={babyCards02} alt="Bebê observando cartões de alto contraste" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <SectionHeading
            title="Por que esses cartões chamam tanto a atenção dos bebês?"
            text="Nos primeiros meses, a visão do bebê ainda está em desenvolvimento. Por isso, figuras muito coloridas, pequenas ou cheias de detalhes podem não chamar tanta atenção. Já as imagens em preto e branco, com formas grandes e bem definidas, são mais fáceis de perceber e observar."
          />
          <p className="mx-auto mb-8 max-w-3xl text-center leading-relaxed text-muted-foreground">
            Esses cartões foram pensados para criar pequenos momentos de estímulo visual na rotina do bebê, sem excesso de informação,
            sem telas e sem complicação.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="rounded-3xl bg-card p-6 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-lilac/10 py-12 md:py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-lg">
              <img src={babyCards01} alt="Bebê interagindo com cartões de alto contraste" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Um estímulo simples que cabe na rotina</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Você não precisa de brinquedos caros, aparelhos eletrônicos ou atividades complicadas para estimular o seu bebê.
                Às vezes, um recurso simples, apresentado com carinho e presença, já transforma o momento do trocador, do tapetinho
                ou do colo em uma oportunidade de desenvolvimento.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Os cartões de alto contraste são práticos, acessíveis e fáceis de usar. Basta imprimir, recortar e apresentar ao bebê
                por poucos minutos, sempre com supervisão e respeitando o tempo dele.
              </p>
              <div className="mt-6">
                <CheckoutButton>Quero estimular sem telas</CheckoutButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="kit" className="py-12 md:py-16">
        <div className="container">
          <SectionHeading eyebrow="Material digital" title="O que você recebe ao comprar" />
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div className="grid gap-4 sm:grid-cols-2">
              {kitItems.map(([title, text], index) => (
                <div key={title} className="rounded-3xl bg-card p-5 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-pastel-yellow/60 font-heading font-bold text-foreground">
                    {index + 1}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
            <div className="rounded-[2rem] bg-lilac/10 p-4 shadow-sm">
              <ProtectedPreview />
              <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
                Prévia parcial do material. O conteúdo completo é liberado após a compra.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-12 md:py-16">
        <div className="container">
          <SectionHeading title="Como usar os cartões com o bebê" />
          <div className="grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step} className="rounded-3xl bg-card p-5 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-6 max-w-3xl rounded-3xl bg-white p-5 text-center text-sm font-medium text-foreground shadow-sm">
            Use sempre com supervisão de um adulto. Não deixe cartões soltos no berço durante o sono.
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <SectionHeading
            title="Você também recebe orientação por fase do bebê"
            text="Dentro do kit, você encontra um guia simples explicando como usar os cartões de acordo com a fase do bebê - desde os primeiros olhares até momentos de tummy time e exploração com supervisão."
          />
          <div className="grid gap-5 md:grid-cols-4">
            {phases.map(([title, text]) => (
              <div key={title} className="rounded-3xl bg-card p-5 text-center shadow-sm">
                <h3 className="font-heading text-lg font-bold text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center font-heading text-lg font-bold text-foreground">
            O passo a passo completo fica dentro do material, para você usar com segurança e tranquilidade no dia a dia.
          </p>
        </div>
      </section>

      <section className="bg-[hsl(32,70%,97%)] py-12 md:py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                Para mães que querem estimular sem complicar
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Esse kit é para você que deseja oferecer estímulos ao seu bebê, mas não quer depender de telas, brinquedos caros
                ou atividades difíceis de preparar.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                É um material pronto, imprimível e fácil de usar, pensado para mães, pais, cuidadores, berçaristas e famílias
                que querem criar momentos de desenvolvimento com leveza, presença e afeto.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {desireItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <SectionHeading title="Esse kit é ideal para:" />
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {audienceItems.map((item) => (
              <div key={item} className="rounded-3xl bg-card p-5 shadow-sm">
                <Check className="mb-3 h-5 w-5 text-primary" />
                <p className="font-medium leading-relaxed text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pink/10 py-12 md:py-16">
        <div className="container">
          <SectionHeading
            eyebrow="Extras"
            title="Bônus especiais"
            text="Além dos cartões, você recebe materiais extras para organizar o uso e aproveitar melhor cada momento com o bebê."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {bonuses.map(([title, text]) => (
              <div key={title} className="rounded-3xl bg-white p-6 shadow-sm">
                <Layers className="mb-4 h-7 w-7 text-primary" />
                <h3 className="font-heading text-xl font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="comprar" className="py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-primary p-8 text-center text-primary-foreground shadow-lg md:p-12">
            <Printer className="mx-auto mb-4 h-10 w-10" />
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Comece hoje a estimular os primeiros olhares do seu bebê
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed opacity-95">
              Com o Kit Cartões de Alto Contraste para Bebês, você imprime, recorta e já pode usar em momentos simples da rotina.
              Um recurso delicado, acessível e sem telas para estimular, encantar e criar conexão com o bebê.
            </p>
            <div className="mt-6">
              <Button className="rounded-full bg-white px-8 font-heading font-bold text-primary hover:bg-white/90">
                Quero comprar agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="mt-3 text-xs opacity-90">
              Compra segura pela Hotmart. Acesso imediato ao material digital após a confirmação do pagamento.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-12 md:py-16">
        <div className="container">
          <SectionHeading title="Perguntas frequentes" />
          <div className="mx-auto max-w-4xl space-y-4">
            {faqs.map(([question, answer]) => (
              <div key={question} className="rounded-3xl bg-card p-5 shadow-sm">
                <h3 className="font-heading text-lg font-bold text-foreground">{question}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <ShieldCheck className="mx-auto mb-3 h-8 w-8 text-primary" />
            <h2 className="font-heading text-2xl font-bold text-foreground">Mundo Flavinha</h2>
            <p className="mt-2 text-muted-foreground">Brincadeiras, desenvolvimento e memórias afetivas para a infância.</p>
            <Link to="/loja">
              <Button variant="ghost" className="mt-4 rounded-full font-heading font-bold text-foreground">
                Voltar para a loja
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CartoesAltoContraste;
