import { describe, expect, it } from "vitest";
import { brincadeiras02, getBrincadeira02BySlug } from "@/data/brincadeiras02";
import { brincadeiras35, getBrincadeira35BySlug } from "@/data/brincadeiras35";
import { brincadeiras68, getBrincadeira68BySlug } from "@/data/brincadeiras68";
import { brincadeirasFamilia, getBrincadeiraFamiliaBySlug } from "@/data/brincadeirasFamilia";

/**
 * Os slugs alimentam o `getStaticPaths()` das rotas `[slug].astro`: cada item
 * daqui vira um arquivo HTML no build. Um slug duplicado colide silenciosamente
 * (um sobrescreve o outro) e um malformado gera uma URL estranha — nada disso
 * quebra o build, porque TypeScript não valida o *valor* de uma string.
 *
 * (Antes da migração o risco era outro: slug não encontrado fazia `<Navigate>`
 * silencioso de volta à listagem. Agora vira 404 de verdade, que é melhor.)
 */
const DATASETS = [
  { nome: "brincadeiras02", itens: brincadeiras02, porSlug: getBrincadeira02BySlug },
  { nome: "brincadeiras35", itens: brincadeiras35, porSlug: getBrincadeira35BySlug },
  { nome: "brincadeiras68", itens: brincadeiras68, porSlug: getBrincadeira68BySlug },
  { nome: "brincadeirasFamilia", itens: brincadeirasFamilia, porSlug: getBrincadeiraFamiliaBySlug },
];

describe.each(DATASETS)("$nome", ({ itens, porSlug }) => {
  it("não fica vazio", () => {
    expect(itens.length).toBeGreaterThan(0);
  });

  it("todo slug é kebab-case (o formato que a rota espera)", () => {
    for (const item of itens) {
      expect(item.slug, `slug inválido: "${item.slug}"`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("nenhum slug se repete", () => {
    const slugs = itens.map((i) => i.slug);
    const duplicados = slugs.filter((s, i) => slugs.indexOf(s) !== i);
    expect(duplicados, `slugs duplicados: ${[...new Set(duplicados)].join(", ")}`).toEqual([]);
  });

  it("nenhum id se repete", () => {
    const ids = itens.map((i) => i.id);
    const duplicados = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicados, `ids duplicados: ${[...new Set(duplicados)].join(", ")}`).toEqual([]);
  });

  it("cada item é encontrável pelo próprio slug (round-trip)", () => {
    for (const item of itens) {
      expect(porSlug(item.slug)?.slug, `${item.slug} não é encontrado por getXBySlug`).toBe(item.slug);
    }
  });

  it("slug desconhecido não encontra nada (a rota vira 404 real)", () => {
    expect(porSlug("slug-que-nao-existe-em-nenhum-dataset")).toBeUndefined();
  });

  it("nenhum campo de texto obrigatório está vazio", () => {
    for (const item of itens) {
      expect(item.title.trim(), `title vazio em id ${item.id}`).not.toBe("");
      expect(item.summary.trim(), `summary vazio em id ${item.id}`).not.toBe("");
    }
  });

  it("todo item declara uma imagem", () => {
    // Só presença. A FORMA da imagem (ImageMetadata com width/height) não é
    // asseverada aqui de propósito: o Vitest resolve .webp como string e o
    // build do Astro como objeto, então um `toBeTruthy()` passaria nos dois
    // casos validando coisas diferentes. Quem garante que o <img> sai com
    // dimensão é src/test/html.test.ts, lendo o HTML de dist/.
    for (const item of itens) {
      expect(item.image, `image ausente em id ${item.id}`).toBeDefined();
    }
  });
});
