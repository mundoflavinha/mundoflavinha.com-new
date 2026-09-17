import type { AdaptadorDeTagging } from "./tipos";

/** Modo `disabled`: nenhum terceiro, nenhum push, nenhum sinal. */
export function criarAdaptadorDesligado(): AdaptadorDeTagging {
  return {
    modo: "disabled",
    aplicarConsentimento() {},
    enviar() {},
  };
}
