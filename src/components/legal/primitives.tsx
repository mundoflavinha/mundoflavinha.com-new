import { ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * Primitivas de texto para as páginas legais.
 *
 * Por que existem: `@tailwindcss/typography` está no package.json mas NÃO está
 * registrado em `plugins` do tailwind.config.ts, então toda classe `prose*` do
 * projeto é no-op. Sem o plugin, o preflight do Tailwind zera marcador de lista
 * e estilo de link. Estes componentes repõem isso de forma consistente, sem
 * depender de lembrar as classes em cada uma das dezenas de listas.
 */

export const LegalP = ({ children }: { children: ReactNode }) => (
  <p className="leading-relaxed">{children}</p>
);

export const LegalList = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc space-y-2 pl-5 leading-relaxed">{children}</ul>
);

export const LegalOrderedList = ({ children }: { children: ReactNode }) => (
  <ol className="list-decimal space-y-2 pl-5 leading-relaxed">{children}</ol>
);

export const LegalSubtitle = ({ children }: { children: ReactNode }) => (
  <h3 className="mt-6 font-heading text-base font-bold text-foreground">{children}</h3>
);

const linkClasses = "text-primary underline underline-offset-2 hover:opacity-80 transition-opacity";

export const LegalLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className={linkClasses}>
    {children}
  </Link>
);

export const LegalExternalLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
    {children}
  </a>
);

export const LegalMailto = ({ email }: { email: string }) => (
  <a href={`mailto:${email}`} className={linkClasses}>
    {email}
  </a>
);

/** Destaque para informação que a LGPD exige apresentar "com destaque". */
export const LegalHighlight = ({ children }: { children: ReactNode }) => (
  <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 leading-relaxed">{children}</div>
);

/** Tabela simples e responsiva para listas de dados/finalidades/operadores. */
export const LegalTable = ({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[32rem] border-collapse text-sm">
      <thead>
        <tr className="border-b border-border text-left">
          {headers.map((header) => (
            <th key={header} className="py-2 pr-4 font-heading font-bold text-foreground">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b border-border/60 align-top">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="py-2 pr-4 leading-relaxed">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
