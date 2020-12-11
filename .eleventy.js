require("dotenv").config();
const marked = require("marked");
const contentful = require("contentful");
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CTFL_SPACE,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CTFL_ACCESSTOKEN,
});

const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");

function imageProcessing(photo) {
  return `<img class='u-max-full-width'
            srcset="https:${photo.fields.file.url}?w=480&fm=webp&q=80&fit=fill&f=faces 480w,
            https:${photo.fields.file.url}?w=800&fm=webp&q=80&fit=fill&f=faces 800w" sizes="(max-width: 600px) 480px,800px"
            src="https:${photo.fields.file.url}?w=480&fit=fill&f=faces"
            alt="${photo.fields.title}" loading="lazy">`;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/webfonts");
  eleventyConfig.addShortcode("documentToHtmlString", documentToHtmlString);
  eleventyConfig.addShortcode("imageProcessing", imageProcessing);
  eleventyConfig.addShortcode("marked", marked);

  eleventyConfig.addShortcode("bannerBlock", function (bannerBlock) {
    return `
                <section id="wrapper">
                    <header>
                        <div class="inner">
                            <h2>Title</h2>
                            ${JSON.stringify(bannerBlock)}
                        </div>
                    </header>
                </section>
        `;
  });
  eleventyConfig.addShortcode("contentBlock", function (contentBlock) {
    return `
                    <section id="${contentBlock.fields.sectionLink}">
                        <div class="wrapper">
                            <div class="inner">
                                <h3 class="major">${
                                  contentBlock.fields.sectionTitle
                                }</h3>
                                ${documentToHtmlString(
                                  contentBlock.fields.content
                                )}
                            </div>
                        </div>
                    </section>`;
  });

  eleventyConfig.addShortcode("footerBlock", function (footerBlock) {
    return `
                    <section id="footer">
                        <div class="inner">
                            <div class="copyright">
                                Footer Block Text
                            </div>
                        </div>
                    </section>`;
  });

  eleventyConfig.addShortcode("blockAd", function (blockAd) {
    return `
                    <section class="block-ad">
                        <div class="inner">
                            <p>
                                ${marked(blockAd.fields.text)}
                            </p>
                            <a href="${marked(
                              JSON.stringify(blockAd.fields.buttonDestination)
                            )}">
                                ${marked(blockAd.fields.buttonText)}
                            </a>
                        </div>
                    </section>`;
  });

  eleventyConfig.addShortcode("blockQuote", function (blockQuote) {
    return `
                    <section class="block-quote">
                        <div class="inner">
                            <p>
                                ${marked(blockQuote.fields.quoteText)}
                            </p>
                            <a href="/testimonials">
                                Read More Testimonials
                            </a>
                        </div>
                    </section>`;
  });

  eleventyConfig.addShortcode("cardBlock", async function (cardBlock) {
    const output = await Promise.all(
      cardBlock.fields.cards.map(({ sys }) => {
        return (cards = client.getEntry(sys.id).then((card) => {
          return `<article>
                                    <a href="#" class="image">${imageProcessing(
                                      card.fields.image
                                    )}</a>
                                    <h3 class="major">${
                                      card.fields.sectionTitle
                                    }</h3>
                                    ${documentToHtmlString(card.fields.content)}
                                </article>`;
        }));
      })
    );
    return `
                    <section id="${
                      cardBlock.fields.sectionLink
                    }" class="wrapper alt style1">
                        <div class="inner">
                            <h2 class="major">${
                              cardBlock.fields.sectionTitle
                            }</h2>
                            <section class="features">
                                ${output.join("")}
                            </section>
                        </div>
                    </section>`;
  });

  eleventyConfig.addShortcode("featuretteBlock", function (featuretteBlock) {
    if (featuretteBlock.fields.imageLocation) {
      return `
                        <section id="${
                          featuretteBlock.fields.sectionLink
                        }" class="wrapper spotlight style1">
                            <div class="inner">
                                <a href="#" class="image">${imageProcessing(
                                  featuretteBlock.fields.image
                                )}</a>
                                <div class="content">
                                    <h2 class="major">${
                                      featuretteBlock.fields.sectionTitle
                                    }</h2>
                                    ${documentToHtmlString(
                                      featuretteBlock.fields.content
                                    )}
                                </div>
                            </div>
                        </section>`;
    } else {
      return `
                        <section id="${
                          featuretteBlock.fields.sectionLink
                        }" class="wrapper alt spotlight style2">
                            <div class="inner">
                                <a href="#" class="image">${imageProcessing(
                                  featuretteBlock.fields.image
                                )}</a>
                                <div class="content">
                                    <h2 class="major">${
                                      featuretteBlock.fields.sectionTitle
                                    }</h2>
                                    ${documentToHtmlString(
                                      featuretteBlock.fields.content
                                    )}
                                </div>
                            </div>
                        </section>`;
    }
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      data: "_data",
    },
    // passthroughFileCopy: true,
    templateFormats: ["njk", "md", "html", "yml"],
    htmlTemplateEngine: "njk",
  };
};
