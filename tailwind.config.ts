import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        glitch: "glitch 3s infinite",
        flicker: "flicker 4s infinite",
        floatHeart: "floatHeart 6s ease-in infinite",
        blink: "blink 1s step-end infinite",
        fadeIn: "fadeIn 0.6s ease forwards",
        fadeScale: "fadeScale 0.5s ease forwards",
      },
      keyframes: {
        glitch: {
          "0%, 92%, 100%": {
            textShadow: "2px 0 #f0f, -2px 0 #0ff",
          },
          "93%": {
            textShadow: "-4px 0 #f0f, 4px 0 #0ff",
            transform: "skewX(-2deg)",
          },
          "95%": {
            textShadow: "4px 0 #f0f, -2px 0 #0ff",
            transform: "skewX(2deg)",
          },
          "97%": {
            textShadow: "-2px 2px #f0f, 2px -2px #0ff",
            transform: "skewX(0)",
          },
        },
        flicker: {
          "0%, 95%, 100%": { opacity: "1" },
          "96%": { opacity: "0.6" },
          "98%": { opacity: "0.8" },
        },
        floatHeart: {
          "0%": { opacity: "0", transform: "translateY(0) scale(0.5)" },
          "10%": { opacity: "0.4" },
          "80%": { opacity: "0.2" },
          "100%": {
            opacity: "0",
            transform: "translateY(-500px) scale(1.2) rotate(20deg)",
          },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeScale: {
          from: { opacity: "0", transform: "scale(0.92)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
