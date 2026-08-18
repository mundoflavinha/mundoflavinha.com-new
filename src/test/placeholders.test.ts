import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CONTATO, CONTROLADOR, LEGAL_EM_REVISAO, WHATSAPP } from "@/lib/site";

/**
 * Trava de regressão para dados institucionais que já viraram issue uma vez:
 * o número de WhatsApp e o convite do grupo eram placeholders óbvios
 * (`5500000000000`, `chat.whatsapp.com/example`) publicados em produção por
 * um tempo (issue #12). Nada no build acusava isso — TypeScript não sabe
 * distinguir um número falso de um verdadeiro.
 */
describe("dados de WhatsApp não são placeholder", () => {
  it("número não é o placeholder conhecido", () => {
    expect(WHATSAPP.numero).not.toBe("5500000000000");
  });

  it("número é só dígitos, com código do país 55", () => {
    expect(WHATSAPP.numero).toMatch(/^55\d{10,11}$/);
  });

  it("se houver convite de grupo, não é o placeholder conhecido", () => {
    if (WHATSAPP.convitegrupo === null) return;
    expect(WHATSAPP.convitegrupo).not.toContain("/example");
  });

  it("se houver convite de grupo, é uma URL de chat.whatsapp.com", () => {
    if (WHATSAPP.convitegrupo === null) return;
    expect(() => new URL(WHATSAPP.convitegrupo!)).not.toThrow();
    expect(new URL(WHATSAPP.convitegrupo!).hostname).toBe("chat.whatsapp.com");
  });
});

/**
 * CONTROLADOR/CONTATO (issue #3) ainda têm placeholders reais — preencher é
 * ação do usuário, não algo que este código resolve. O invariante que
 * importa proteger é o inverso: enquanto existir um placeholder, o aviso de
 * "em revisão" (LEGAL_EM_REVISAO) não pode ter sido desligado por engano,
 * senão a Política/Termos passam a afirmar que foram revisados sem ter sido.
 */
describe("placeholders legais pendentes exigem o aviso de revisão", () => {
  const éPlaceholder = (valor: string) => /^\[.+\]$/.test(valor);

  const camposLegais = { ...CONTROLADOR, ...CONTATO };

  it("todo campo em formato de placeholder mantém LEGAL_EM_REVISAO ligado", () => {
    const pendentes = Object.entries(camposLegais).filter(([, v]) => typeof v === "string" && éPlaceholder(v));
    if (pendentes.length === 0) return;
    expect(
      LEGAL_EM_REVISAO,
      `Há placeholders pendentes (${pendentes.map(([k]) => k).join(", ")}) mas LEGAL_EM_REVISAO ` +
        `está false — o aviso de revisão não seria mais exibido nas páginas legais.`,
    ).toBe(true);
  });
});

/**
 * Varredura do código-fonte: reintroduzir os placeholders literais (ex.: um
 * merge desfeito, um copy-paste de um exemplo antigo) não deve passar
 * despercebido.
 */
describe("código-fonte não contém os placeholders literais conhecidos", () => {
  // .astro entrou no filtro abaixo junto com a migração: a maior parte da
  // cópia do site mora lá agora, e sem isso este teste continuaria passando
  // sem proteger nada.
  const PROIBIDOS = ["5500000000000", "chat.whatsapp.com/example"];

  const arquivosFonte = (dir: string): string[] => {
    const resultado: string[] = [];
    for (const nome of readdirSync(dir)) {
      if (nome === "test") continue; // este próprio arquivo cita os proibidos
      const caminho = join(dir, nome);
      const info = statSync(caminho);
      if (info.isDirectory()) resultado.push(...arquivosFonte(caminho));
      else if (/\.(ts|tsx|astro)$/.test(nome)) resultado.push(caminho);
    }
    return resultado;
  };

  it("nenhum arquivo contém os placeholders proibidos", () => {
    const violacoes = arquivosFonte(join(process.cwd(), "src")).flatMap((caminho) => {
      const conteudo = readFileSync(caminho, "utf-8");
      return PROIBIDOS.filter((p) => conteudo.includes(p)).map((p) => `"${p}" em ${caminho}`);
    });
    expect(violacoes, violacoes.join("\n")).toEqual([]);
  });
});
