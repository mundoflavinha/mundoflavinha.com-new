import { defineConfig, devices } from "@playwright/test";

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
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:4322",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Não usa `astro preview`: nesta versão ele sempre vira daemon (o processo
    // sai assim que sobe) e ignora --port quando já existe um daemon de outra
    // execução. O Playwright precisa de um processo vivo e de porta previsível.
    // Ver o comentário em scripts/servir-dist.mjs.
    command: "npm run build && node scripts/servir-dist.mjs 4322",
    url: "http://localhost:4322",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
