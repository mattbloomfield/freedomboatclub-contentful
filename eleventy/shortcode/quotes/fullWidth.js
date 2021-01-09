module.exports = function (quoteText='') {
    return `
            <div id="FullWidthQuote" class="my-16 p-4 full-bleed mx-auto flex gap-4 align-center bg-blue-fbc justify-center">
              <img class="rounded-full h-64 w-64" src="http://placehold.it/350" />
              <blockquote class="grid justify-center text-center max-w-lg gap-8">
                <h3 class="mx-auto text-2xl font-headline text-white">${quoteText}</h3>
                <div class="text-center">
                  <a class="btn btn-white btn-sm" href="/member-experiences/testimonials/">Read More Testimonials</a>
                </div>
              </blockquote>
            </div>
        `;
  }