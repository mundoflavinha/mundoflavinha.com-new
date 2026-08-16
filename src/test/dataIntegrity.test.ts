import { describe, expect, it } from "vitest";
import { brincadeiras02, getBrincadeira02BySlug } from "@/data/brincadeiras02";
import { brincadeiras35, getBrincadeira35BySlug } from "@/data/brincadeiras35";
import { brincadeiras68, getBrincadeira68BySlug } from "@/data/brincadeiras68";
import { brincadeirasFamilia, getBrincadeiraFamiliaBySlug } from "@/data/brincadeirasFamilia";

/**
 * Cada `BrincadeiraDetalhe*.tsx` busca por slug e, se não achar, faz
 * `<Navigate>` de volta pra listagem — silenciosamente. Um slug duplicado ou
 * malformado não quebra o build (TypeScript não valida o *valor* de uma
 * string), só some do ar em produção sem nenhum erro.
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

  it("slug desconhecido não encontra nada (a rota cairia no <Navigate>)", () => {
    expect(porSlug("slug-que-nao-existe-em-nenhum-dataset")).toBeUndefined();
  });

  it("nenhum campo de texto obrigatório está vazio", () => {
    for (const item of itens) {
      expect(item.title.trim(), `title vazio em id ${item.id}`).not.toBe("");
      expect(item.summary.trim(), `summary vazio em id ${item.id}`).not.toBe("");
      expect(item.image, `image ausente em id ${item.id}`).toBeTruthy();
    }
  });
});
