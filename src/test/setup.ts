import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom não implementa scrollTo, IntersectionObserver nem ResizeObserver. Sem
// isso, qualquer página com `motion.whileInView` (framer-motion) ou um
// Checkbox do Radix (usa ResizeObserver internamente) derruba o render com
// "X is not defined" — não é bug do app, é lacuna do ambiente de teste;
// browsers de verdade têm os três.
window.scrollTo = () => {};

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
// @ts-expect-error -- stub mínimo, não precisa satisfazer o tipo inteiro do DOM
window.IntersectionObserver = ObserverStub;
window.ResizeObserver = ObserverStub;
