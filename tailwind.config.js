/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{css,js}"],
  theme: {
    extend: {
      screens: {
        laptop: "1000px",
      },
    },
  },
  plugins: [],
};
