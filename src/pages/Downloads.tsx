import { useState } from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import jogoDaReciclagem from "@/assets/downloadgratuito/JogodaReciclagem.png";
import jogoDaTampinha from "@/assets/downloadgratuito/JogodaTampinha.png";
import semaforoDoToque from "@/assets/downloadgratuito/semaforodotoque.png";
import coleteEducativo from "@/assets/downloadgratuito/coleteeducativo.png";

const materials = [
  { name: "Jogo da Reciclagem", img: jogoDaReciclagem },
  { name: "Cada Tampinha no Seu Lugar", img: jogoDaTampinha },
  { name: "Semáforo do Toque", img: semaforoDoToque },
  { name: "Colete Educativo", img: coleteEducativo },
];

const Downloads = () => {
  const [downloadModal, setDownloadModal] = useState<string | null>(null);

  return (
    <Layout>
      <PageBanner
        title="Materiais gratuitos para imprimir e brincar"
        subtitle="Atividades educativas prontas para famílias, professores e escolas incentivarem o aprendizado de forma lúdica."
        bgColor="bg-baby-blue/20"
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <p className="text-sm font-medium text-muted-foreground">{materials.length} materiais disponíveis</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {materials.map((item) => (
              <motion.article
                key={item.name}
                whileHover={{ y: -4 }}
                className="overflow-hidden rounded-2xl bg-card text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setDownloadModal(item.name)}
                  className="group block w-full cursor-pointer text-center"
                >
                  <div className="aspect-square overflow-hidden bg-secondary">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-heading text-base font-bold text-foreground transition-colors group-hover:text-primary">
                      {item.name}
                    </h2>
                    <Button
                      size="sm"
                      className="mt-3 rounded-full bg-primary text-xs font-heading font-semibold text-primary-foreground gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Baixar grátis
                    </Button>
                  </div>
                </button>
              </motion.article>
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
