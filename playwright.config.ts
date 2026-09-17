import { defineConfig, devices } from "@playwright/test";
import { AMBIENTES } from "./e2e/ambientes.mjs";
import { HOSTS_DE_MEDICAO } from "./e2e/fixtures";

/**
 * Barreira de rede no próprio navegador: os hosts de medição não resolvem.
 * `e2e/fixtures.ts` intercepta ANTES do DNS e responde com stubs; isto só
 * age se algum spec escapar da fixture — e aí a requisição falha em vez de
 * chegar ao Google ou à Meta. Há teste que exige esta linha.
 */
const BLOQUEIO_DE_DNS = `--host-resolver-rules=${HOSTS_DE_MEDICAO.flatMap((h) => [`MAP ${h} ~NOTFOUND`, `MAP *.${h} ~NOTFOUND`]).join(", ")}`;

const servirTodos = Object.values(AMBIENTES)
  .map((a) => `${a.porta}:${a.dir}`)
  .join(" ");

/**
 * Playwright cobre as quatro classes de defeito que o resto da suíte não
 * alcança, e que são exatamente as que a arquitetura de ilhas introduz:
 *
 *   1. corrida de hidratação (clique antes de o JavaScript assumir);
 *   2. foco e teclado (abrir, fechar, voltar para o gatilho);
 *   3. falha de carregamento do chunk (rede bloqueada);
 *   4. submissão de formulário antes da hidratação.
 *
 * Vitest roda em Node, sem navegador; os testes sobre `dist/**` leem HTML
 * estático. Nenhum dos dois vê hidratação acontecer. Sem isto, a ponte do
 * modal não teria rede de segurança automática nenhuma.
 *
 * Roda contra o BUILD DE PRODUÇÃO (`astro preview`), não contra o dev server:
 * em dev os módulos não são empacotados e o timing de hidratação é outro —
 * testar ali provaria algo que não vai a produção.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  // Em CI, os dois reporters: "github" para anotar a PR inline, "html" para
  // produzir de fato a pasta que o workflow sobe como artefato quando falha.
  // Antes era só "github" — esse reporter NÃO gera playwright-report/, então
  // o upload-artifact do CI sempre mirava uma pasta inexistente. Sem falha
  // "no files found" (o step só roda com `if: failure()`), então isso nunca
  // tinha sido notado: o buraco só aparece na hora em que mais importa, com
  // um teste quebrado e nenhum relatório para diagnosticar.
  reporter: process.env.CI ? [["github"], ["html", { outputFolder: "playwright-report", open: "never" }]] : "list",
  use: {
    trace: "on-first-retry",
    launchOptions: { args: [BLOQUEIO_DE_DNS] },
  },
  /*
   * Um projeto por modo de tagging, cada um contra o SEU build (scripts/build-e2e.mjs).
   * O modo é embutido no bundle: não dá para testar `gtm` num build `direct`.
   * O projeto `direct` roda a suíte inteira; os outros, só o que é específico deles.
   */
  projects: [
    {
      name: "direct",
      testIgnore: /modo-(gtm|disabled)\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${AMBIENTES.direct.porta}` },
    },
    {
      name: "gtm",
      testMatch: /modo-gtm\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${AMBIENTES.gtm.porta}` },
    },
    {
      name: "disabled",
      testMatch: /modo-disabled\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${AMBIENTES.disabled.porta}` },
    },
  ],
  webServer: {
    // Não usa `astro preview`: nesta versão ele sempre vira daemon (o processo
    // sai assim que sobe) e ignora --port quando já existe um daemon de outra
    // execução. O Playwright precisa de um processo vivo e de porta previsível.
    // Ver o comentário em scripts/servir-dist.mjs.
    //
    // Em CI NÃO builda de novo: o workflow já rodou `npm run build:e2e` antes
    // deste passo, e reconstruir aqui geraria um dist/
    // diferente daquele que `test:html` acabou de validar — os dois deixariam
    // de estar checando o mesmo artefato. Localmente, "build && serve" continua
    // conveniente para rodar `npm run test:e2e` isoladamente.
    command: process.env.CI
      ? `node scripts/servir-dist.mjs ${servirTodos}`
      : `npm run build:e2e && node scripts/servir-dist.mjs ${servirTodos}`,
    url: `http://localhost:${AMBIENTES.disabled.porta}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
