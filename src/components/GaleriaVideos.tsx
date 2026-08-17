import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, ArrowRight, Calendar, Play } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { ChannelVideo, ChannelVideosResult } from "@/lib/youtube";
import { pedirMidiaExterna, podeCarregarMidiaExterna } from "@/lib/consentimentoMidia";

/**
 * Ilha da galeria de /videos. O resto da página (banner, <head>) é estático.
 *
 * A lista continua vindo do navegador, e não do build, por decisão explícita:
 * o canal publica duas vezes por semana, e gerar no build congelaria a lista
 * entre deploys, exigiria a YOUTUBE_API_KEY no CI e faria uma instabilidade da
 * API do YouTube quebrar o build inteiro. O custo aceito é que esta listagem
 * não aparece para crawler sem JS — aceitável por ser uma página de listagem.
 *
 * Saiu o @tanstack/react-query (~13 kB gzip para uma única query). Com ele
 * foram embora retry automático e cache de 30 min; em troca, `api/videos.ts`
 * responde com `s-maxage=1800`, então o cache passa a ser da CDN, e não de cada
 * aba aberta. O que NÃO pode sumir junto é a validação: react-query não
 * validava nada, e o tipo TypeScript some em runtime — JSON vindo da rede é
 * dado não confiável e precisa ser conferido de verdade.
 */

const formatarData = (valor: string) => {
  const data = new Date(valor);
  // Data inválida derrubaria a ilha inteira dentro do Intl. Um card sem data é
  // um problema pequeno; a página em branco é um problema grande.
  if (Number.isNaN(data.getTime())) return "";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(data);
};

/** IDs do YouTube são 11 caracteres de base64url. */
const ID_VALIDO = /^[A-Za-z0-9_-]{11}$/;

/**
 * O `embedUrl` e o `thumbnailUrl` são DERIVADOS do id, nunca lidos da resposta.
 *
 * A versão anterior aceitava `embedUrl` como veio da API, exigindo apenas que
 * fosse string. Uma resposta comprometida — ou um bug no fetcher — colocaria um
 * iframe de host arbitrário dentro da página, com a credibilidade do nosso
 * domínio. O id passa por um formato estreito e o resto é montado aqui.
 */
