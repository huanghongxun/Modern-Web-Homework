const users = require('./users');

const requireLogin = function(req, res, next) {
    if (req.session && req.session.userId) {
        users.findById(req.session.userId)
            .exec(function(err, user) {
                if (err) return next(err);
                else if (user) {
                    success = true;
                    req.user = {
                        username: user.username,
                        tel: user.tel,
                        email: user.email,
                        stuId: user.stuId
                    };
                    return next();
                } else {
                    res.redirect('/user/login?nav_from=' + encodeURIComponent(req.url));
                }
            });
    } else {
        res.redirect('/user/login?nav_from=' + encodeURIComponent(req.url));
    }
}

const login = function(req, res, next) {
    if (req.session && req.session.userId) {
        users.findById(req.session.userId)
            .exec(function(err, user) {
                if (err) return next(err);
                else if (user) {
                    success = true;
                    req.user = {
                        username: user.username,
                        tel: user.tel,
                        email: user.email,
                        stuId: user.stuId
                    };
                    return next();
                } else {
                    return next();
                }
            });
    } else {
        next();
    }
}

module.exports = {
    requireLogin,
    login
}