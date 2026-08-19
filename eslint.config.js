import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

/**
 * `defineConfig`, não `tseslint.config`: a função da typescript-eslint está
 * marcada `@deprecated` a favor desta, que o próprio ESLint 9 passou a
 * oferecer com a mesma conveniência (`extends` por bloco). Mesmo formato,
 * sem o aviso.
 *
 * `eslint-plugin-astro` fixado na série 1.x (`^1.7.0`), não a 3.x mais nova:
 * a 3.x exige `eslint: '>=10.0.0'` via peerDependency, e o projeto está no
 * ESLint 9. A série 1.x pede só `>=8.57.0` e traz `astro-eslint-parser`
 * embutido — testada à mão contra os 61 arquivos `.astro` reais deste
 * projeto antes de entrar aqui: zero erros, zero avisos.
 */
export default defineConfig(
  { ignores: ["dist", "node_modules"] },

  // Ilhas React e o resto do TS/TSX do site: roda no navegador.
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  },

  // react-refresh só faz sentido em componente React de verdade (.tsx) — o
  // bloco acima aplicava a regra a TODO .ts também, inclusive src/lib/*.ts,
  // que não exporta componente nenhum. Bloco à parte para não alargar o
  // primeiro com uma exceção.
  {
    files: ["src/**/*.tsx"],
    plugins: { "react-refresh": reactRefresh },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },

  // .astro: o parser trata o frontmatter como TypeScript e o template à
  // parte. Regras pensadas para componente React (react-hooks,
  // react-refresh) não se aplicam aqui — frontmatter não é corpo de
  // componente, e o Astro não participa de Fast Refresh como módulo React.
  {
    extends: [...astro.configs.recommended],
    files: ["**/*.astro"],
    languageOptions: { globals: globals.browser },
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  },

  // Testes: Vitest roda em Node (ver vitest.config.ts), não no navegador.
  // Antes caíam no bloco de cima com `globals.browser`, o que mascararia uso
  // acidental de API de navegador (fetch global à parte, window, document)
  // dentro de um teste que na verdade roda em Node. A exceção real é
  // consentText.test.tsx, que declara `@vitest-environment jsdom` no próprio
  // arquivo — o pragma já resolve isso em runtime; aqui é só o lint.
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["src/test/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  },

  // Funções serverless, scripts e configs: rodam no Node/Workers, não no
  // navegador. `*.config.mjs`/`*.config.cjs` entraram junto de
  // `*.config.{ts,js}` — sem eles `astro.config.mjs` não batia em glob
  // nenhum e ficava tão fora do lint quanto os `.astro` estavam antes desta
  // mudança (confirmado com `eslint --print-config astro.config.mjs`: zero
  // regras aplicadas).
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["functions/**/*.ts", "scripts/**/*.mjs", "*.config.{ts,js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  },
);
