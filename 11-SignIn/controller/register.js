const render = require('../template');

module.exports = { // url: /
    pathname: '/regist',
    method: 'GET',
    accept: function(req, res) {
        render('./template/register.html', {}, function(err, html) {
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