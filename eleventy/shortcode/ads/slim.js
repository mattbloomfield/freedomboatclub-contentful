module.exports = function (fields) {
  let buttonColor = 'bg-blue-fbc text-white';
  if (fields.buttonColor == 'Gold') {
    buttonColor = 'bg-gold text-white'
  } else if (fields.buttonColor == 'White') {
    buttonColor = 'bg-white text-gold'
  }
  return `
          <div class="text-center my-16 max-w-lg mx-auto">
          <h3 class="text-2xl mb-6 font-headline">${fields.text}</h3>
            <a class="btn ${buttonColor}" href="${fields.buttonDestination}">${fields.buttonText}</a>
          </div>
  `;

}