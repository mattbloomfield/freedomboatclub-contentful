module.exports = function (ytId, headline, customClasses = '', bodyText) {

    let html = `
    <a class="grid font-headline bg-gray-200 shadow-lg ${customClasses}" data-youtube-id="${ytId}">
      <img src="https://i.ytimg.com/vi_webp/${ytId}/maxresdefault.webp">
      <div class="p-4 text-center rounded shadow-lg">
        <h3 class="text-xl font-bold">${headline}</h3>
      </div>
    </a>`;
    return html;
}