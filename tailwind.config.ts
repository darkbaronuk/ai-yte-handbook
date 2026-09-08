import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./content/**/*.md"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Source Serif Pro", "Georgia", "serif"],
      },
      colors: {
        ink: "#0f172a",
        paper: "#fafaf7",
        accent: "#0f766e",
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
