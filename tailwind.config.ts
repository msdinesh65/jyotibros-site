import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf2f7",
          100: "#fbe4ef",
          200: "#f5bfd9",
          300: "#ee96c1",
          400: "#e16997",
          500: "#d64078",
          600: "#b72b63",
          700: "#941f4f",
          800: "#70173b",
          900: "#4c0f28"
        },
        accent: {
          50: "#fff7eb",
          100: "#ffe9c7",
          200: "#ffd090",
          300: "#ffb356",
          400: "#ff9930",
          500: "#f77c0a",
          600: "#d95f06",
          700: "#b04309",
          800: "#7a2c09",
          900: "#471705"
        }
      },
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        "soft-card":
          "0 10px 30px rgba(15, 23, 42, 0.12), 0 4px 10px rgba(15, 23, 42, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;

