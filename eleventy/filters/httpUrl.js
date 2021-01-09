const config = require("../config.json");

module.exports = function (path, encode = false) {

    if (encode) {
        path = encodeURIComponent(path);
    }

    return `${config.domain}${path}`;
};