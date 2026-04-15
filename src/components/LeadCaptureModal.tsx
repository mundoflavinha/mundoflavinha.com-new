import { useState } from "react";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  materialName: string;
}

const LeadCaptureModal = ({ isOpen, onClose, materialName }: LeadCaptureModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", whatsapp: "", idadeCrianca: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
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
                  <p className="text-xs text-muted-foreground">
                    Ao enviar, você concorda em receber comunicações do Mundo Flavinha. Você pode cancelar a qualquer momento.
                  </p>
                  <Button type="submit" className="w-full rounded-full bg-primary text-primary-foreground font-heading font-bold">
                    Quero baixar grátis!
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">Pronto!</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Seu material está pronto para download. Também enviamos para seu e-mail!
                </p>
                <Button className="rounded-full bg-primary text-primary-foreground font-heading font-bold gap-2">
                  <Download className="w-4 h-4" />
                  Baixar agora
                </Button>
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
