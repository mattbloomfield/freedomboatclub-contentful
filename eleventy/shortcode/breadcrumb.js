module.exports = function (crumbs) {
    let html = ``;
    crumbs.forEach(crumb => {
        if (crumb.loc) {
            if (crumb.loc.charAt(0) !== '/') crumb.loc = '/' + crumb.loc;
            if (crumb.loc.split(-1) !== '/' && crumb.loc.length > 1) crumb.loc += '/';
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

}