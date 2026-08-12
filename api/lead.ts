import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

const sql = neon(process.env.DATABASE_URL!);

const newsletterSchema = z.object({
  type: z.literal("newsletter"),
  nome: z.string().trim().min(1).max(200).optional(),
  email: z.string().trim().toLowerCase().email().max(254),
  whatsapp: z.string().trim().min(1).max(30).optional(),
});

const leadMagnetSchema = z.object({
  type: z.literal("lead_magnet"),
  nome: z.string().trim().min(1).max(200),
  email: z.string().trim().toLowerCase().email().max(254),
  whatsapp: z.string().trim().min(1).max(30),
  idadeCrianca: z.string().trim().max(50).optional(),
  material: z.string().trim().min(1).max(200),
  consentimento: z.literal(true),
});

const payloadSchema = z.discriminatedUnion("type", [newsletterSchema, leadMagnetSchema]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = payloadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  const data = parsed.data;

  try {
    if (data.type === "newsletter") {
      await sql`
        insert into newsletter_subscribers (nome, email, whatsapp, consentimento)
        values (${data.nome ?? null}, ${data.email}, ${data.whatsapp ?? null}, true)
      `;
    } else {
      await sql`
        insert into lead_magnet_downloads (nome, email, whatsapp, idade_crianca, material, consentimento)
        values (${data.nome}, ${data.email}, ${data.whatsapp}, ${data.idadeCrianca ?? null}, ${data.material}, true)
      `;
    }
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("lead insert failed", err);
    return res.status(500).json({ error: "Não foi possível salvar seus dados. Tente novamente." });
  }
}
