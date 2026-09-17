/**
 * Globais de vendor. Só `src/lib/tagging/` toca nisto — há teste que varre
 * `src/` e falha se `gtag(`, `fbq` ou `dataLayer.push` aparecerem fora daqui.
 *
 * `window.gtag` e `window.dataLayer` nascem inline no <head>
 * (ConsentModeDefaults.astro). Nenhum código aqui os recria: sobrescrever
 * `gtag` descartaria a fila onde está o `consent default`.
 */

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: Fbq;
    _fbq?: Fbq;
    [desligarGa: `ga-disable-${string}`]: boolean | undefined;
  }
}

export type { Fbq };

export const dataLayer = (): unknown[] => {
  window.dataLayer = window.dataLayer ?? [];
  return window.dataLayer;
};

/** Anexa um script externo uma única vez por URL. */
export function anexarScript(src: string): void {
  if (Array.from(document.scripts).some((s) => s.src === src)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}
