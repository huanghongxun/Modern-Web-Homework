

const requireLogin = function(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.redirect('/user/login?nav_from=' + encodeURIComponent(req.url));
    }
}