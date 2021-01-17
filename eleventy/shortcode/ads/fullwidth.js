module.exports = function (fields) {
  let buttonColor = 'bg-blue-fbc text-white';
  if (fields.buttonColor == 'Gold') {
    buttonColor = 'bg-gold text-white'
  } else if (fields.buttonColor == 'White') {
    buttonColor = 'bg-white text-gold'
  }

  let textColor = 'text-white';
  let backgroundColor = 'bg-gold';
  if (fields.backgroundColor == 'Blue') {
    backgroundColor = 'bg-blue-fbc';
    textColor = 'text-white'
  } else if (fields.backgroundColor == 'White') {
    backgroundColor = 'bg-white';
    textColor = 'text-blue-fbc'
  }

  let destination = fields.buttonDestination || '/pricing';
  let text = fields.text || '';
  let buttonText = fields.buttonText || 'Join Now';
  
  return `
          <div id="FullWidthAd" class="my-16 py-10 px-4 full-bleed mx-auto grid grid-col-1 md:grid-col-2 gap-8 md:gap-16 align-center ${backgroundColor} justify-center	">
              <h3 class=" max-w-lg text-center text-2xl font-headline ${textColor}">${text}</h3>
              <div class="text-center grid items-center justify-center">
                <a class="btn ${buttonColor} btn-sm" href="${destination}">${buttonText}</a>
              </div>
          </div>
      `;
}
