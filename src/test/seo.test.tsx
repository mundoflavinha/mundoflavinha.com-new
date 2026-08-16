import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import { DEFAULT_SEO, ROUTE_SEO, SITE_URL } from "@/lib/seo";

afterEach(cleanup);

const renderEm = (rota: string, props: Partial<React.ComponentProps<typeof Layout>> = {}) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[rota]}>
        <Layout {...props}>
          <div>conteúdo</div>
        </Layout>
      </MemoryRouter>
    </HelmetProvider>,
  );

describe("Seo via Layout", () => {
  it("sem props explícitas, usa a entrada de ROUTE_SEO pela rota atual", async () => {
    renderEm("/sobre");
    await waitFor(() => expect(document.title).toContain(ROUTE_SEO["/sobre"].title));
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(
      ROUTE_SEO["/sobre"].description,
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(`${SITE_URL}/sobre`);
  });

  it("rota sem entrada na tabela cai no DEFAULT_SEO", async () => {
    renderEm("/rota-sem-metadado-especifico");
    await waitFor(() => expect(document.title).toBe(DEFAULT_SEO.title));
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(
      DEFAULT_SEO.description,
    );
  });

  it("title/description explícitos vencem a tabela", async () => {
    renderEm("/sobre", { title: "Título do artigo", description: "Descrição do artigo" });
    await waitFor(() => expect(document.title).toContain("Título do artigo"));
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toBe("Descrição do artigo");
  });

  it("home (título igual ao DEFAULT_SEO) não ganha o sufixo ' | Mundo Flavinha'", async () => {
    renderEm("/");
    await waitFor(() => expect(document.title).toBe(DEFAULT_SEO.title));
    expect(document.title.includes("| Mundo Flavinha")).toBe(false);
  });

  it("página comum ganha o sufixo ' | Mundo Flavinha'", async () => {
    renderEm("/sobre");
    await waitFor(() => expect(document.title.endsWith("| Mundo Flavinha")).toBe(true));
  });

  it("jsonLd, quando passado, vira um <script type=application/ld+json>", async () => {
    renderEm("/sobre", { jsonLd: { "@type": "Teste" } });
    await waitFor(() => {
      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script).not.toBeNull();
      expect(JSON.parse(script!.textContent!)).toEqual({ "@type": "Teste" });
    });
  });

  it("noIndex adiciona meta robots=noindex", async () => {
    renderEm("/sobre", { noIndex: true });
    await waitFor(() => {
      expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex");
    });
  });

  it("sem index.html duplicando tags: só existe UMA meta description no head", async () => {
    renderEm("/sobre");
    await waitFor(() => {
      expect(document.querySelectorAll('meta[name="description"]').length).toBe(1);
    });
  });
});
