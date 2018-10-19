const render = require('../template');

module.exports = { // url: /
    pathname: '/user/register',
    method: 'get',
    handlers: function(req, res) {
        render('./template/register.html', {}, function(err, html) {
            if (err) {
                res.status(500);
                res.end('Unable to render this page');
            } else {
                res.status(200);
                res.end(html);
            }
        });

    }
};