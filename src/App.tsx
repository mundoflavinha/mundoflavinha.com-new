import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Brincadeiras from "./pages/Brincadeiras.tsx";
import Brincadeiras02 from "./pages/Brincadeiras02.tsx";
import BrincadeiraDetalhe02 from "./pages/BrincadeiraDetalhe02.tsx";
import Brincadeiras35 from "./pages/Brincadeiras35.tsx";
import BrincadeiraDetalhe35 from "./pages/BrincadeiraDetalhe35.tsx";
import Brincadeiras68 from "./pages/Brincadeiras68.tsx";
import BrincadeiraDetalhe68 from "./pages/BrincadeiraDetalhe68.tsx";
import BrincadeirasFamilia from "./pages/BrincadeirasFamilia.tsx";
import BrincadeiraDetalheFamilia from "./pages/BrincadeiraDetalheFamilia.tsx";
import Downloads from "./pages/Downloads.tsx";
import Videos from "./pages/Videos.tsx";
import Indicacoes from "./pages/Indicacoes.tsx";
import Achadinhos02 from "./pages/Achadinhos02.tsx";
import Achadinhos35 from "./pages/Achadinhos35.tsx";
import Achadinhos68 from "./pages/Achadinhos68.tsx";
import AchadinhosFamilia from "./pages/AchadinhosFamilia.tsx";
import Loja from "./pages/Loja.tsx";
import Infoprodutos from "./pages/Infoprodutos.tsx";
import CartoesAltoContraste from "./pages/CartoesAltoContraste.tsx";
import Blog from "./pages/Blog.tsx";
import ArtigoAlbumDaCopa from "./pages/ArtigoAlbumDaCopa.tsx";
import ArtigoPresencaPequenosMomentos from "./pages/ArtigoPresencaPequenosMomentos.tsx";
import ArtigoEmpreendedorismoInfantil from "./pages/ArtigoEmpreendedorismoInfantil.tsx";
import ArtigoBrincadeiraNoCarro from "./pages/ArtigoBrincadeiraNoCarro.tsx";
import Artigo20ReaisShopping from "./pages/Artigo20ReaisShopping.tsx";
import Sobre from "./pages/Sobre.tsx";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade.tsx";
import TermosDeUso from "./pages/TermosDeUso.tsx";
import Contato from "./pages/Contato.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Com âncora (ex: /politica-de-privacidade#direitos-do-titular), rolar para o
    // topo destruiria o deep-link. Numa SPA o browser não consegue resolver a
    // âncora sozinho no primeiro load, porque o elemento ainda não existe quando
    // ele tenta — por isso resolvemos aqui, já com a árvore renderizada.
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
