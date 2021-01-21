const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");

module.exports = function (ytId, headline, customClasses = '', bodyText) {

    let html = `
    <li class="grid font-headline bg-gray-200 shadow-lg rounded cursor-pointer overflow-hidden ${customClasses}" data-youtube-id="${ytId}" data-title="${headline}" data-description="${documentToHtmlString(bodyText)}">
      <img src="https://i.ytimg.com/vi_webp/${ytId}/maxresdefault.webp">
      <div class="p-4 text-center rounded shadow-lg">
        <h3 class="text-xl font-bold">${headline}</h3>
      </div>
    </li>`;
    return html;
}