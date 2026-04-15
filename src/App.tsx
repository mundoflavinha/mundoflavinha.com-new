import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Brincadeiras from "./pages/Brincadeiras.tsx";
import Downloads from "./pages/Downloads.tsx";
import Videos from "./pages/Videos.tsx";
import Indicacoes from "./pages/Indicacoes.tsx";
import Loja from "./pages/Loja.tsx";
import Infoprodutos from "./pages/Infoprodutos.tsx";
import Blog from "./pages/Blog.tsx";
import Sobre from "./pages/Sobre.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/brincadeiras" element={<Brincadeiras />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/indicacoes" element={<Indicacoes />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/infoprodutos" element={<Infoprodutos />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
