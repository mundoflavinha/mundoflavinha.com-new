import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import App from "@/App";
import { brincadeiras02 } from "@/data/brincadeiras02";
import { brincadeiras35 } from "@/data/brincadeiras35";
import { brincadeiras68 } from "@/data/brincadeiras68";
import { brincadeirasFamilia } from "@/data/brincadeirasFamilia";

/**
 * Cada rota é um chunk separado (React.lazy). Typecheck e lint não pegam um
 * import quebrado dentro desses chunks — só apareceria navegando até lá, e
 * hoje isso só aconteceria em produção. Este teste visita as 31 rotas e só
 * verifica que nenhuma cai no RouteErrorBoundary.
 *
 * As rotas com :slug usam o primeiro item de cada dataset — a integridade dos
 * slugs em si (duplicata, slug desconhecido) já é coberta por dataIntegrity.test.ts.
 */
const ROTAS = [
  "/",
  "/brincadeiras",
  "/brincadeiras/0-a-2-anos",
  `/brincadeiras/0-a-2-anos/${brincadeiras02[0].slug}`,
  "/brincadeiras/3-a-5-anos",
  `/brincadeiras/3-a-5-anos/${brincadeiras35[0].slug}`,
  "/brincadeiras/6-a-8-anos",
  `/brincadeiras/6-a-8-anos/${brincadeiras68[0].slug}`,
  "/brincadeiras/em-familia",
  `/brincadeiras/em-familia/${brincadeirasFamilia[0].slug}`,
  "/downloads",
  "/videos",
  "/indicacoes",
  "/indicacoes/0-a-2-anos",
  "/indicacoes/3-a-5-anos",
  "/indicacoes/6-a-8-anos",
  "/indicacoes/jogos-em-familia",
  "/loja",
  "/loja/cartoes-alto-contraste-bebes",
  "/infoprodutos",
  "/blog",
  "/blog/album-da-copa",
  "/blog/presenca-pequenos-momentos",
  "/blog/empreendedorismo-infantil",
  "/blog/brincadeira-no-carro",
  "/blog/20-reais-shopping",
  "/sobre",
  "/politica-de-privacidade",
  "/termos-de-uso",
  "/contato",
  "/rota-que-nao-existe", // cai no catch-all (NotFound)
];

// A página /videos chama /api/videos via react-query. Sem isso, cada visita
// dispara uma tentativa de rede de verdade (e falha) mais as 3 retentativas
// padrão do react-query, deixando o teste lento à toa — não é isso que este
// teste verifica.
beforeAll(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify({ categories: [], videos: [] }), { status: 200 })),
  );
});

afterAll(() => {
  vi.unstubAllGlobals();
});

afterEach(cleanup);

describe("smoke test das rotas", () => {
  it.each(ROTAS)("%s renderiza sem cair no RouteErrorBoundary", async (rota) => {
    window.history.pushState({}, "", rota);
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByLabelText("Carregando")).not.toBeInTheDocument();
    });

    expect(screen.queryByText("Algo deu errado ao abrir esta página")).not.toBeInTheDocument();
    expect(screen.queryByText("O site foi atualizado")).not.toBeInTheDocument();
  });
});
