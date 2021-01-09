module.exports = function (url = '') {
    const arr1 = url.split('?v=');
    if (arr1.length > 1) {
        return arr1[1];
    } else {
        return url.split('youtu.be/')[1];
    }
};