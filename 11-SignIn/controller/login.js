const render = require('../template');

module.exports = { // url: /
    pathname: '/login',
    method: 'GET',
    accept: function(req, res) {
        render('./template/login.html', {}, function(err, html) {
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