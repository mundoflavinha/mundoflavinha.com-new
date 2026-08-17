import jogoDaReciclagem from "@/assets/downloadgratuito/JogodaReciclagem.webp";
import jogoDaTampinha from "@/assets/downloadgratuito/JogodaTampinha.webp";
import semaforoDoToque from "@/assets/downloadgratuito/semaforodotoque.webp";
import coleteEducativo from "@/assets/downloadgratuito/coleteeducativo.webp";

/**
 * Catálogo único dos materiais gratuitos (lead magnets).
 *
 * Existe porque antes o nome do material acumulava três papéis em dois lugares
 * diferentes: era o texto do card (repetido na home E em /downloads), o valor
 * gravado em `material_requests.material` no banco, e — via `slugify()` dentro
 * do modal — o nome do arquivo PDF. Uma revisão editorial no título mudava
 * silenciosamente a URL do download e desalinhava o histórico do banco.
 *
 * Agora `id` é o identificador estável que trafega no HTML e na ilha, `nome` é
 * só apresentação, e `pdf` é explícito em vez de derivado. O que vai ao banco
 * continua sendo `nome` (compatível com o que já está gravado lá).
 */
export type Material = {
  /** Identificador estável. Nunca mude: é o que o HTML estático manda para a ilha. */
  id: string;
  /** Título exibido e valor gravado em material_requests.material. */
  nome: string;
  image: ImageMetadata;
  /** Caminho do arquivo em public/. Explícito de propósito, não derivado do nome. */
  pdf: string;
};

export const MATERIAIS: Material[] = [
  {
    id: "jogo-da-reciclagem",
    nome: "Jogo da Reciclagem",
    image: jogoDaReciclagem,
    pdf: "/materiais/jogo-da-reciclagem.pdf",
  },
  {
    id: "cada-tampinha-no-seu-lugar",
    nome: "Cada Tampinha no Seu Lugar",
    image: jogoDaTampinha,
    pdf: "/materiais/cada-tampinha-no-seu-lugar.pdf",
  },
  {
    id: "semaforo-do-toque",
    nome: "Semáforo do Toque",
    image: semaforoDoToque,
    pdf: "/materiais/semaforo-do-toque.pdf",
  },
  {
    id: "colete-educativo",
    nome: "Colete Educativo",
    image: coleteEducativo,
    pdf: "/materiais/colete-educativo.pdf",
  },
];

export const getMaterialPorId = (id: string): Material | undefined =>
  MATERIAIS.find((material) => material.id === id);
