const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");
const { BLOCKS } = require("@contentful/rich-text-types");

module.exports = function (document) {
const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        let html = ``;
        const contentType = node?.data?.target?.fields?.file?.contentType;
        if (contentType && contentType.includes('image')) {
          const file = node?.data?.target?.fields?.file;
          return `<img src=${file.url} width="${file.details.image.width}" height="${file.details.image.height}" />`
        } else {
          html = `
          <script>
            console.log('error rendering', ${JSON.stringify(node.data.target)});
          </script>`
        }
      }
    }
  }
  return documentToHtmlString(document, options)
}