import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { HoneypotField } from "@/components/ConsentFields";
import { comLinkPolitica } from "@/lib/consentText";
import { CONSENT_TEXTS } from "@/lib/consent";
import { enviarLead } from "@/lib/leadApi";

type Status = "idle" | "loading" | "success" | "error";

interface NewsletterFormProps {
  variant?: "compact" | "full";
}

const NewsletterForm = ({ variant = "compact" }: NewsletterFormProps) => {
  const isFull = variant === "full";

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [optInEmail, setOptInEmail] = useState(false);
  const [optInWhatsapp, setOptInWhatsapp] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const renderedAt = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    // No variant full o aceite é a caixa; no compact, o próprio envio é o ato
    // afirmativo, e o aviso ao lado do botão explicita isso.
    if (isFull && !optInEmail) return;

    setStatus("loading");
    try {
      await enviarLead({
        type: "newsletter",
        origem: isFull ? "newsletter_full" : "newsletter_compact",
        email,
        nome: isFull && nome ? nome : undefined,
        whatsapp: isFull && whatsapp ? whatsapp : undefined,
        optInEmail: true,
        optInWhatsapp: isFull && whatsapp ? optInWhatsapp : false,
        hp: honeypot,
        elapsedMs: Date.now() - renderedAt.current,
      });

      setStatus("success");
      setNome("");
      setEmail("");
      setWhatsapp("");
      setOptInEmail(false);
      setOptInWhatsapp(false);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return <p className="text-sm text-muted-foreground">Inscrição confirmada! Fique de olho no seu e-mail. 💌</p>;
  }

  if (isFull) {
    return (
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <HoneypotField value={honeypot} onChange={setHoneypot} />

        <Input
          placeholder="Seu nome"
          className="rounded-full border-border text-center"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Seu e-mail"
          required
          className="rounded-full border-border text-center"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="WhatsApp com DDD (opcional)"
          className="rounded-full border-border text-center"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />

        <div className="space-y-2.5 rounded-xl bg-secondary/40 p-3 text-left">
          <label className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <Checkbox
              checked={optInEmail}
              onCheckedChange={(checked) => setOptInEmail(checked === true)}
              className="mt-0.5 shrink-0"
            />
            <span>{comLinkPolitica(CONSENT_TEXTS.email_marketing)}</span>
          </label>

          {whatsapp && (
            <label className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <Checkbox
                checked={optInWhatsapp}
                onCheckedChange={(checked) => setOptInWhatsapp(checked === true)}
                className="mt-0.5 shrink-0"
              />
              <span>{comLinkPolitica(CONSENT_TEXTS.whatsapp_marketing)}</span>
            </label>
          )}
        </div>

        {status === "error" && <p className="text-xs text-destructive">Não foi possível enviar. Tente novamente.</p>}

        <Button
          type="submit"
          disabled={status === "loading" || !optInEmail}
          className="h-12 w-full rounded-full bg-primary text-base font-heading font-bold text-primary-foreground disabled:opacity-50"
        >
          {status === "loading" ? "Enviando..." : "Quero receber ✨"}
        </Button>
      </form>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <HoneypotField value={honeypot} onChange={setHoneypot} />
        <Input
          type="email"
          placeholder="Seu e-mail"
          required
          className="rounded-full bg-card"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          aria-label="Assinar newsletter"
          disabled={status === "loading"}
          className="h-10 w-10 shrink-0 rounded-full bg-primary p-0 text-primary-foreground disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>

      {status === "error" && <p className="mt-1 text-xs text-destructive">Não foi possível enviar. Tente novamente.</p>}

      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {comLinkPolitica(CONSENT_TEXTS.newsletter_compact)}
      </p>
    </div>
  );
};

export default NewsletterForm;
