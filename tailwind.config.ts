import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#060708", // obsidian base
          900: "#0b0d10", // window body
          800: "#111419", // raised surface / chrome
          700: "#1a1f26", // hairlines
          600: "#262c35", // strong borders
        },
        fg: {
          DEFAULT: "#e4e7eb",
          muted: "#8b939e",
          dim: "#5a626d",
        },
        term: {
          green: "#4ade9a",
          cyan: "#67d4e8",
          amber: "#e8c46a",
          red: "#f07178",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        blink: { "0%, 49%": { opacity: "1" }, "50%, 100%": { opacity: "0" } },
      },
      animation: {
        blink: "blink 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
