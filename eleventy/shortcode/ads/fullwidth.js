module.exports = function (fields) {
  let buttonColor = 'bg-blue-fbc text-white';
  if (fields.buttonColor == 'Gold') {
    buttonColor = 'bg-gold text-white'
  } else if (fields.buttonColor == 'White') {
    buttonColor = 'bg-white text-gold'
  }
  return `
          <div id="FullWidthAd" class="my-16 py-10 px-4 full-bleed mx-auto grid grid-col-2 gap-16 align-center bg-gold justify-center	">
              <h3 class=" max-w-lg text-center text-2xl font-headline text-white">${fields.text}</h3>
              <div class="text-center grid items-center justify-center">
                <a class="btn ${buttonColor} btn-sm" href="${fields.buttonDestination}">${fields.buttonText}</a>
              </div>
          </div>
      `;
}
