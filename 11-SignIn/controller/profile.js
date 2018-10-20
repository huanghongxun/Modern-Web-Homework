const middlewares = require('../middlewares');
const ejs = require('ejs');
const fs = require('fs');
const render = ejs.compile(fs.readFileSync(__dirname + '/../views/profile.ejs', 'UTF-8'), {
    filename: __dirname + '/../views/profile.ejs'
});

module.exports = {
    pathname: '/user/profile',
    method: 'get',
    middleware: [middlewares.requireLogin],
    handlers: function(req, res) {
        res.send(render({ locals: { user: req.user, nav_wrong_user: req.query.nav_wrong_user }}));
    }
};