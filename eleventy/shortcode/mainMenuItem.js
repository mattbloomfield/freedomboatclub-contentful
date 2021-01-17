module.exports = function (fields) {
  let location = fields?.page?.fields?.slug;
  console.log('location',location)
  if (location && location.slice(-1) !== '/') location = `${location}/`;
  const dataAttrs = [];
  for (field in fields) {
      dataAttrs.push(`data-${field}="${fields[field]}"`)
  }
  let bgImage = '';
  if (fields.backgroundImage) {
    bgImage = fields.backgroundImage.fields.file.url;
  }
  return `
    <a class="w-full h-32 md:h-48 rounded bg-cover bg-center" href="${location}" ${dataAttrs.join(' ')} style="background-image: url('${bgImage}')">
      <div class="filter bg-blue-fbc w-full h-full grid items-center justify-center bg-opacity-75">
        <span class="font-headline font-bold text-xl md:text-2xl text-white">${fields.label}</span>
      </div>
    </a>
  `;
}