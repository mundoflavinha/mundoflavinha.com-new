import { Suspense, lazy, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";

// Index e NotFound ficam estáticos de propósito: a home é a rota mais provável
// de aterrissagem (deixá-la lazy adicionaria um round-trip justamente onde mais
// importa) e o NotFound tem 0,5 kB e serve de fallback de rota.
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

// As demais rotas viram chunks separados, carregados só quando visitadas.
// Isso tira ~218 kB de páginas e ~235 kB de dados (src/data/*, importados só por
// estas páginas) do carregamento inicial.
const Brincadeiras = lazy(() => import("./pages/Brincadeiras.tsx"));
const Brincadeiras02 = lazy(() => import("./pages/Brincadeiras02.tsx"));
const BrincadeiraDetalhe02 = lazy(() => import("./pages/BrincadeiraDetalhe02.tsx"));
const Brincadeiras35 = lazy(() => import("./pages/Brincadeiras35.tsx"));
const BrincadeiraDetalhe35 = lazy(() => import("./pages/BrincadeiraDetalhe35.tsx"));
const Brincadeiras68 = lazy(() => import("./pages/Brincadeiras68.tsx"));
const BrincadeiraDetalhe68 = lazy(() => import("./pages/BrincadeiraDetalhe68.tsx"));
const BrincadeirasFamilia = lazy(() => import("./pages/BrincadeirasFamilia.tsx"));
const BrincadeiraDetalheFamilia = lazy(() => import("./pages/BrincadeiraDetalheFamilia.tsx"));
const Downloads = lazy(() => import("./pages/Downloads.tsx"));
const Videos = lazy(() => import("./pages/Videos.tsx"));
const Indicacoes = lazy(() => import("./pages/Indicacoes.tsx"));
const Achadinhos02 = lazy(() => import("./pages/Achadinhos02.tsx"));
const Achadinhos35 = lazy(() => import("./pages/Achadinhos35.tsx"));
const Achadinhos68 = lazy(() => import("./pages/Achadinhos68.tsx"));
const AchadinhosFamilia = lazy(() => import("./pages/AchadinhosFamilia.tsx"));
const Loja = lazy(() => import("./pages/Loja.tsx"));
const Infoprodutos = lazy(() => import("./pages/Infoprodutos.tsx"));
const CartoesAltoContraste = lazy(() => import("./pages/CartoesAltoContraste.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const ArtigoAlbumDaCopa = lazy(() => import("./pages/ArtigoAlbumDaCopa.tsx"));
const ArtigoPresencaPequenosMomentos = lazy(() => import("./pages/ArtigoPresencaPequenosMomentos.tsx"));
const ArtigoEmpreendedorismoInfantil = lazy(() => import("./pages/ArtigoEmpreendedorismoInfantil.tsx"));
const ArtigoBrincadeiraNoCarro = lazy(() => import("./pages/ArtigoBrincadeiraNoCarro.tsx"));
const Artigo20ReaisShopping = lazy(() => import("./pages/Artigo20ReaisShopping.tsx"));
const Sobre = lazy(() => import("./pages/Sobre.tsx"));
const PoliticaDePrivacidade = lazy(() => import("./pages/PoliticaDePrivacidade.tsx"));
const TermosDeUso = lazy(() => import("./pages/TermosDeUso.tsx"));
const Contato = lazy(() => import("./pages/Contato.tsx"));

const queryClient = new QueryClient();

/**
 * Por quanto tempo continuamos reposicionando na âncora enquanto a página
 * termina de montar. Rolar uma vez só não basta: o conteúdo cresce depois
 * (chunk lazy chegando, imagens carregando) e a âncora "escorrega".
 */
const JANELA_ANCORA_MS = 2_000;

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    // Com âncora (ex: /politica-de-privacidade#direitos-do-titular), rolar para o
    // topo destruiria o deep-link. Numa SPA o browser não resolve a âncora sozinho
    // no primeiro load, porque o elemento ainda não existe quando ele tenta.
    //
    // Com rotas lazy o elemento demora ainda mais: quando este efeito roda, o
    // chunk da página pode nem ter chegado. Adivinhar um tempo de espera é
    // frágil (varia com rede e com o compile sob demanda em dev), então a gente
    // observa o DOM e rola no instante exato em que o elemento aparece.
    const id = decodeURIComponent(hash.slice(1));
    let cancelado = false;

    const tentarRolar = () => {
      if (cancelado) return;
      document.getElementById(id)?.scrollIntoView();
    };

    // Se a pessoa rolar por conta própria, paramos de reposicionar — puxar a
    // tela de volta enquanto alguém está lendo é pior que a âncora imprecisa.
    const cederControle = () => {
      cancelado = true;
    };
    window.addEventListener("wheel", cederControle, { once: true, passive: true });
    window.addEventListener("touchstart", cederControle, { once: true, passive: true });

    tentarRolar();

    const observer = new MutationObserver(tentarRolar);
    observer.observe(document.body, { childList: true, subtree: true });

    const timeout = window.setTimeout(() => observer.disconnect(), JANELA_ANCORA_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      window.removeEventListener("wheel", cederControle);
      window.removeEventListener("touchstart", cederControle);
    };
  }, [pathname, hash]);

  return null;
};

