const ejs = require('ejs');
const fs = require('fs');
const middlewares = require('../middlewares');
const render = ejs.compile(fs.readFileSync(__dirname + '/../views/login.ejs', 'UTF-8'), {
    filename: __dirname + '/../views/login.ejs'
});

module.exports = { // url: /
    pathname: '/user/login',
    method: 'get',
    middleware: [middlewares.login],
    handlers: function(req, res) {
        res.send(render({locals: { user: req.user }}));
    }
};