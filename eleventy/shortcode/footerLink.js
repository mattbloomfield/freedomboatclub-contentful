module.exports = function (footerLink) {
    return `
        <li>
            <a href="${footerLink.fields.destination}">${footerLink.fields.title}</a>
        </li>
    `;
}