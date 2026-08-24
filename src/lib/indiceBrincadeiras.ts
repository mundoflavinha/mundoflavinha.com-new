import { brincadeiras02 } from "@/data/brincadeiras02";
import { brincadeiras35 } from "@/data/brincadeiras35";
import { brincadeiras68 } from "@/data/brincadeiras68";
import { brincadeirasFamilia } from "@/data/brincadeirasFamilia";

/**
 * Índice enxuto das brincadeiras, montado no build.
 *
 * Existe porque o hero e a busca do header precisam da MESMA lista no cliente,
 * e os quatro arquivos de dados carregam campos gordos (`play`, `importance`,
 * `learns`…) mais um `ImageMetadata` por item. Serializar aquilo inteiro no
 * HTML de 31 rotas seria absurdo — aqui sobram só os cinco campos que os dois
 * consumidores realmente usam.
 */

export type FaixaEtaria = "0-2" | "3-5" | "6-8" | "familia";

export type ItemIndice = {
  /** Título exibido. */
  t: string;
  /** URL da brincadeira. */
  u: string;
  /** Faixa etária. */
  f: FaixaEtaria;
  /**
   * Duração MÍNIMA em minutos, já normalizada.
   *
   * O campo `time` dos dados é texto livre e bagunçado: convive
   * "10 a 20 minutos", "15 a 30 minutos." e frases inteiras como
   * "20 a 40 minutos. Prepare-se, porque elas vão querer repetir". Comparar
   * string no cliente não filtra nada, então o número sai daqui pronto.
   */
  m: number;
};

/** Primeiro número do texto de duração. "Poucos minutos" (sem dígito) vira 5. */
function minutosMinimos(texto: string): number {
  const achado = texto.match(/\d+/);
  return achado ? Number(achado[0]) : 5;
}

type Bruto = { slug: string; title: string; time: string };

function mapear(itens: readonly Bruto[], faixa: FaixaEtaria, base: string): ItemIndice[] {
  return itens.map((item) => ({
    t: item.title,
    u: `${base}/${item.slug}`,
    f: faixa,
    m: minutosMinimos(item.time),
  }));
}

export const indiceBrincadeiras: ItemIndice[] = [
  ...mapear(brincadeiras02, "0-2", "/brincadeiras/0-a-2-anos"),
  ...mapear(brincadeiras35, "3-5", "/brincadeiras/3-a-5-anos"),
  ...mapear(brincadeiras68, "6-8", "/brincadeiras/6-a-8-anos"),
  ...mapear(brincadeirasFamilia, "familia", "/brincadeiras/em-familia"),
];

/**
 * Rótulo e rota da listagem de cada faixa.
 *
 * Dois rótulos porque os dois consumidores têm espaços bem diferentes: o
 * diálogo de busca usa a linha inteira e cabe o `rotulo`; o <select> do hero
 * divide ~190px com ícone e chevron, e select nativo CORTA o texto em vez de
 * reticenciar — lá vai o `curto`, que o ícone de bebê já contextualiza.
 */
export const FAIXAS: { valor: FaixaEtaria; rotulo: string; curto: string; rota: string }[] = [
  { valor: "0-2", rotulo: "Criança de 0 a 2 anos", curto: "0 a 2 anos", rota: "/brincadeiras/0-a-2-anos" },
  { valor: "3-5", rotulo: "Criança de 3 a 5 anos", curto: "3 a 5 anos", rota: "/brincadeiras/3-a-5-anos" },
  { valor: "6-8", rotulo: "Criança de 6 a 8 anos", curto: "6 a 8 anos", rota: "/brincadeiras/6-a-8-anos" },
  { valor: "familia", rotulo: "Brincadeiras em família", curto: "Em família", rota: "/brincadeiras/em-familia" },
];

/** Orçamentos de tempo oferecidos no hero, em minutos. */
export const TEMPOS = [10, 20, 30] as const;
