import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F8F5EF",
          50: "#FCFAF6",
          100: "#F8F5EF",
          200: "#EFE9DC",
          300: "#E2D9C4",
        },
        charcoal: {
          DEFAULT: "#292929",
          50: "#6B6B6B",
          100: "#4D4D4D",
          200: "#3D3D3D",
          300: "#292929",
          400: "#1E1E1E",
          900: "#111111",
        },
        lavender: {
          DEFAULT: "#B9A7D4",
          light: "#E5DEF0",
          soft: "#F2EEF8",
          dark: "#846CA6",
        },
        gold: {
          DEFAULT: "#B89B5E",
          light: "#D8C496",
          soft: "#F3EDE0",
          dark: "#8E743F",
          zari: "#C5A96E",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      letterSpacing: {
        widest: ".25em",
        luxury: ".18em",
      },
      screens: {
        xs: "390px",
      },
    },
  },
  plugins: [],
};

export default config;
