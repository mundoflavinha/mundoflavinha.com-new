import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  // Só `./src` existe — os globs para ./pages, ./components e ./app eram
  // convenção de Next.js herdada do template e nunca casaram com nada aqui.
  content: ["./src/**/*.{astro,ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        // Nomes das famílias VARIÁVEIS do @fontsource — 'Quicksand Variable' e
        // 'Nunito Variable' são o que os @font-face declaram. O nome sem
        // sufixo cairia direto no fallback sans-serif, sem erro nenhum.
        heading: ['Quicksand Variable', 'Quicksand', 'sans-serif'],
        body: ['Nunito Variable', 'Nunito', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        lilac: "hsl(var(--lilac))",
        pink: "hsl(var(--pink))",
        "baby-blue": "hsl(var(--baby-blue))",
        "pastel-yellow": "hsl(var(--pastel-yellow))",
        mint: "hsl(var(--mint))",
        "warm-white": "hsl(var(--warm-white))",

        // Paleta do hero/header novo — ver bloco de tokens em global.css.
        creme: "hsl(var(--creme))",
        plum: "hsl(var(--plum))",
        uva: "hsl(var(--uva))",
        coral: "hsl(var(--coral))",
        "roxo-cta": "hsl(var(--roxo-cta))",
        "rosa-pill": "hsl(var(--rosa-pill))",
        "rosa-borda": "hsl(var(--rosa-borda))",
        "texto-suave": "hsl(var(--texto-suave))",
        "lilas-blob": "hsl(var(--lilas-blob))",
        "lilas-claro": "hsl(var(--lilas-claro))",
        "coral-blob": "hsl(var(--coral-blob))",
        "coral-blob-escuro": "hsl(var(--coral-blob-escuro))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "flutua-suave": {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" },
        },
        "gira-leve": {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "flutua-suave": "flutua-suave 6s ease-in-out infinite",
        "gira-leve": "gira-leve 7s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
