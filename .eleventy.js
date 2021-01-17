require("dotenv").config();
const marked = require("marked");
const contentful = require("contentful");
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CTFL_SPACE,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CTFL_ACCESSTOKEN,
});

module.exports = function (eleventyConfig) {

  // CONFIGURE WATCH
  eleventyConfig.addWatchTarget("eleventy/**/*.js");
  eleventyConfig.addWatchTarget("eleventy/**/**/*.js");

  // PASSTHROUGHS
  eleventyConfig.addPassthroughCopy("src/content/assets/images");
  eleventyConfig.addPassthroughCopy("src/content/assets/js");
  eleventyConfig.addPassthroughCopy("src/content/assets/xsl");

  //FILTERS
  eleventyConfig.addFilter("split", require('./eleventy/filters/split.js'));
  eleventyConfig.addFilter("youTubeId", require('./eleventy/filters/youTubeId.js'));
  eleventyConfig.addFilter('htmlDateString', require('./eleventy/filters/htmlDateString.js'))
  eleventyConfig.addFilter('httpUrl', require('./eleventy/filters/httpUrl.js'))
  eleventyConfig.addFilter('json', require('./eleventy/filters/json.js'))

  // SHORTCODES
  eleventyConfig.addShortcode("documentToHtmlString", require('./eleventy/shortcode/documentToHtmlString.js'));
  eleventyConfig.addShortcode("marked", marked);
  eleventyConfig.addShortcode("currentYear", require('./eleventy/shortcode/currentYear'));
  eleventyConfig.addShortcode("footerLink", require('./eleventy/shortcode/footerLink.js'));
  eleventyConfig.addShortcode('breadcrumb', require('./eleventy/shortcode/breadcrumb.js'));
  eleventyConfig.addShortcode("mainMenuItem", require('./eleventy/shortcode/mainMenuItem.js'));
  eleventyConfig.addShortcode("videoButton", require('./eleventy/shortcode/videoButton.js'));
  eleventyConfig.addShortcode("header", require('./eleventy/shortcode/header.js'));
  eleventyConfig.addShortcode("instructions", require('./eleventy/shortcode/instructions.js'));
  eleventyConfig.addShortcode('heroVideo', require('./eleventy/shortcode/heroVideo.js'))
  eleventyConfig.addShortcode('slimAd', require('./eleventy/shortcode/ads/slim.js'))
  eleventyConfig.addShortcode('fullWidthAd', require('./eleventy/shortcode/ads/fullwidth.js'))
  eleventyConfig.addShortcode("blockQuote", require('./eleventy/shortcode/quotes/block.js'));
  eleventyConfig.addShortcode("fullWidthQuote", require('./eleventy/shortcode/quotes/fullWidth.js'));
  eleventyConfig.addShortcode("json", require('./eleventy/shortcode/json.js'));
  eleventyConfig.addShortcode("testimonial", require('./eleventy/shortcode/testimonial.js'));
  eleventyConfig.addShortcode("boatMenu", require('./eleventy/shortcode/boatMenu.js'));

  return {
    dir: {
      input: "src/content",
      includes: "../_includes",
      output: "dist",
      data: "../_data",
    },
    // passthroughFileCopy: true,
    templateFormats: ["njk", "md", "html", "yml"],
    htmlTemplateEngine: "njk",
  };
};
