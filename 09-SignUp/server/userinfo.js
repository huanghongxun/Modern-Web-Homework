const users = require('../users');
const url = require('url');
const render = require('../template');

module.exports = { // url: /
    pathname: '/',
    method: 'GET',
    accept: function(req, res) {
        const { query } = url.parse(req.url, true);
        const { username } = query;
        if (!username) {
            res.statusCode = 400;
            res.end('Username cannot be empty');
            return;
        }

        let userinfo = users.query(username);

        // if the user does not exist
        // navigate to register page
        if (!userinfo) {
            res.statusCode = 301;
            res.setHeader('Location', '/register.html');
            res.end('');
            return;
        }

        render('./template/userinfo.html', userinfo, function(err, html) {
            if (err) {
                res.statusCode = 500;
                res.end('Unable to render this page');
            } else {
                res.statusCode = 200;
                res.end(html);
            }
        });

    }
};