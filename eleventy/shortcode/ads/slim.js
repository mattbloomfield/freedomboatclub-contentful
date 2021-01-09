module.exports = function (adText='') {
    return `
            <div id="SlimAd" class="text-center my-16 max-w-lg mx-auto">
            <h3 class="text-2xl mb-6 font-headline">${adText}</h3>
              <a class="btn btn-blue" href="">Join Now</a>
            </div>
        `;

  }