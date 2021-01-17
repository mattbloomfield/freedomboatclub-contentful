const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");
const youTubeId = require('../filters/youTubeId.js');
const btoa = require('btoa')

module.exports = function (pageBoats, allBoats) {

    const boats = {};

    // dedupe and get counts of all boats

    for (let i = 0; i < pageBoats.length; i++) {
        const boat = pageBoats[i];
        const boatId = boat.sys.id;
        const currentCount = boats[boatId]?.count || 0;
        boats[boatId] = {
            count: currentCount + 1,
            name: boat.fields.name || '',
            ytId: youTubeId(boat.fields.youTubeUrl),
            description: documentToHtmlString(boat.fields.description) || '',
            summary: boat.fields.summary || '',
            meta1: boat.fields.meta1 || '',
            meta2: boat.fields.meta2 || '',
            meta3: boat.fields.meta3 || '',
        }
    }

    // build the HTML

    let html = `<ul class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 w-full my-8 text-center">`;

    for (boatId in boats) {
        const boat = boats[boatId];
        const dataAttrs = [
            `data-name="${boat.name}"`,
            `data-description="${btoa(boat.description)}"`,
            `data-meta1="${boat.meta1}"`,
            `data-meta2="${boat.meta2}"`,
            `data-meta3="${boat.meta3}"`,
            `data-count="${boat.count}"`,
            `data-ytId="${boat.ytId}"`,
        ]
        html += `
        <li class="boat grid font-headline bg-gray-200 shadow-lg" ${dataAttrs.join(' ')}>
            <img src="https://i.ytimg.com/vi_webp/${boat.ytId}/maxresdefault.webp">
            <div class="p-4 text-center rounded shadow-lg">
                <h3 class="text-xl font-bold">${boat.name}</h3>
                <div class="mt-4">${boat.summary}</div>
            </div>
        </li>`
    }

    html += `</ul>`;
    return html;

}