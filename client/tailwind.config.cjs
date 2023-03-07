/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("daisyui"),
    require("tw-elements/dist/plugin"), 
  ],
};
