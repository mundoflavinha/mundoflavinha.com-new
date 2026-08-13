import { useEffect, useRef, useState } from "react";
import { X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ConsentFields, { HoneypotField, comLinkPolitica } from "@/components/ConsentFields";
import { CONSENT_TEXTS, FAIXAS_ETARIAS, PERFIS, type FaixaEtaria, type Perfil } from "@/lib/consent";
import { enviarLead } from "@/lib/leadApi";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  materialName: string;
}

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type Status = "idle" | "loading" | "error";

const camposIniciais = {
  nome: "",
  email: "",
  whatsapp: "",
  perfil: "" as Perfil | "",
  faixaEtaria: "" as FaixaEtaria | "",
};

// `<select>` nativo em vez do Select do shadcn: este modal não é um Dialog do
// Radix (é um motion.div com overlay próprio e stopPropagation), e o portal do
// Radix conflita com esse overlay — dá para clicar numa opção e fechar o modal.
const selectClasses =
  "flex h-10 w-full rounded-xl border border-border bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm";

const LeadCaptureModal = ({ isOpen, onClose, materialName }: LeadCaptureModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [optIn, setOptIn] = useState({ optInEmail: false, optInWhatsapp: false });
  const [formData, setFormData] = useState(camposIniciais);
  const [honeypot, setHoneypot] = useState("");
  const renderedAt = useRef(Date.now());

  useEffect(() => {
    if (isOpen) renderedAt.current = Date.now();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    try {
      await enviarLead({
        type: "lead_magnet",
        origem: "lead_magnet",
        nome: formData.nome,
        email: formData.email,
        whatsapp: formData.whatsapp || undefined,
        perfil: formData.perfil || undefined,
        faixaEtaria: formData.faixaEtaria || undefined,
        material: materialName,
        optInEmail: optIn.optInEmail,
        // Sem número informado, não existe decisão sobre WhatsApp a registrar.
        optInWhatsapp: formData.whatsapp ? optIn.optInWhatsapp : false,
        hp: honeypot,
        elapsedMs: Date.now() - renderedAt.current,
      });

      setStatus("idle");
      setSubmitted(true);
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setStatus("idle");
    setOptIn({ optInEmail: false, optInWhatsapp: false });
    setFormData(camposIniciais);
    setHoneypot("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              aria-label="Fechar"
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-pastel-yellow flex items-center justify-center mx-auto mb-3">
                    <Download className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground">{materialName}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Preencha seus dados para baixar gratuitamente</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <HoneypotField value={honeypot} onChange={setHoneypot} />

                  <Input
                    placeholder="Seu nome"
                    required
                    className="rounded-xl border-border"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  />
                  <Input
                    type="email"
                    placeholder="Seu e-mail"
                    required
                    className="rounded-xl border-border"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    placeholder="WhatsApp com DDD (opcional)"
                    className="rounded-xl border-border"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  />

                  <select
                    aria-label="Você é"
                    className={selectClasses}
                    value={formData.perfil}
                    onChange={(e) => setFormData({ ...formData, perfil: e.target.value as Perfil | "" })}
                  >
                    <option value="">Você é... (opcional)</option>
                    {PERFIS.map((perfil) => (
                      <option key={perfil.value} value={perfil.value}>
                        {perfil.label}
                      </option>
                    ))}
                  </select>

                  <select
                    aria-label="Faixa etária de interesse"
                    className={selectClasses}
                    value={formData.faixaEtaria}
                    onChange={(e) => setFormData({ ...formData, faixaEtaria: e.target.value as FaixaEtaria | "" })}
                  >
                    <option value="">Faixa etária de interesse (opcional)</option>
                    {FAIXAS_ETARIAS.map((faixa) => (
                      <option key={faixa.value} value={faixa.value}>
                        {faixa.label}
                      </option>
                    ))}
                  </select>

                  <ConsentFields
                    optInEmail={optIn.optInEmail}
                    optInWhatsapp={optIn.optInWhatsapp}
                    onChange={(patch) => setOptIn((atual) => ({ ...atual, ...patch }))}
                    showWhatsapp={Boolean(formData.whatsapp)}
                  />

                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {comLinkPolitica(CONSENT_TEXTS.entrega_material)}
                  </p>

                  {status === "error" && (
                    <p className="text-xs text-destructive">
                      Não foi possível enviar seus dados. Tente novamente em instantes.
                    </p>
                  )}

                  {/* Sem `disabled` por consentimento: receber o material não pode
                      depender de aceitar comunicação de marketing. */}
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-full bg-primary text-primary-foreground font-heading font-bold disabled:opacity-50"
                  >
                    {status === "loading" ? "Enviando..." : "Quero baixar grátis!"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">Pronto!</h3>
                <p className="text-muted-foreground text-sm mb-4">Seu cadastro foi recebido. Baixe o material abaixo.</p>
                <a
                  href={`/materiais/${slugify(materialName)}.pdf`}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-heading font-bold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Download className="w-4 h-4" />
                  Baixar agora
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadCaptureModal;
