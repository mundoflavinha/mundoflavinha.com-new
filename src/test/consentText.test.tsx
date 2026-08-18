// @vitest-environment jsdom
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { comLinkPolitica } from "@/lib/consentText";
import { CONSENT_TEXTS } from "@/lib/consent";
import { ROTAS_LEGAIS } from "@/lib/site";

/**
 * O texto que a pessoa LÊ tem que ser idêntico ao que o servidor GRAVA.
 *
 * O teste de hash em consent.test.ts trava as constantes, mas não prova nada
 * sobre o que aparece na tela: `comLinkPolitica` fatia a string e reinsere um
 * pedaço dentro de um elemento. Um espaço a mais na fronteira do link, uma
 * entidade HTML que não volta a virar o mesmo caractere, ou um marcador
 * levemente diferente passariam pelo hash e mudariam o que está exibido — e o
 * que vale juridicamente é o que estava na tela no momento do aceite.
 *
 * Por isso a asserção é sobre o `textContent` reconstruído do DOM, não sobre os
 * bytes do HTML: `&nbsp;`, `&amp;` e afins são representações diferentes do
 * mesmo texto, e comparar HTML cru daria falso negativo.
 */

const textoRenderizado = (texto: string) => {
  const container = document.createElement("div");
  container.innerHTML = renderToStaticMarkup(<>{comLinkPolitica(texto)}</>);
  return { container, textContent: container.textContent ?? "" };
};

describe("comLinkPolitica preserva o texto de consentimento", () => {
  const entradas = Object.entries(CONSENT_TEXTS);

  it.each(entradas)("%s: o texto exibido é idêntico à constante", (_chave, texto) => {
    expect(textoRenderizado(texto).textContent).toBe(texto);
  });

  it.each(entradas)("%s: o link aponta para a Política de Privacidade", (_chave, texto) => {
    const { container } = textoRenderizado(texto);
    const links = container.querySelectorAll("a");

    if (!texto.includes("Política de Privacidade")) {
      expect(links.length).toBe(0);
      return;
    }

    expect(links.length).toBe(1);
    expect(links[0].getAttribute("href")).toBe(ROTAS_LEGAIS.privacidade);
    expect(links[0].textContent).toBe("Política de Privacidade");
  });

  it("não sobra nenhum componente de roteador nas ilhas", () => {
    // Regressão específica: `<Link>` do react-router lança em runtime dentro de
    // uma ilha (não existe <Router> acima dela) e renderToStaticMarkup aqui
    // falharia. Este teste é a rede que o `astro check` não estende — tipo
    // válido, runtime quebrado.
    for (const [, texto] of entradas) {
      expect(() => textoRenderizado(texto)).not.toThrow();
    }
  });
});
