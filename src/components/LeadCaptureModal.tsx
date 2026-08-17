import { useCallback, useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import ConsentFields, { HoneypotField } from "@/components/ConsentFields";
import { comLinkPolitica } from "@/lib/consentText";
import { CONSENT_TEXTS, FAIXAS_ETARIAS, PERFIS, type FaixaEtaria, type Perfil } from "@/lib/consent";
import { enviarLead } from "@/lib/leadApi";
import { MATERIAIS, getMaterialPorId, type Material } from "@/data/materiais";
import { EVENTO_ABRIR_MATERIAL, SELETOR_MAILBOX, type DetalheAbrirMaterial } from "@/lib/leadBridge";

/**
 * Ilha React. Dona integral do próprio estado de abertura.
 *
 * Antes recebia `isOpen`/`onClose`/`materialName` da página, que era um
 * componente React de 421 linhas. Isso não sobrevive à migração por um motivo
 * estrutural, não estético: props de função não atravessam a fronteira entre
 * `.astro` e ilha (não há como serializar `onClose`). Os gatilhos agora são
 * HTML estático e falam com esta ilha por um protocolo explícito — ver
 * src/lib/leadBridge.ts e LeadModal.astro.
 *
 * O material chega como ID do catálogo, não como título. Antes o mesmo string
 * era simultaneamente o texto do card, o valor gravado no banco e — via
 * slugify — o nome do arquivo PDF; renomear o material no card mudava a URL do
 * download em silêncio.
 */

type Status = "idle" | "loading" | "error";

const camposIniciais = {
  nome: "",
  email: "",
  whatsapp: "",
  perfil: "" as Perfil | "",
  faixaEtaria: "" as FaixaEtaria | "",
};

// `<select>` nativo em vez do Select do shadcn: são só 4 opções, funciona
// melhor no mobile e evita mais um portal aninhado dentro do Dialog.
const selectClasses =
  "flex h-10 w-full rounded-xl border border-border bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm";

const LeadCaptureModal = () => {
  const [material, setMaterial] = useState<Material | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [optIn, setOptIn] = useState({ optInEmail: false, optInWhatsapp: false });
  const [formData, setFormData] = useState(camposIniciais);
  const [honeypot, setHoneypot] = useState("");
  const abertoEm = useRef(Date.now());
  /** Guarda quem abriu, para devolver o foco ao fechar. */
  const acionador = useRef<HTMLElement | null>(null);

  const abrir = useCallback((idMaterial: string, idAcionador: string | null) => {
    const encontrado = getMaterialPorId(idMaterial);
    // Só aceita ID do catálogo: qualquer outro script na página poderia
    // disparar o evento com um valor arbitrário, e o material acaba no banco.
    if (!encontrado) return;

    acionador.current = idAcionador ? document.getElementById(idAcionador) : null;
    abertoEm.current = Date.now();
    setMaterial(encontrado);
  }, []);

  useEffect(() => {
    const aoAbrirMaterial = (evento: Event) => {
      const { material: id, acionador: idAcionador } = (evento as CustomEvent<DetalheAbrirMaterial>).detail ?? {};
      if (typeof id === "string") abrir(id, idAcionador ?? null);
    };

    // A ORDEM IMPORTA: registrar o listener ANTES de drenar a caixa. Como não
    // há preempção no meio desta pilha, nenhum clique cabe entre as duas
    // linhas. Ao contrário: drenar primeiro deixaria um clique acontecido
    // nesse intervalo cair no vazio — exatamente o bug que a caixa existe para
    // evitar.
    window.addEventListener(EVENTO_ABRIR_MATERIAL, aoAbrirMaterial);

    const mailbox = document.querySelector<HTMLElement>(SELETOR_MAILBOX);
    const pendente = mailbox?.dataset.pendente;
    if (pendente) {
      abrir(pendente, mailbox?.dataset.acionador ?? null);
      delete mailbox!.dataset.pendente;
      delete mailbox!.dataset.acionador;
    }
    // Sinaliza para o script inline que ele não precisa mais bufferizar nem
    // contar tempo até a falha.
    if (mailbox) mailbox.dataset.estado = "hidratado";

    return () => window.removeEventListener(EVENTO_ABRIR_MATERIAL, aoAbrirMaterial);
  }, [abrir]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || !material) return;

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
        // O NOME, não o id: é o que já está gravado em material_requests
        // para os cadastros existentes.
        material: material.nome,
        optInEmail: optIn.optInEmail,
        // Sem número informado, não existe decisão sobre WhatsApp a registrar.
        optInWhatsapp: formData.whatsapp ? optIn.optInWhatsapp : false,
        hp: honeypot,
        // Desde a ABERTURA do modal, não desde o carregamento da página: quem
        // deixa a aba aberta o dia inteiro e só então clica estouraria o teto
        // de 12h de api/lead.ts e teria o cadastro descartado em silêncio.
        elapsedMs: Date.now() - abertoEm.current,
      });

      setStatus("idle");
      setSubmitted(true);
    } catch {
      setStatus("error");
    }
  };

  // Roda em QUALQUER fechamento — X, ESC ou clique fora. Antes só o X
  // limpava o formulário, então fechar por outro caminho deixava os dados
  // preenchidos para a próxima abertura.
  const handleOpenChange = (aberto: boolean) => {
    if (aberto) return;
    setSubmitted(false);
    setStatus("idle");
    setOptIn({ optInEmail: false, optInWhatsapp: false });
    setFormData(camposIniciais);
    setHoneypot("");
    setMaterial(null);

    // Devolve o foco ao card que abriu. O Radix restaura o `activeElement` de
    // antes da abertura, o que cobre o caso normal — mas não o caso em que o
    // modal abriu pela caixa de entrada, já depois de o foco ter saído dali.
    const alvo = acionador.current;
    acionador.current = null;
    if (alvo?.isConnected) requestAnimationFrame(() => alvo.focus());
  };

  return (
    <Dialog open={material !== null} onOpenChange={handleOpenChange}>
      <DialogContent
        // Mantém o visual anterior: o padrão do Radix é bg-black/80, bem mais
        // duro que o overlay suave que este modal já usava.
        overlayClassName="bg-foreground/30 backdrop-blur-sm"
        className="max-h-[90vh] w-[calc(100%-2rem)] max-w-md gap-0 overflow-y-auto rounded-2xl border-0 bg-card p-6 shadow-2xl md:p-8"
      >
        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-pastel-yellow flex items-center justify-center mx-auto mb-3">
                <Download className="w-6 h-6 text-foreground" />
              </div>
              <DialogTitle className="font-heading font-bold text-xl text-foreground">
                {material?.nome ?? ""}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Preencha seus dados para baixar gratuitamente
              </DialogDescription>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <HoneypotField value={honeypot} onChange={setHoneypot} />

              <label className="sr-only" htmlFor="lead-nome">
                Seu nome
              </label>
              <Input
                id="lead-nome"
                placeholder="Seu nome"
                autoComplete="name"
                required
                className="rounded-xl border-border"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />

              <label className="sr-only" htmlFor="lead-email">
                Seu e-mail
              </label>
              <Input
                id="lead-email"
                type="email"
                placeholder="Seu e-mail"
                autoComplete="email"
                required
                className="rounded-xl border-border"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <label className="sr-only" htmlFor="lead-whatsapp">
                WhatsApp com DDD (opcional)
              </label>
              <Input
                id="lead-whatsapp"
                placeholder="WhatsApp com DDD (opcional)"
                autoComplete="tel"
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
                <p role="alert" className="text-xs text-destructive">
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
            <DialogTitle className="font-heading font-bold text-xl text-foreground mb-2">Pronto!</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm mb-4">
              Seu cadastro foi recebido. Baixe o material abaixo.
            </DialogDescription>
            <a
              href={material?.pdf ?? MATERIAIS[0].pdf}
              download
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-heading font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Download className="w-4 h-4" />
              Baixar agora
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;