const urlDoEmbed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}`;
const urlDaMiniatura = (id: string) => `/api/thumb?id=${encodeURIComponent(id)}`;

const ehVideo = (valor: unknown): valor is ChannelVideo => {
  if (typeof valor !== "object" || valor === null) return false;
  const v = valor as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    ID_VALIDO.test(v.id) &&
    typeof v.title === "string" &&
    typeof v.publishedAt === "string" &&
    Array.isArray(v.categories) &&
    v.categories.every((c) => typeof c === "string")
  );
};

const ehResposta = (valor: unknown): valor is ChannelVideosResult => {
  if (typeof valor !== "object" || valor === null) return false;
  const v = valor as Record<string, unknown>;
  return (
    Array.isArray(v.videos) &&
    v.videos.every(ehVideo) &&
    Array.isArray(v.categories) &&
    v.categories.every((c) => typeof c === "string")
  );
};

const Esqueleto = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 9 }).map((_, index) => (
      <div key={index} className="bg-card rounded-2xl overflow-hidden shadow-sm">
        <Skeleton className="aspect-square rounded-none" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </div>
    ))}
  </div>
);

const GaleriaVideos = () => {
  const [dados, setDados] = useState<ChannelVideosResult | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [videoSelecionado, setVideoSelecionado] = useState<ChannelVideo | null>(null);
  const acionador = useRef<HTMLElement | null>(null);
  const conteudo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controle = new AbortController();

    fetch("/api/videos", { signal: controle.signal })
      .then(async (resposta) => {
        if (!resposta.ok) throw new Error("Não foi possível carregar os vídeos do YouTube.");
        const json: unknown = await resposta.json();
        if (!ehResposta(json)) throw new Error("A resposta do servidor veio em formato inesperado.");
        return json;
      })
      .then((json) => {
        setDados(json);
        setCarregando(false);
      })
      .catch((causa: unknown) => {
        if (causa instanceof DOMException && causa.name === "AbortError") return;
        setErro(causa instanceof Error ? causa.message : "Não foi possível carregar os vídeos do YouTube.");
        setCarregando(false);
      });

    return () => controle.abort();
  }, []);

  const videosFiltrados = useMemo(() => {
    if (!dados?.videos) return [];
    if (categoriaAtiva === "Todos") return dados.videos;
    return dados.videos.filter((video) => video.categories.includes(categoriaAtiva));
  }, [categoriaAtiva, dados?.videos]);

  // O iframe daqui é criado pelo React, então um gerenciador global de iframes
  // não o alcançaria: a checagem tem que acontecer neste caminho também, ou o
  // /videos viraria a porta dos fundos do bloqueio prévio.
  const abrirVideo = async (video: ChannelVideo, evento: React.MouseEvent<HTMLElement>) => {
    acionador.current = evento.currentTarget;
    if (!podeCarregarMidiaExterna()) {
      const resposta = await pedirMidiaExterna();
      if (resposta !== "autorizado") return;
    }
    setVideoSelecionado(video);
  };

  const aoFechar = (aberto: boolean) => {
    if (aberto) return;
    setVideoSelecionado(null);
    const alvo = acionador.current;
    acionador.current = null;
    if (alvo?.isConnected) requestAnimationFrame(() => alvo.focus());
  };

  return (
    <>
      {carregando && <Esqueleto />}

      {erro && (
        <div role="alert" className="max-w-2xl mx-auto rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
          <AlertCircle className="w-10 h-10 text-primary mx-auto mb-3" />
          <h2 className="font-heading font-bold text-xl text-foreground">Não foi possível carregar os vídeos</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{erro}</p>
        </div>
      )}

      {!carregando && !erro && dados && (
        <>
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {dados.categories.map((categoria) => (
              <button
                key={categoria}
                type="button"
                onClick={() => setCategoriaAtiva(categoria)}
                aria-pressed={categoriaAtiva === categoria}
                className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors ${
                  categoriaAtiva === categoria
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>

          {videosFiltrados.length > 0 ? (
            <div aria-live="polite" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videosFiltrados.map((video) => (
                <article
                  key={video.id}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={(evento) => abrirVideo(video, evento)}
                    className="block w-full text-left"
                    aria-label={`Assistir ${video.title}`}
                  >
                    <div className="relative aspect-video overflow-hidden bg-foreground/5">
                      <img
                        src={urlDaMiniatura(video.id)}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-foreground/10 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-primary-foreground/90 flex items-center justify-center shadow-sm">
                          <Play className="w-7 h-7 text-primary ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-1.5">
                        {(video.categories.length ? video.categories : ["Mundo Flavinha"])
                          .slice(0, 2)
                          .map((categoria) => (
                            <span key={categoria} className="text-xs font-heading font-semibold text-primary">
                              {categoria}
                            </span>
                          ))}
                      </div>
                      <h3 className="font-heading font-bold text-sm text-foreground mt-1 leading-snug">
                        {video.title}
                      </h3>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatarData(video.publishedAt)}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-primary/30 px-3 py-1.5 text-xs font-heading text-foreground">
                        Assistir aqui <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
              <h2 className="font-heading font-bold text-xl text-foreground">Nenhum vídeo nessa playlist</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Escolha outra categoria para ver os vídeos disponíveis.
              </p>
            </div>
          )}
        </>
      )}

      <Dialog open={Boolean(videoSelecionado)} onOpenChange={aoFechar}>
        <DialogContent
          ref={conteudo}
          // Sem isto, o Radix foca o primeiro elemento focável do diálogo — que
          // aqui é o <iframe> do YouTube. Foco dentro de um iframe de outra
          // origem entrega TODO o teclado ao documento do YouTube: o Escape
          // nunca chega ao Radix e quem abriu um vídeo fica preso, só saindo
          // pelo mouse. Focar o próprio contêiner (que é rotulado pelo título)
          // mantém o teclado do nosso lado e anuncia o vídeo ao leitor de tela.
          onOpenAutoFocus={(evento) => {
            evento.preventDefault();
            conteudo.current?.focus();
          }}
          className="max-w-5xl border-0 bg-background p-0 overflow-hidden"
        >
          {videoSelecionado && (
            <>
              <div className="aspect-video w-full bg-black">
                {/* Montado só quando há vídeo selecionado, e desmontado ao
                    fechar: nenhum contato com o YouTube antes do clique. O
                    embedUrl já vem como youtube-nocookie.com de
                    src/lib/youtubeFetcher.ts. */}
                <iframe
                  key={videoSelecionado.id}
                  src={`${urlDoEmbed(videoSelecionado.id)}?autoplay=1&rel=0`}
                  title={videoSelecionado.title}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <DialogHeader className="p-5">
                <DialogTitle className="font-heading text-xl font-bold leading-tight text-foreground">
                  {videoSelecionado.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatarData(videoSelecionado.publishedAt)}
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GaleriaVideos;
