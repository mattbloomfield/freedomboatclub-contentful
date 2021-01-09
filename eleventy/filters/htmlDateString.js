const { DateTime } = require("luxon");

module.exports = function (dateObj) {
    return DateTime.fromJSDate(dateObj).toFormat('MMMM d, yyyy')
};