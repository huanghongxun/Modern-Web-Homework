const users = require('../users');

module.exports = {
    pathname: '/api/logout',
    method: 'get',
    handlers: function (req, res, next) {
        if (req.session) {
            req.session.destroy(function(err) {
                if (err) return next(err);
                else res.redirect(301, '/');
            });
        }
    }
};