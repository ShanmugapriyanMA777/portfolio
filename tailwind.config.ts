import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#f3f4f6",
        primary: {
          DEFAULT: "#D4AF37", // Metallic Gold
          hover: "#bfa030",
          glow: "rgba(212, 175, 55, 0.4)",
        },
        secondary: {
          DEFAULT: "#C5A880", // Champagne Gold
          hover: "#b39873",
        },
        accent: {
          DEFAULT: "#E5D5C0", // Warm Cream Gold
          glow: "rgba(229, 213, 192, 0.4)",
        },
        purpleAccent: {
          DEFAULT: "#AA7C11", // Deep Bronze/Gold Accent
          glow: "rgba(170, 124, 17, 0.4)",
        },
        cardGlass: {
          DEFAULT: "rgba(15, 15, 20, 0.65)",
          border: "rgba(255, 255, 255, 0.08)",
          hoverBorder: "rgba(212, 175, 55, 0.3)",
        }
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "Inter", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
      },
      animation: {
        "aurora": "aurora 20s linear infinite",
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "grid-move": "grid-move 20s linear infinite",
        "typing": "typing 3.5s steps(40, end), blink-caret .75s step-end infinite",
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(2deg)" },
        },
        "grid-move": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(50px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      },
      backgroundImage: {
        "noise-pattern": "url('/images/noise.png')",
        "grid-pattern": "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        "premium": "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
        "glow-primary": "0 0 20px 2px rgba(255, 46, 99, 0.35)",
        "glow-accent": "0 0 20px 2px rgba(0, 229, 255, 0.35)",
      }
    },
  },
  plugins: [],
} satisfies Config;
