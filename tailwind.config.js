// tailwind.config.js
module.exports = {
  purge: {
    content: [
      "src/**/*.html",
      "src/**/*.njk",
      "src/**/*.md"
    ],
    options: {
      whitelist: [],
    },
  },
  theme: {},
  variants: {},
  plugins: [],
};