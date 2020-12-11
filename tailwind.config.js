module.exports = {
  purge: ["./_includes/layout.njk", "./pages.njk"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      headline: ["Merriweather", "Georgia", "ui-serif", "serif"],
      body: [
        "Montserrat",
        "ui-sans-serif",
        "system-ui",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        "blue-fbc": "#002F5F",
        gold: "#C0A66B",
      },
    },
  },
  variants: {},
  plugins: [],
};
