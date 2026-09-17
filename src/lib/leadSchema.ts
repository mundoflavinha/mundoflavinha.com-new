/**
 * Validação do payload de `api/lead.ts`, extraída para cá para ser testável
 * sem tocar em `DATABASE_URL` nem no client do Neon (que `api/lead.ts`
 * instancia no top-level do módulo).
 */
import { z } from "zod";
// Extensão .js obrigatória: este módulo é carregado por api/lead.ts sob ESM
// nativo do Node ("type": "module"), onde import relativo sem extensão estoura
// ERR_MODULE_NOT_FOUND em runtime. Typecheck e testes não pegam — ambos usam
// resolução de bundler. Ver src/test/apiEsm.test.ts.
import { FAIXA_ETARIA_VALUES, PERFIL_VALUES } from "./consent.js";

/**
 * Janela de preenchimento aceita. Fora dela, `api/lead.ts` responde SUCESSO
 * FALSO: status 201 com `{ ok: true }`, sem gravar nada.
 *
 * Vivem aqui, e não na function, porque o front precisa dos mesmos números:
 * `leadApi.ts` usa-os para NÃO disparar o evento de conversão quando sabe que
 * o envio caiu no sucesso falso. Duplicar os valores faria as duas metades
 * divergirem no primeiro ajuste, e a divergência seria invisível — a medição
 * contaria conversões que o banco nunca recebeu.
 *
 * Deliberadamente NÃO expostos na resposta da API: devolver um campo dizendo
 * "não gravei" ensinaria um bot a fazer busca binária nestes limiares.
 */
export const MIN_PREENCHIMENTO_MS = 2_000;
export const MAX_PREENCHIMENTO_MS = 12 * 60 * 60 * 1000;

/** true quando o envio será tratado como bot e descartado em silêncio. */
export const caiuNoSucessoFalso = (elapsedMs: number | undefined): boolean =>
  elapsedMs !== undefined &&
  (elapsedMs < MIN_PREENCHIMENTO_MS || elapsedMs > MAX_PREENCHIMENTO_MS);

const comoObjeto = (body: unknown): Record<string, unknown> | null =>
  body && typeof body === "object" && !Array.isArray(body) ? (body as Record<string, unknown>) : null;

/** Honeypot com qualquer conteúdo. Checado ANTES dos schemas. */
export const honeypotPreenchido = (body: unknown): boolean => {
  const hp = comoObjeto(body)?.hp;
  return typeof hp === "string" ? hp.length > 0 : hp !== undefined && hp !== null;
};

/**
 * Cliente legado nunca mandou `consentVersion` nem `origem`. Payload com
 * qualquer um dos dois é do formulário atual: se falhou o schema, é inválido
 * — não pode ser "resgatado" pelo schema antigo, que grava consentimento
 * presumido.
 */
export const podeSerLegado = (body: unknown): boolean => {
  const obj = comoObjeto(body);
  return !!obj && !("consentVersion" in obj) && !("origem" in obj);
};

const textoCurto = z.string().trim().max(255).optional();

const baseSchema = z.object({
  consentVersion: z.string().trim().min(1).max(20),
  email: z.string().trim().toLowerCase().email().max(254),
  nome: z.string().trim().min(1).max(200).optional(),
  whatsapp: z.string().trim().min(8).max(30).optional(),
  optInEmail: z.boolean(),
  optInWhatsapp: z.boolean(),
  path: z.string().trim().max(200).optional(),
  /** Honeypot: campo escondido. Qualquer conteúdo reprova. */
  hp: z.string().max(0).optional(),
  /** Tempo decorrido desde a renderização do formulário. Relativo, imune a relógio errado. */
  elapsedMs: z.number().int().nonnegative().optional(),
  /*
   * Atribuição, em dois grupos separados de propósito (ver
   * src/lib/atribuicao/tipos.ts). Sem validação de formato: quem decide se
   * algo daqui chega ao banco é api/lead.ts. O schema só limita tamanho.
   */
  campanha: z
    .object({
      utmSource: textoCurto,
      utmMedium: textoCurto,
      utmCampaign: textoCurto,
      utmContent: textoCurto,
      utmTerm: textoCurto,
    })
    .strict()
    .optional(),
  identificadoresMidia: z.object({ fbclid: textoCurto, fbp: textoCurto, fbc: textoCurto }).strict().optional(),
  faixaEtaria: z.enum(FAIXA_ETARIA_VALUES as unknown as [string, ...string[]]).optional(),
  perfil: z.enum(PERFIL_VALUES as unknown as [string, ...string[]]).optional(),
});

const newsletterSchema = baseSchema.extend({
  type: z.literal("newsletter"),
  origem: z.enum(["newsletter_full", "newsletter_compact"]),
});

const leadMagnetSchema = baseSchema.extend({
  type: z.literal("lead_magnet"),
  nome: z.string().trim().min(1).max(200),
  material: z.string().trim().min(1).max(200),
  origem: z.literal("lead_magnet"),
});

export const payloadSchema = z
  .discriminatedUnion("type", [newsletterSchema, leadMagnetSchema])
  .refine((data) => !data.optInWhatsapp || !!data.whatsapp, {
    message: "optInWhatsapp exige whatsapp preenchido",
  });

/**
 * Shape antigo, aceito por UMA release.
 * Motivo: front e API sobem juntos, mas uma aba aberta há 20 minutos ainda tem
 * o bundle velho. Sem isso, esse envio vira 400 e o lead se perde em silêncio.
 * `idadeCrianca` é intencionalmente DESCARTADO — é justamente o dado que a
 * issue #3 mandou parar de coletar.
 */
export const legacySchema = z.object({
  type: z.enum(["newsletter", "lead_magnet"]),
  nome: z.string().trim().max(200).optional(),
  email: z.string().trim().toLowerCase().email().max(254),
  whatsapp: z.string().trim().max(30).optional(),
  material: z.string().trim().max(200).optional(),
  consentimento: z.boolean().optional(),
});

export type LeadPayload = z.infer<typeof payloadSchema>;
export type LegacyLeadPayload = z.infer<typeof legacySchema>;
