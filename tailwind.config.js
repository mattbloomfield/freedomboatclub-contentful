module.exports = {
  purge: [
    './src/content/assets/css/*.css',
    './src/content/assets/js/*.js',
    './src/content/*.njk',
    './src/content/**/*.njk',
    './src/_includes/**/*.njk',
    './eleventy/**/*.js',
    './eleventy/**/**/*.js'
  ],
  darkMode: 'media',
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            p: {
              "font-family": theme("fontFamily.body").join(","),
            },
            h1: {
              "font-family": theme("fontFamily.headline").join(","),
            },
            h2: {
              "font-family": theme("fontFamily.headline").join(","),
            },
            h3: {
              "font-family": theme("fontFamily.headline").join(","),
            },
            h4: {
              "font-family": theme("fontFamily.headline").join(","),
            },
            h5: {
              "font-family": theme("fontFamily.headline").join(","),
            },
            h6: {
              "font-family": theme("fontFamily.headline").join(","),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.blue.100"),
              "&:hover": {
                color: theme("colors.blue.100"),
              },
            },
            p: {
              color: theme("colors.white"),
            },
            h1: {
              color: theme("colors.gray.100"),
            },
            h2: {
              color: theme("colors.gray.100"),
            },
            h3: {
              color: theme("colors.gray.100"),
            },
            h4: {
              color: theme("colors.gray.100"),
            },
            h5: {
              color: theme("colors.gray.100"),
            },
            h6: {
              color: theme("colors.gray.100"),
            },
          },
        }
      }),
      colors: {
        "blue-fbc": "#002F5F",
        gold: "#C0A66B",
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
