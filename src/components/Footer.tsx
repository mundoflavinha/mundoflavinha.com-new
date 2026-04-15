import { Link } from "react-router-dom";
import { Instagram, Youtube, MessageCircle, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg text-foreground mb-4">Mundo Flavinha</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Menos telas, mais infância, mais memórias em família. Um universo de brincadeiras, conexão e afeto.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-foreground mb-4">Navegação</h4>
            <ul className="space-y-2">
              {[
                { label: "Brincadeiras", path: "/brincadeiras" },
                { label: "Downloads Gratuitos", path: "/downloads" },
                { label: "Vídeos", path: "/videos" },
                { label: "Blog", path: "/blog" },
                { label: "Loja Flavinha", path: "/loja" },
                { label: "Sobre", path: "/sobre" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-foreground mb-4">Redes Sociais</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-pink transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-pink transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-pink transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contato</a></li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground/70 leading-relaxed">
              Alguns links deste site podem gerar comissão para o Mundo Flavinha, sem custo extra para você.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-pink" /> por Mundo Flavinha © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
