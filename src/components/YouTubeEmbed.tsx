import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  /** Segundo em que o vídeo começa. */
  start?: number;
  className?: string;
}

/**
 * Player do YouTube com "facade": até o clique, nada é carregado do Google.
 *
 * Por que importa: um <iframe> do YouTube montado junto com a página faz o
 * navegador do visitante contatar o Google — e receber cookies de terceiros —
 * mesmo de quem nunca quis assistir. Com o facade, isso só acontece por escolha
 * de quem visita.
 *
 * Usamos youtube-nocookie.com, o modo de privacidade ampliada do YouTube.
 *
 * Quando o vanilla-cookieconsent entrar no projeto, este mesmo componente vira
 * o ponto de integração do iframemanager — não precisa ser reescrito.
 */
const YouTubeEmbed = ({ videoId, title, start, className = "" }: YouTubeEmbedProps) => {
  const [ativado, setAtivado] = useState(false);

  const params = new URLSearchParams({ autoplay: "1", rel: "0" });
  if (start) params.set("start", String(start));

  if (ativado) {
    return (
      <iframe
        className={className}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setAtivado(true)}
      aria-label={`Assistir: ${title}`}
      className={`group relative flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-lilac/30 via-pink/25 to-baby-blue/30 transition-colors hover:from-lilac/40 hover:via-pink/35 hover:to-baby-blue/40 ${className}`}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-card shadow-lg transition-transform group-hover:scale-110">
        <Play className="ml-1 h-7 w-7 text-primary" />
      </span>
      <span className="max-w-[80%] text-center font-heading text-sm font-bold text-foreground md:text-base">
        {title}
      </span>
      <span className="text-xs text-foreground/60">
        Clique para assistir no YouTube
      </span>
    </button>
  );
};

export default YouTubeEmbed;
