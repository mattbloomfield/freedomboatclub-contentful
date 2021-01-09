const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

const plugins = [
  autoprefixer,
  tailwindcss('./tailwind.config.js'),
  cssnano({ preset: 'default', }),
]

module.exports = {
  plugins
}