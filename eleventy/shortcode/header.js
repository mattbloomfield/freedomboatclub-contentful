const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");

module.exports = function (h1, p, type) {
    let classes = 'border-blue-fbc bg-blue-fbc text-white';
    if (type === 'gold') {
        classes = 'border-gold';
    }
    return `
            <div id="HeaderContainer" class="text-center border-2 rounded ${classes} p-4 my-4">
              <h1 class="text-2xl font-bold my-4 font-headline">${h1}</h1>
              <div class="font-headline">${documentToHtmlString(p)}</div>
            </div>
        `;
}