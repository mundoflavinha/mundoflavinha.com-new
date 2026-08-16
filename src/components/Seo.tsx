import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { DEFAULT_SEO, ROUTE_SEO, SITE_URL, type JsonLd } from "@/lib/seo";

export interface SeoProps {
  /** Quando ausente, cai no ROUTE_SEO pela rota atual e depois no DEFAULT_SEO. */
  title?: string;
  description?: string;
  /** Caminho relativo (ex.: "/blog/album-da-copa"). Default: rota atual. */
  path?: string;
  /** Imagem para Open Graph — absoluta ou relativa (vira absoluta com SITE_URL). */
  image?: string;
  /** Páginas sem valor de indexação (ex.: 404). */
  noIndex?: boolean;
  jsonLd?: JsonLd;
}

const absolutizar = (imagem: string) => (imagem.startsWith("http") ? imagem : `${SITE_URL}${imagem}`);

const Seo = ({ title, description, path, image, noIndex, jsonLd }: SeoProps) => {
  const { pathname } = useLocation();
  const rota = path ?? pathname;
  const daTabela = ROUTE_SEO[rota];

  const tituloPagina = title ?? daTabela?.title ?? DEFAULT_SEO.title;
  const tituloCompleto = tituloPagina === DEFAULT_SEO.title ? tituloPagina : `${tituloPagina} | Mundo Flavinha`;
  const descricao = description ?? daTabela?.description ?? DEFAULT_SEO.description;
  const canonical = `${SITE_URL}${rota}`;
  const imagemOg = absolutizar(image ?? DEFAULT_SEO.image);

  return (
    <Helmet>
      <title>{tituloCompleto}</title>
      <meta name="description" content={descricao} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:description" content={descricao} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imagemOg} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {noIndex && <meta name="robots" content="noindex" />}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default Seo;
