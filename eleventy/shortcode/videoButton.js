const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");

module.exports = function (ytId, coverImage, id, headline, text, textPosition = 'below', customClasses = ' ', fields = {}) {
    const dataAttrs = [];
    for (field in fields) {
        if (['description', 'summary'].includes(field)) {
            dataAttrs.push(`data-${field}="${documentToHtmlString(fields[field])}"`)
        } else {
            dataAttrs.push(`data-${field}="${fields[field]}"`)
        }
    }
    let textHtml = `
              <div class="p-4 text-center rounded shadow-lg">
                <h3 class="text-xl font-bold">${headline}</h3>`
    if (text && text.length && textPosition != 'both') textHtml += `<p class="mt-4">${documentToHtmlString(text)}</p>`
    textHtml += `</div>`
    let html = `<a id="${id}" class="grid font-headline bg-gray-200 shadow-lg cursor-pointer rounded overflow-hidden ${customClasses}" ${dataAttrs.join(' ')} data-youtube-id="${ytId}">`
    if (textPosition === 'above' || textPosition == 'both') html += textHtml;
    if (coverImage && coverImage.fields) {
        html += `<img src="${coverImage.fields.file.url}" alt="${coverImage.fields.file.fileName}">`;
    } else {
        html += `<img src="https://i.ytimg.com/vi_webp/${ytId}/maxresdefault.webp" alt="A screenshot from a video">`;
    }
    if (textPosition === 'below') html += textHtml;
    if (textPosition == 'both') html += `<div class="p-4 text-center rounded shadow-lg text-sm"><p>${p}</p></div>`;
    html += `</a>`;
    
    return html;
}