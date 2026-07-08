import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171412",
        paper: "#faf8f4",
        surface: "#ffffff",
        night: "#0f1115",
        nightSurface: "#171a21",
        sienna: "#a6532f",
        plantain: "#f0c95a",
        sea: "#2c7a7b",
        guava: "#d96b6b",
        border: "#e7dfd4",
        muted: "#6f6860",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        calm: "0 24px 80px rgba(23,20,18,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
