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
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
