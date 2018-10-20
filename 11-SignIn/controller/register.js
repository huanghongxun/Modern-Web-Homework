const ejs = require('ejs');
const fs = require('fs');
const middlewares = require('../middlewares');
const render = ejs.compile(fs.readFileSync(__dirname + '/../views/register.ejs', 'UTF-8'), {
    filename: __dirname + '/../views/register.ejs'
});

module.exports = { // url: /
    pathname: '/user/register',
    method: 'get',
    middleware: [middlewares.login],
    handlers: function(req, res) {
        res.send(render({locals: { user: req.user }}));
    }
};