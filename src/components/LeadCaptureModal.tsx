import { useState } from "react";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

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

const LeadCaptureModal = ({ isOpen, onClose, materialName }: LeadCaptureModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [consentimento, setConsentimento] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", whatsapp: "", idadeCrianca: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentimento || status === "loading") return;

    setStatus("loading");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "lead_magnet",
          nome: formData.nome,
          email: formData.email,
          whatsapp: formData.whatsapp,
          idadeCrianca: formData.idadeCrianca || undefined,
          material: materialName,
          consentimento: true,
        }),
      });

      if (!response.ok) throw new Error("request failed");

      setStatus("idle");
      setSubmitted(true);
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setStatus("idle");
    setConsentimento(false);
    setFormData({ nome: "", email: "", whatsapp: "", idadeCrianca: "" });
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
            className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
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
                    placeholder="WhatsApp (com DDD)"
                    required
                    className="rounded-xl border-border"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  />
                  <Input
                    placeholder="Idade da criança (opcional)"
                    className="rounded-xl border-border"
                    value={formData.idadeCrianca}
                    onChange={(e) => setFormData({ ...formData, idadeCrianca: e.target.value })}
                  />
                  <label className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Checkbox
                      checked={consentimento}
                      onCheckedChange={(checked) => setConsentimento(checked === true)}
                      className="mt-0.5"
                    />
                    Concordo em fornecer meus dados para receber o material e comunicações do Mundo Flavinha. Posso cancelar quando quiser.
                  </label>
                  {status === "error" && (
                    <p className="text-xs text-destructive">Não foi possível enviar seus dados. Tente novamente em instantes.</p>
                  )}
                  <Button
                    type="submit"
                    disabled={!consentimento || status === "loading"}
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
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground font-heading font-bold px-4 py-2 text-sm hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  Baixar agora
                </a>
                <p className="mt-4 text-xs text-muted-foreground">
                  💬 Entre também no nosso grupo do WhatsApp!
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadCaptureModal;
