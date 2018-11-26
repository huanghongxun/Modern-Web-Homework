const fs = require('fs');

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

String.prototype.replaceAll = function (find, replace) {
    return this.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

module.exports = function (filePath, options, callback) {
    fs.readFile(filePath, function (err, data) {
        if (err) return callback(err);

        const keys = !options ? [] : Object.keys(options);
        let { openTag, closeTag } = !options ? {} : options.settings || {};
        let rendered = data.toString();
        if (!openTag) openTag = '<%=';
        if (!closeTag) closeTag = '%>';
        for (let key of keys) {
            let token = openTag + key + closeTag;
            rendered = rendered.replaceAll(token, options[key]);
        }
        return callback(null, rendered);
    });
}