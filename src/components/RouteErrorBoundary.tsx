import { Component, type ReactNode } from "react";

/**
 * Boundary para falha de carregamento de chunk.
 *
 * Com rotas lazy (`import()` dinâmico), um deploy novo troca o hash dos arquivos.
 * Quem estava com a aba aberta e navega depois disso pede um chunk que não existe
 * mais no CDN — sem tratamento, isso vira tela branca sem explicação.
 *
 * Aqui a gente detecta esse caso específico e oferece recarregar, que resolve
 * (a página recarregada busca o manifesto novo).
 */

interface Props {
  children: ReactNode;
}

interface State {
  erro: Error | null;
}

/** Erro de chunk tem mensagem própria em cada browser; cobrimos as variações comuns. */
const ehErroDeChunk = (erro: Error) =>
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading chunk \d+ failed/i.test(
    erro.message,
  );

class RouteErrorBoundary extends Component<Props, State> {
  state: State = { erro: null };

  static getDerivedStateFromError(erro: Error): State {
    return { erro };
  }

  componentDidCatch(erro: Error) {
    console.error("erro ao carregar a rota", erro);
  }

  render() {
    const { erro } = this.state;

    if (!erro) return this.props.children;

    const desatualizado = ehErroDeChunk(erro);

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-heading text-xl font-bold text-foreground">
          {desatualizado ? "O site foi atualizado" : "Algo deu errado ao abrir esta página"}
        </h1>
        <p className="max-w-md leading-relaxed text-muted-foreground">
          {desatualizado
            ? "Saiu uma versão nova enquanto você navegava. Recarregue para continuar."
            : "Não conseguimos carregar esta página. Tente recarregar."}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-primary px-6 py-2 font-heading font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Recarregar
        </button>
      </div>
    );
  }
}

export default RouteErrorBoundary;
