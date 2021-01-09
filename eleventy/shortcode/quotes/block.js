module.exports = function (blockQuote) {
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
        </section>
    `;
}