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
        // ヨアケ design tokens — Pinterest warm / paper aesthetic
        yoake: {
          bg:            "#F5EDE0", // paper cream
          "bg-card":     "#EDE3CF", // card surface
          "bg-surface":  "#E6D9C2", // inner surface
          border:        "#C9B99A", // warm beige border
          accent:        "#C9805E", // terracotta
          "accent-hover":"#B56B49",
          warm:          "#E8B4A0", // dawn pink (was gold)
          ink:           "#2C2926", // dark ink
          "text-primary":"#2C2926",
          "text-secondary":"#5A4540",
          "text-muted":  "#8B9DAE", // faded blue
          moss:          "#6B7C5A", // moss green
          "dialog-bg":   "#1E1814", // dark warm for dialog box
          "dialog-border":"#C9B99A",
          "question-dim":"#C9B99A",
          "question-mid":"#9BAE8C",
          "question-deep":"#6B7C5A",
        },
      },
      fontFamily: {
        // Yusei Magic — handwritten, warm UI headings
        ui:     ["'Yusei Magic'", "'Noto Serif JP'", "serif"],
        // DotGothic16 — pixel/retro, RPG dialog boxes
        dialog: ["'DotGothic16'", "monospace"],
        // Noto Serif JP — body text, serif
        serif:  ["'Noto Serif JP'", "serif"],
        // Keep sans as fallback
        sans:   ["'Noto Serif JP'", "sans-serif"],
        mono:   ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-in":   "fadeIn 0.3s ease-in-out",
        "slide-up":  "slideUp 0.4s ease-out",
        "pulse-soft":"pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};
