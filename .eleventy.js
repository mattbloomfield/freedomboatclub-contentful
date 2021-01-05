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

  eleventyConfig.addFilter("split", function(value, separator=',') { 
    return value.split(separator)
  });

  eleventyConfig.addFilter("youTubeId", function(url) { 
    const arr1 = url.split('?v=');
    if (arr1.length > 1) {
      return arr1[1];
    } else {
      return url.split('youtu.be/')[1];
    }
  });

  eleventyConfig.addShortcode("documentToHtmlString", documentToHtmlString);
  eleventyConfig.addShortcode("imageProcessing", imageProcessing);
  eleventyConfig.addShortcode("marked", marked);

  eleventyConfig.addShortcode("footer", function (footer) {
    return `
            ${JSON.stringify(footer.fields.links)}
        `;
  });

  eleventyConfig.addShortcode("footerLink", function (footerLink) {
    return `
            <li>
              <a href="${footerLink.fields.destination}">${footerLink.fields.title}</a>
            </li>
        `;
  });

  eleventyConfig.addShortcode('breadcrumb', function(crumbs) {
    let html = ``;
    crumbs.forEach(crumb=> {
      if (crumb.loc) {
        html += `<a href="${crumb.loc}" class="underline">${crumb.label}</a><span> > </span>`;
      } else {
        html += `<span class="font-bold">${crumb.label}</span>`;
      }
    });
    return `
            <div id="Breadcrumb" class="text-xs uppercase text-gray-700 my-8">
              ${html}
            </div>
        `;

  });

  eleventyConfig.addShortcode("mainMenuItem", function (label, location) {
    return `
            <a class="grid items-center justify-center bg-blue-fbc w-full h-48 rounded" href="${location}">
              <span class="font-headline font-bold text-2xl text-white">${label}</span>
            </a>
        `;
  });
  
  eleventyConfig.addShortcode("videoButton", function (ytId, h, p, textPosition='below') {
    let textHtml = `
              <div class="p-4 text-center rounded shadow-lg">
                <h3 class="text-xl font-bold">${h}</h3>`
    if (p && p.length && textPosition != 'both') textHtml += `<p class="mt-4">${p}</p>`
    textHtml +=`</div>
    `
    let html = `
            <a class="flex flex-col font-headline bg-gray-200 shadow-lg">`
    if (textPosition === 'above' || textPosition == 'both') html += textHtml;
    html += `<img src="https://i.ytimg.com/vi_webp/${ytId}/maxresdefault.webp">`;
    if (textPosition === 'below') html += textHtml;
    if (textPosition == 'both') html += `<div class="p-4 text-center rounded shadow-lg text-sm"><p>${p}</p></div>`;
    html += `</a>`;
    return html;
  });

  eleventyConfig.addShortcode("header", function (h1, p, type) {
    let classes = 'border-blue-fbc bg-blue-fbc text-white';
    if (type === 'gold') {
      classes = 'border-gold';
    }
    return `
            <div id="HeaderContainer" class="text-center border-2 rounded ${classes} p-4 my-4">
              <h1 class="text-2xl font-bold my-4 font-headline">${h1}</h1>
              <p class="font-headline">${p}</p>
            </div>
        `;
  });

  eleventyConfig.addShortcode("instructions", function (p) {
    return `
            <div id="Instructions" class="text-center my-8">
              <h2 class="font-bold text-lg">${p}</h2>
            </div>
        `;
  });

  eleventyConfig.addShortcode('heroVideo', function(heroVideo) {
    return `
            <div id="HeroVideo" class="pb-aspect-ratio relative mt-8 mb-4 overflow-hidden rounded">
              <iframe class="absolute top-0 left-0 w-full h-full z-20" src="https://www.youtube.com/embed/${heroVideo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;

  })

  eleventyConfig.addShortcode('slimAd', function(slimAd) {
    return `
            <div id="SlimAd" class="text-center my-16 max-w-lg mx-auto">
            <h3 class="text-2xl mb-6 font-headline">It’s like having a best friend with a boat. Except you don’t have to ask permission. 
            <br/><br />
            You’ll thank us later.</h3>
              <a class="btn btn-blue" href="">Join Now</a>
            </div>
        `;

  })

  eleventyConfig.addShortcode('fullWidthAd', function(fullWidthAd) {
    return `
            <div id="FullWidthAd" class="my-16 py-10 px-4 full-bleed mx-auto flex gap-16 align-center bg-gold justify-center	">
                <h3 class=" max-w-lg text-center text-2xl font-headline text-white">Time to stop dreaming and start living. Start your membership with Freedom Boat Club today.</h3>
                <div class="text-center grid items-center justify-center">
                  <a class="btn btn-white btn-sm sm:text-gold" href="/tour/">Take a Tour</a>
                </div>
            </div>
        `;
  })

  eleventyConfig.addShortcode('fullWidthQuote', function(fullWidthQuote) {
    return `
            <div id="FullWidthQuote" class="my-16 p-4 full-bleed mx-auto flex gap-4 align-center bg-blue-fbc justify-center">
              <img class="rounded-full h-64 w-64" src="http://placehold.it/350" />
              <blockquote class="flex flex-col justify-center text-center max-w-lg gap-8">
                <h3 class="mx-auto text-2xl font-headline text-white">Freedom Boat Club made quarantine worth it. If you’re going to distance from society, might as well do it on a boat!</h3>
                <div class="text-center">
                  <a class="btn btn-white btn-sm" href="/member-experiences/testimonials/">Read More Testimonials</a>
                </div>
              </blockquote>
            </div>
        `;
  })

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
