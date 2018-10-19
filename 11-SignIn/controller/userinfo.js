const users = require('../users');
const middlewares = require('../middlewares');
const render = require('../template');

module.exports = { // url: /
    pathname: '/user/profile',
    method: 'get',
    middleware: [middlewares.requiresLogin],
    handlers: function(req, res) {
        const { username } = req.params;
        if (!username) {
            return res.redirect(301, '/');
        }

        let userinfo = users.query(username);

        // if the user does not exist
        // navigate to register page
        if (!userinfo) {
            return res.redirect(301, '/user/register');
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