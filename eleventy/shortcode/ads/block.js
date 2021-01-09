module.exports = function (blockAd) {
    return `
        <section class="block-ad">
            <div class="inner">
                <p>
                    ${marked(blockAd.fields.text)}
                </p>
                <a href="${marked(JSON.stringify(blockAd.fields.buttonDestination))}">
                    ${marked(blockAd.fields.buttonText)}
                </a>
            </div>
        </section>`;
}