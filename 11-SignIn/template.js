const fs = require('fs');

module.exports = function(filePath, options, callback) {
    fs.readFile(filePath, function(err, data) {
        if (err) return callback(err);

        const keys = !options ? [] : Object.keys(options);
        let { openTag, closeTag } = !options ? {} : options.settings || {};
        let rendered = data.toString();
        if (!openTag) openTag = '<%=';
        if (!closeTag) closeTag = '%>';
        for (let key of keys) {
            let token = openTag + key + closeTag;
            rendered = rendered.replace(token, options[key]);
        }
        return callback(null, rendered);
    });
}