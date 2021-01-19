const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");

module.exports = function (block) {
  const fields = block.fields;
  const headline = fields.headline || '';
  const description = documentToHtmlString(fields.description) || '';
  const image = fields?.image?.fields?.file?.url || '//placehold.it/1250';

  /**
   * "in": [
            "Blue",
            "Gold",
            "White"
          ]
   */
  const backgroundColor = fields.backgroundColor || 'Blue';
  let textColor = 'text-white';
  let bgClass = 'bg-blue-fbc';
  if (backgroundColor == 'Gold') {
    bgClass = 'bg-gold';
    textColor = 'text-white'
  } else if (backgroundColor == 'White') {
    bgClass = 'bg-white';
    textColor = 'text-blue-fbc'
  }
  
  /**
   * "in": [
            "Image Left, Text Right",
            "Image Right, Text Left",
            "Full Width"
          ]
   */
  const layout = fields.layout || 'Image Left, Text Right';

  // for full width (init)
  let layoutClasses = `grid justify-center items-center ${bgClass} h-auto md:h-96 `;

  let panelOneClasses = `${textColor} font-headline py-8 px-4 max-w-2xl mx-auto`;
  let panelOneBackground = ``;
  let panelOneText = `
    <div>
      <h3 class="text-xl md:text-3xl">${headline}</h3>
      <hr class="max-w-sm mx-auto my-4 md:my-10 border-2 border-gray-300" />
      <div class="prose dark:prose mx-auto ${textColor}">${description}</div>
    </div>
  `;

  let panelTwoClasses = 'hidden';
  let panelTwoBackground = ``;
  let panelTwoText = ``;

  // text right
  if (layout === 'Image Left, Text Right') {
    layoutClasses = 'grid grid-cols-1 md:grid-cols-2 h-screen" style="grid-auto-rows: 1fr';

    panelOneClasses = `bg-cover bg-center ${bgClass}`;
    panelOneBackground = `background-image: url('${image}')`;
    panelOneText = ``;

    panelTwoClasses = `grid justify-center items-center ${textColor} font-headline px-4`;
    panelTwoBackground = '';
    panelTwoText = `
      <div>
        <h3 class="text-xl md:text-3xl">${headline}</h3>
        <hr class="max-w-sm mx-auto my-4 md:my-10 border-2 border-gray-300" />
        <div class="prose dark:prose mx-auto ${textColor}">${description}</div>
      </div>
    `;

    // text left
  } else if (layout === 'Image Right, Text Left') {
    layoutClasses = 'grid grid-cols-1 md:grid-cols-2 h-screen" style="grid-auto-rows: 1fr';

    panelOneClasses = `grid justify-center items-center ${textColor} font-headline px-4`;
    panelOneBackground = '';
    panelOneText = `
      <div>
        <h3 class="text-xl md:text-3xl">${headline}</h3>
        <hr class="max-w-sm mx-auto my-4 md:my-10 border-2 border-gray-300" />
        <div class="prose dark:prose mx-auto ${textColor}">${description}</div>
      </div>
    `;

    panelTwoClasses = `bg-cover bg-center ${bgClass}`;
    panelTwoBackground = `background-image: url('${image}')`;
    panelTwoText = ``;

  }
  
  let html = `
  <section class="shadow-lg text-center ${layoutClasses}">
    <div class="${panelOneClasses}" style="${panelOneBackground}">
      ${panelOneText}
    </div>
    <div class="${panelTwoClasses}" style="${panelTwoBackground}">
      ${panelTwoText}
    </div>
  </section>
  `;
  return html;
}