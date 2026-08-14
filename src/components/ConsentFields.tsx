import { Checkbox } from "@/components/ui/checkbox";
import { CONSENT_TEXTS } from "@/lib/consent";
import { comLinkPolitica } from "@/lib/consentText";

/**
 * Campo isca. Invisível para gente, preenchível por bot que completa tudo.
 * Não usa `display:none` de propósito: parte dos bots ignora campos ocultos
 * assim, e aí a isca não pega ninguém.
 */
export const HoneypotField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
    <label htmlFor="site-website">Não preencha este campo</label>
    <input
      id="site-website"
      name="website"
      type="text"
      tabIndex={-1}
      autoComplete="off"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </div>
);

interface ConsentFieldsProps {
  optInEmail: boolean;
  optInWhatsapp: boolean;
  onChange: (patch: { optInEmail?: boolean; optInWhatsapp?: boolean }) => void;
  /** Só mostra a caixa de WhatsApp se a pessoa escolheu informar o número. */
  showWhatsapp: boolean;
}

const ConsentFields = ({ optInEmail, optInWhatsapp, onChange, showWhatsapp }: ConsentFieldsProps) => (
  <div className="space-y-2.5 rounded-xl bg-secondary/40 p-3">
    <label className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-muted-foreground">
      <Checkbox
        checked={optInEmail}
        onCheckedChange={(checked) => onChange({ optInEmail: checked === true })}
        className="mt-0.5 shrink-0"
      />
      <span>{comLinkPolitica(CONSENT_TEXTS.email_marketing)}</span>
    </label>

    {showWhatsapp && (
      <label className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <Checkbox
          checked={optInWhatsapp}
          onCheckedChange={(checked) => onChange({ optInWhatsapp: checked === true })}
          className="mt-0.5 shrink-0"
        />
        <span>{comLinkPolitica(CONSENT_TEXTS.whatsapp_marketing)}</span>
      </label>
    )}
  </div>
);

export default ConsentFields;
