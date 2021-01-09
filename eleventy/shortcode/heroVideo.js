module.exports = function (heroVideo) {
    return `
        <div id="HeroVideo" class="pb-aspect-ratio relative mt-8 mb-4 overflow-hidden rounded">
            <iframe class="absolute top-0 left-0 w-full h-full z-20" src="https://www.youtube.com/embed/${heroVideo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    `;

}