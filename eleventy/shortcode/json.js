module.exports = function (data) {
    if (typeof data === 'string') 
        return data;
    if (typeof data === 'object')
        return `${JSON.stringify(data)}`;
}