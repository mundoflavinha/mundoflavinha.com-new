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
