import { MessageCircle } from "lucide-react";
import { linkWhatsApp } from "@/lib/site";

const WhatsAppButton = () => {
  return (
    <a
      href={linkWhatsApp("Oi! Vim pelo site do Mundo Flavinha.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
