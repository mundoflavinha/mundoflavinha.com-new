/**
 * Prepara um SVG do hero kit para ser embutido no HTML da página.
 *
 * Por que embutir em vez de usar <img src="...svg">, que é o que o README do
 * kit sugere: os SVGs pintam com `var(--mf-coral, #f77678)` e companhia, e um
 * SVG carregado por <img> é um documento isolado — não enxerga as variáveis da
 * página e sempre cairia no fallback hardcoded. Embutindo, a paleta vem dos
 * tokens (ver global.css) e ainda economiza 17 requisições no hero.
 *
 * O preço é que os 17 arquivos passam a dividir o MESMO documento, e o kit
 * repete ids sem cerimônia: `shadow` aparece em 7 arquivos, `title` e `desc`
 * nos 17, `paper` em 2. Como `url(#shadow)` resolve pelo primeiro id do
 * documento, sem tratar isso a sombra do dado vazaria para o giz, o avião e o
 * quebra-cabeça — todos apontando para o mesmo filtro. Daí o prefixo.
 */

/** Ids que o SVG define, para não reescrever referência a id de fora. */
function idsDefinidos(svg: string): Set<string> {
  const ids = new Set<string>();
  for (const achado of svg.matchAll(/\sid="([^"]+)"/g)) ids.add(achado[1]);
  return ids;
}

function escaparRegex(texto: string): string {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * @param bruto  conteúdo do arquivo .svg
 * @param ns     prefixo único (na prática, o nome do arquivo)
 */
export function prepararSvgKit(bruto: string, ns: string): string {
  let svg = bruto;

  // Comentários e a declaração XML não servem para nada no HTML final; o
  // comentário continua no arquivo-fonte, que é onde alguém vai lê-lo.
  svg = svg.replace(/<\?xml[\s\S]*?\?>/g, "").replace(/<!--[\s\S]*?-->/g, "");

  /*
   * Cada peça vem com role="img" + <title>/<desc>. Isolada faz sentido; aqui
   * não: são 17 enfeites em volta de uma foto que já carrega o significado, e
   * anunciar "estrela de massinha", "dado roxo", "bola de massinha verde" um
   * atrás do outro só polui a navegação por leitor de tela. Viram decoração.
   */
  svg = svg.replace(/<title[\s\S]*?<\/title>/g, "").replace(/<desc[\s\S]*?<\/desc>/g, "");
  svg = svg.replace(/\s(?:role|aria-labelledby)="[^"]*"/g, "");

  for (const id of idsDefinidos(svg)) {
    const novo = `${ns}-${id}`;
    const esc = escaparRegex(id);
    svg = svg.replace(new RegExp(`(\\sid=")${esc}(")`, "g"), `$1${novo}$2`);
    svg = svg.replace(new RegExp(`url\\(#${esc}\\)`, "g"), `url(#${novo})`);
    svg = svg.replace(new RegExp(`((?:xlink:)?href=")#${esc}(")`, "g"), `$1#${novo}$2`);
  }

  // `focusable="false"` é para o Edge/IE legado, que põe SVG na ordem de
  // tabulação mesmo com aria-hidden.
  svg = svg.replace(/<svg\b/, '<svg aria-hidden="true" focusable="false"');

  return svg.trim();
}
