const fs = require('fs');

let users = {};
var pathname;

module.exports = {
    load: function(newPathName) {
        pathname = newPathName;
        fs.readFile(pathname, function(err, data) {
            if (err) return;

            try {
                users = JSON.parse(data);
            } catch (err) {
                users = {};
            }
        });
    },
    create: function({username, stuId, tel, email}) {
        // check duplication
        for (let key of Object.keys(users)) {
            let obj = users[key];
            if (obj.username == username) throw "username";
            if (obj.stuId == stuId) throw "stuId";
            if (obj.tel == tel) throw "tel";
            if (obj.email == email) throw "email";
        }

        users[username] = {username, stuId, tel, email};

        fs.writeFile(pathname, JSON.stringify(users), function (err) {
            if (err) throw err;
        });
    },
    query: function(username) {
        return users[username];
    }
};