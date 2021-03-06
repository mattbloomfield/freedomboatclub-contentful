module.exports = function (quoteText='') {
    return `
            <div id="FullWidthQuote" class="my-16 p-4 full-bleed mx-auto bg-blue-fbc">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto align-center justify-center">
              <img class="mx-auto rounded-full h-32 md:h-64 w-32 md:w-64" src="//placehold.it/350" alt="A person's face"/>
              <blockquote class="grid justify-center text-center max-w-lg gap-8">
                <h3 class="mx-auto text-lg md:text-2xl font-headline text-white">${quoteText}</h3>
                <div class="text-center">
                  <a class="btn btn-white btn-sm" href="/member-experiences/testimonials/">Read More Testimonials</a>
                </div>
              </blockquote>
              </div>
            </div>
        `;
  }