/**
 * Fallback enquanto o chunk da rota carrega.
 *
 * `min-h-screen` de propósito: o Header/Footer moram dentro de cada página (via
 * Layout), então sem altura mínima a tela colapsaria e voltaria a crescer,
 * causando salto de layout.
 */
const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center" role="status" aria-label="Carregando">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <RouteErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/brincadeiras" element={<Brincadeiras />} />
                <Route path="/brincadeiras/0-a-2-anos" element={<Brincadeiras02 />} />
                <Route path="/brincadeiras/0-a-2-anos/:slug" element={<BrincadeiraDetalhe02 />} />
                <Route path="/brincadeiras/3-a-5-anos" element={<Brincadeiras35 />} />
                <Route path="/brincadeiras/3-a-5-anos/:slug" element={<BrincadeiraDetalhe35 />} />
                <Route path="/brincadeiras/6-a-8-anos" element={<Brincadeiras68 />} />
                <Route path="/brincadeiras/6-a-8-anos/:slug" element={<BrincadeiraDetalhe68 />} />
                <Route path="/brincadeiras/em-familia" element={<BrincadeirasFamilia />} />
                <Route path="/brincadeiras/em-familia/:slug" element={<BrincadeiraDetalheFamilia />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/indicacoes" element={<Indicacoes />} />
                <Route path="/indicacoes/0-a-2-anos" element={<Achadinhos02 />} />
                <Route path="/indicacoes/3-a-5-anos" element={<Achadinhos35 />} />
                <Route path="/indicacoes/6-a-8-anos" element={<Achadinhos68 />} />
                <Route path="/indicacoes/jogos-em-familia" element={<AchadinhosFamilia />} />
                <Route path="/loja" element={<Loja />} />
                <Route path="/loja/cartoes-alto-contraste-bebes" element={<CartoesAltoContraste />} />
                <Route path="/infoprodutos" element={<Infoprodutos />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/album-da-copa" element={<ArtigoAlbumDaCopa />} />
                <Route path="/blog/presenca-pequenos-momentos" element={<ArtigoPresencaPequenosMomentos />} />
                <Route path="/blog/empreendedorismo-infantil" element={<ArtigoEmpreendedorismoInfantil />} />
                <Route path="/blog/brincadeira-no-carro" element={<ArtigoBrincadeiraNoCarro />} />
                <Route path="/blog/20-reais-shopping" element={<Artigo20ReaisShopping />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
                <Route path="/termos-de-uso" element={<TermosDeUso />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </RouteErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
