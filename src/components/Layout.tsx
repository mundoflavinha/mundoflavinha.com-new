import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import Seo, { type SeoProps } from "./Seo";

interface LayoutProps extends SeoProps {
  children: ReactNode;
}

/**
 * Toda página que passa por aqui ganha metadados de SEO de graça: sem
 * title/description explícitos, o `<Seo>` cai na tabela de ROUTE_SEO pela
 * rota atual (src/lib/seo.ts). Só quem tem dado dinâmico (artigo, detalhe de
 * brincadeira, home) precisa passar as props explicitamente.
 */
const Layout = ({ children, title, description, path, image, noIndex, jsonLd }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo title={title} description={description} path={path} image={image} noIndex={noIndex} jsonLd={jsonLd} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
