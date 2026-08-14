import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_01.webp";

const navItems = [
  { label: "Início", path: "/" },
  { label: "Brincadeiras", path: "/brincadeiras" },
  { label: "Downloads", path: "/downloads" },
  { label: "Vídeos", path: "/videos" },
  { label: "Blog", path: "/blog" },
  { label: "Achadinhos", path: "/indicacoes" },
  { label: "Loja", path: "/loja" },
  { label: "Sobre", path: "/sobre" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Mundo Flavinha" className="h-12 md:h-14 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-lg text-sm font-heading font-semibold transition-colors hover:bg-secondary ${
                location.pathname === item.path
                  ? "text-primary bg-secondary"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {!isHome && (
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/downloads">
              <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-bold text-sm gap-2">
                <Download className="w-4 h-4" />
                Baixar atividade gratuita
              </Button>
            </Link>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors text-foreground"
          aria-label="Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg font-heading font-semibold transition-colors ${
                  location.pathname === item.path
                    ? "text-primary bg-secondary"
                    : "text-foreground/70 hover:bg-secondary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {!isHome && (
              <Link to="/downloads" onClick={() => setIsOpen(false)} className="mt-2">
                <Button className="w-full rounded-full bg-primary text-primary-foreground font-heading font-bold gap-2">
                  <Download className="w-4 h-4" />
                  Baixar atividade gratuita
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
