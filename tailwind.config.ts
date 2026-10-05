import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.md",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Source Serif Pro", "Georgia", "serif"],
      },
      colors: {
        ink: "#0f172a",
        paper: "#f6f8fc",
        accent: "#2563eb",
        "accent-deep": "#1e40af",
        navy: "#0a1740",
        "navy-2": "#10255e",
        glow: "#38bdf8",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "72ch",
            color: "#0f172a",
            h1: { fontFamily: "Source Serif Pro, Georgia, serif" },
            h2: { fontFamily: "Source Serif Pro, Georgia, serif" },
            h3: { fontFamily: "Source Serif Pro, Georgia, serif" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
