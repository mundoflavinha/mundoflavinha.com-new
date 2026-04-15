import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import { motion } from "framer-motion";

const materials = [
  { name: "Roda das Emoções", emoji: "🎡", desc: "Ajude seu filho a identificar e expressar sentimentos", color: "bg-pink/30" },
  { name: "Desafio 7 Dias Sem Telas", emoji: "📵", desc: "Um desafio divertido para reconectar a família", color: "bg-baby-blue/30" },
  { name: "Cartas de Sentimentos", emoji: "💌", desc: "Cartas ilustradas para conversar sobre emoções", color: "bg-pastel-yellow/30" },
  { name: "Jogo da Memória", emoji: "🧩", desc: "Jogo de memória para imprimir e brincar", color: "bg-mint/30" },
  { name: "Calendário de Brincadeiras", emoji: "📅", desc: "30 dias de brincadeiras para fazer em família", color: "bg-lilac/30" },
  { name: "Kit Recorte e Cole", emoji: "✂️", desc: "Atividade de coordenação motora para pequenos", color: "bg-pink/20" },
];

const Downloads = () => {
  const [downloadModal, setDownloadModal] = useState<string | null>(null);

  return (
    <Layout>
      <PageBanner
        title="Downloads Gratuitos"
        subtitle="Materiais gratuitos para imprimir e brincar em casa com seus filhos"
        bgColor="bg-baby-blue/20"
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer"
                onClick={() => setDownloadModal(item.name)}
              >
                <div className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4`}>
                  {item.emoji}
                </div>
                <h3 className="font-heading font-bold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                <Button className="mt-4 rounded-full bg-primary text-primary-foreground font-heading font-bold gap-2">
                  <Download className="w-4 h-4" /> Baixar grátis
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LeadCaptureModal
        isOpen={!!downloadModal}
        onClose={() => setDownloadModal(null)}
        materialName={downloadModal || ""}
      />
    </Layout>
  );
};

export default Downloads;
