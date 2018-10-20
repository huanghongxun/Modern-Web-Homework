const ejs = require('ejs');
const fs = require('fs');
const middlewares = require('../middlewares');
const render = ejs.compile(fs.readFileSync(__dirname + '/../views/index.ejs', 'UTF-8'), {
    filename: __dirname + '/../views/index.ejs'
});

module.exports = { // url: /
    pathname: '/',
    method: 'get',
    middleware: [middlewares.login],
    handlers: function(req, res) {
        if (req.query.username) { // specific support for fucking homework requirement
            if (req.user && req.user.username !== req.query.username) {
                res.redirect('/user/profile?nav_wrong_user=true');
                return;
            } else {
                res.redirect('/user/profile');
                return;
            }
        }
        res.send(render({locals: { user: req.user }}));
    }
};