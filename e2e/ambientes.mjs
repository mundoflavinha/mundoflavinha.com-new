/**
 * Ambientes de build do e2e — FONTE ÚNICA. Usado por scripts/build-e2e.mjs
 * (para gerar os builds) e pelos specs (para saber o que esperar).
 *
 * IDS DE TESTE, NUNCA DE PRODUÇÃO. O teste em src/test/tagging.test.ts falha
 * se um id conhecido de produção aparecer aqui ou no ci.yml. E mesmo com um id
 * de teste, nenhuma requisição chega ao Google ou à Meta: e2e/fixtures.ts
 * intercepta e responde com stubs, e playwright.config.ts derruba o DNS desses
 * hosts no Chromium como segunda barreira.
 */

export const IDS_DE_TESTE = {
  ga4: "G-TEST000000",
  gtm: "GTM-TEST000",
  metaPixel: "100000000000001",
};

export const AMBIENTES = {
  direct: {
    dir: "dist",
    porta: 4322,
    env: {
      PUBLIC_TAGGING_MODE: "direct",
      PUBLIC_GA_ENABLED: "true",
      PUBLIC_GA_ID: IDS_DE_TESTE.ga4,
      PUBLIC_META_PIXEL_ENABLED: "true",
      PUBLIC_META_PIXEL_ID: IDS_DE_TESTE.metaPixel,
    },
  },
  gtm: {
    dir: "dist-gtm",
    porta: 4323,
    env: { PUBLIC_TAGGING_MODE: "gtm", PUBLIC_GTM_ID: IDS_DE_TESTE.gtm },
  },
  disabled: {
    dir: "dist-disabled",
    porta: 4324,
    env: { PUBLIC_TAGGING_MODE: "disabled" },
  },
};
