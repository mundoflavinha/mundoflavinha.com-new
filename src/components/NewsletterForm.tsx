import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "loading" | "success" | "error";

interface NewsletterFormProps {
  variant?: "compact" | "full";
}

const NewsletterForm = ({ variant = "compact" }: NewsletterFormProps) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "newsletter",
          nome: variant === "full" && nome ? nome : undefined,
          email,
          whatsapp: variant === "full" && whatsapp ? whatsapp : undefined,
        }),
      });

      if (!response.ok) throw new Error("request failed");

      setStatus("success");
      setNome("");
      setEmail("");
      setWhatsapp("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return <p className="text-sm text-muted-foreground">Inscrição confirmada! Fique de olho no seu e-mail. 💌</p>;
  }

  if (variant === "full") {
    return (
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
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
          placeholder="WhatsApp (com DDD)"
          className="rounded-full border-border text-center"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Ao enviar, você concorda em receber comunicações do Mundo Flavinha. Você pode cancelar quando quiser.
        </p>
        {status === "error" && <p className="text-xs text-destructive">Não foi possível enviar. Tente novamente.</p>}
        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-primary text-primary-foreground font-heading font-bold text-base h-12 disabled:opacity-50"
        >
          {status === "loading" ? "Enviando..." : "Quero receber ✨"}
        </Button>
      </form>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
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
          disabled={status === "loading"}
          className="h-10 w-10 shrink-0 rounded-full bg-primary p-0 text-primary-foreground disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
      {status === "error" && <p className="mt-1 text-xs text-destructive">Não foi possível enviar. Tente novamente.</p>}
      <p className="mt-2 text-xs text-muted-foreground">
        Ao assinar, você concorda em receber nossos e-mails. Cancele quando quiser.
      </p>
    </div>
  );
};

export default NewsletterForm;
