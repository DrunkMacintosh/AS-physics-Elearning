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
        primary: "#1a1a2e",
        accent: "#3b82f6",
        success: "#16a34a",
        warning: "#d97706",
        danger: "#dc2626",
        muted: "#6b7280",
      },
      fontFamily: {
        sans: ["'Segoe UI'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
