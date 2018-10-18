const url = require('url');
const users = require('../users');

module.exports = { // url: /api/register
    pathname: '/api/register',
    method: 'PUT',
    accept: function(req, res) {
        let jsonString = '';

        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
            const query = JSON.parse(jsonString);

            if (!query) {
                res.statusCode = 400;
                res.end(JSON.stringify({ msg: 'query cannot be empty' }));
                return;
            }

            const { username, stuId, tel, email } = query;
            if (!username || !stuId || !tel || !email) {
                res.statusCode = 400;
                res.end(JSON.stringify({ msg: 'query missing field' }));
                return;
            }

            // We should ensure query's correctness
            // on server since user input cannot be trusted.
            let usernameRegex = /^[a-zA-Z]\w{5,17}$/;
            let stuIdRegex = /^[1-9]\d{7}$/;
            let telRegex = /^[1-9]\d{10}$/;
            let emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
            
            if (!usernameRegex.test(username)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ type: 'malformed', field: 'username' }));
                return;
            }

            if (!stuIdRegex.test(stuId)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ type: 'malformed', field: 'stuId' }));
                return;
            }

            if (!telRegex.test(tel)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ type: 'malformed', field: 'tel' }));
                return;
            }

            if (!emailRegex.test(email)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ type: 'malformed', field: 'email' }));
                return;
            }
            try {
                users.create({username, stuId, tel, email});
                res.statusCode = 200;
                res.end(JSON.stringify({}));
            } catch (err) {
                if (typeof err == 'string') {
                    res.statusCode = 409;
                    res.end(JSON.stringify({ type: 'conflict', field: err }));
                    return;
                }

                res.statusCode = 500;
                res.end(JSON.stringify({ msg: 'error' }));
            }
        });

    }
};