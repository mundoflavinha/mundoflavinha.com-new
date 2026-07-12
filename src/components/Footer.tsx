import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.92 4.78 12 4.78 12 4.78s-5.92 0-7.64.46a2.75 2.75 0 0 0-1.94 1.95A28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.95c1.72.46 7.64.46 7.64.46s5.92 0 7.64-.46a2.75 2.75 0 0 0 1.94-1.95A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.42-4.81ZM10 15.25v-6.5L15.5 12 10 15.25Z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.75 3c.25 2.15 1.47 3.52 3.55 3.66v3.1c-1.2.12-2.25-.28-3.46-1.02v5.79c0 7.36-8.03 9.66-11.25 4.38-2.07-3.39-.8-9.35 5.84-9.59v3.27c-.4.06-.82.16-1.2.29-1.15.39-1.8 1.12-1.62 2.42.35 2.49 4.92 3.23 4.54-1.64V3h3.6Z" />
  </svg>
);

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
              <a href="https://www.instagram.com/mundoflavinhaoficial/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-pink transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@mundoflavinha" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-pink transition-colors" aria-label="YouTube">
                <YoutubeIcon className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@mundoflavinha" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-pink transition-colors" aria-label="TikTok">
                <TikTokIcon className="w-5 h-5" />
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
