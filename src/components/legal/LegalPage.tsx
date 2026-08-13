import { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { LEGAL_ATUALIZADO_EM, LEGAL_EM_REVISAO, LEGAL_VERSAO } from "@/lib/site";

export type LegalSectionData = {
  /** Usado como âncora (#id). Manter estável: vira link em e-mail e pode ser citado. */
  id: string;
  title: string;
  content: ReactNode;
};

interface LegalPageProps {
  title: string;
  subtitle?: string;
  bgColor?: string;
  sections: LegalSectionData[];
  /** Documentos com força jurídica mostram versão/data; a página de Contato não precisa. */
  showVersion?: boolean;
}

const LegalPage = ({ title, subtitle, bgColor = "bg-lilac/15", sections, showVersion = true }: LegalPageProps) => (
  <Layout>
    <PageBanner title={title} subtitle={subtitle} bgColor={bgColor} />

    <section className="py-12 md:py-16">
      <div className="container max-w-3xl">
        {LEGAL_EM_REVISAO && showVersion && (
          <div className="mb-8 flex gap-3 rounded-xl border border-amber-400/40 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>
              <strong className="font-heading font-bold">Documento em revisão.</strong> Este texto é uma versão
              preliminar, ainda em análise jurídica, e alguns dados de identificação estão pendentes de preenchimento.
              Se algo aqui não estiver claro, fale com a gente antes de enviar seus dados.
            </p>
          </div>
        )}

        {showVersion && (
          <p className="text-xs text-muted-foreground">
            Última atualização: {LEGAL_ATUALIZADO_EM} · Versão {LEGAL_VERSAO}
          </p>
        )}

        {sections.length > 1 && (
          <nav aria-label="Índice" className="mt-8 rounded-2xl bg-secondary/40 p-5">
            <h2 className="font-heading text-sm font-bold text-foreground">Nesta página</h2>
            <ol className="mt-3 space-y-1.5">
              {sections.map((section, index) => (
                <li key={section.id} className="text-sm">
                  <a
                    href={`#${section.id}`}
                    className="text-muted-foreground underline-offset-2 transition-colors hover:text-primary hover:underline"
                  >
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-10 space-y-10">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                {sections.length > 1 && <span className="text-primary">{index + 1}. </span>}
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-foreground/80">{section.content}</div>
            </section>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default LegalPage;
