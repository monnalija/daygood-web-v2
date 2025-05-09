import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.tsx",
    "./components/**/*.tsx",
    "./lib/**/*.ts",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindAnimate],
};

export default config;
