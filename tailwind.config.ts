import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F7F7F6",
          soft: "#FBFBFA",
          muted: "#EFEFEA",
        },
        brand: {
          DEFAULT: "#F25D23",
          orange: "#F25D23",
          deep: "#E14E15",
          amber: "#F97316",
          light: "#FFA07A",
        },
        dark: {
          DEFAULT: "#121316",
          muted: "#555861",
          subtle: "#8E919C",
        },
      },
      fontFamily: {
        display: ["var(--font-boldonse)", "var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.05em",
        wider: "0.1em",
        widest: "0.18em",
      },
      lineHeight: {
        tightest: "0.9",
        heading: "0.95",
      },
    },
  },
  plugins: [],
};
export default config;
