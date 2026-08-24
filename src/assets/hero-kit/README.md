<!--
  ==========================================================================
  Cópia do README do kit, com as diferenças desta integração anotadas abaixo.
  O original veio em _tmp/design-concepts/hero-svg-kit (fora do versionamento).

  O QUE MUDOU EM RELAÇÃO AO KIT ENTREGUE

  1. `star-yellow.svg` — path corrigido. O comando `c` vinha com 34 parâmetros
     e `c` consome múltiplos de 6; faltava um ponto de controle. O navegador
     abortava o path no erro e desenhava uma forma de três pontas em vez da
     estrela. O valor reposto foi derivado da simetria de 72° da própria
     estrela — a nota está dentro do arquivo.

  2. `blob-coral.svg` e `blob-lilac.svg` — granulado recortado contra o
     SourceAlpha. `feTurbulence` preenche a região inteira do filtro, e
     `feBlend mode="multiply"` sobre pixel transparente devolve o próprio
     ruído: aparecia um retângulo cinza em volta dos dois blobs.

  3. `hero-motion.css` não foi copiado. As animações vivem em
     `src/styles/global.css`, com duas mudanças: a regra é ligada dentro de
     `prefers-reduced-motion: no-preference` (em vez de desligada dentro de
     `reduce`, que deixava o navegador sem preferência declarada no caso
     animado), e o `will-change` saiu do seletor coringa — são 17 peças, e
     manter todas promovidas custa memória de GPU o tempo todo.

  4. Os SVGs são EMBUTIDOS, não usados via <img> como no exemplo do README.
     Via <img> eles não enxergam as variáveis da página e cairiam sempre no
     fallback hardcoded das cores. Ver `src/lib/svgKit.ts`, que também
     prefixa os ids — o kit repete `shadow` em 7 arquivos e `title`/`desc`
     nos 17, e no mesmo documento isso faria `url(#shadow)` resolver tudo
     para o mesmo filtro.

  5. A paleta do manifest é a fonte das cores (ver o bloco de tokens em
     global.css), mas texto e botão usam variantes `-ink` escurecidas: a
     paleta crua reprova no contraste WCAG em quatro usos.
  ==========================================================================
-->

# Mundo Flavinha — Hero SVG Kit

Kit vetorial original derivado da direção visual “A brincadeira começa aqui”. Todos os elementos são SVG puro, sem imagens raster, fontes ou dependências externas.

## Arquivos

- `blob-coral.svg` — forma principal atrás da família.
- `blob-lilac.svg` — forma secundária para profundidade.
- `paper-plane.svg` — avião de papel lilás.
- `wooden-block.svg` — bloco de madeira com furo.
- `dice-purple.svg` — dado roxo.
- `crayon-coral.svg` — giz de cera coral.
- `jigsaw-pink.svg` — peça de quebra-cabeça rosa.
- `star-yellow.svg` — estrela amarela.
- `clay-ball-mint.svg` — bola de massinha verde.
- `heart-doodle.svg` — coração de traço duplo.
- `cloud-doodle.svg` — nuvem de giz azul.
- `motion-path.svg` — trilha pontilhada de movimento.
- `spark-lines.svg` — raios amarelos.
- `scribble-purple.svg` — três rabiscos roxos.
- `flower-doodle.svg` — flor desenhada à mão.
- `sparkle.svg` — brilho com pontos coloridos.
- `orbit-dot.svg` — ponto orbital com anel irregular.
- `hero-motion.css` — animações leves e suporte a `prefers-reduced-motion`.
- `manifest.json` — papel, tamanho e animação recomendados para cada asset.

## Direção de composição

1. Use `blob-coral.svg` atrás do recorte da família e `blob-lilac.svg` deslocado para a direita/baixo.
2. Mantenha a família estável; anime apenas os objetos do entorno.
3. Coloque `paper-plane.svg`, `cloud-doodle.svg` e `motion-path.svg` na parte superior/intermediária.
4. Use dado, giz, estrela, quebra-cabeça e massinha como primeiro plano, próximos à base do recorte.
5. Não cubra rostos, mãos ou o CTA. Em telas menores, remova primeiro `wooden-block.svg`, `heart-doodle.svg` e `scribble-purple.svg`.

## Uso simples

```html
<div class="mf-hero-art">
  <img src="/hero/blob-coral.svg" data-hero-asset data-motion="breathe" alt="" />
  <img src="/hero/paper-plane.svg" data-hero-asset data-motion="plane-drift" alt="" />
</div>
```

Para recolorir partes por CSS, importe o SVG inline. Os principais grupos usam `data-part` e várias cores têm variáveis com fallback, como `var(--mf-coral, #F77678)`.

## Regras de movimento

- Deslocamento máximo recomendado: 8–12 px.
- Rotação máxima: 3 graus.
- Duração: 4–11 segundos, com fases diferentes entre elementos.
- Nunca aplique parallax à foto da família.
- Preserve o bloco `prefers-reduced-motion` de `hero-motion.css`.

## Fotografia

O recorte da família é raster e permanece separado deste kit:

`../hero-family-transparent.png`

Ele deve ser renderizado acima dos blobs e abaixo dos brinquedos de primeiro plano.
