const users = require('../users');

module.exports = {
    pathname: '/user/logout',
    method: 'get',
    handlers: function (req, res, next) {
        if (req.session) {
            req.session.destroy(function(err) {
                if (err) return next(err);
                else res.redirect('/');
            });
        }
    }
};