/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // LIGHTHOUSE design tokens
        lighthouse: {
          bg: "#0f1729",
          "bg-card": "#1a2540",
          "bg-surface": "#243050",
          border: "#2d3a5a",
          accent: "#4a7cdc",
          "accent-hover": "#6090e8",
          gold: "#c9a84c",
          "text-primary": "#e8eaf2",
          "text-secondary": "#8a94b2",
          "text-muted": "#5a6480",
          "question-dim": "#4a5068",
          "question-mid": "#3a5498",
          "question-deep": "#1a2d6e",
        },
      },
      fontFamily: {
        sans: ["'Noto Sans JP'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};
