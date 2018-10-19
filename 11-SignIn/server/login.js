const url = require('url');
const users = require('../users');

module.exports = {
    pathname: '/api/login',
    method: 'post',
    handlers: function (req, res) {
        const query = req.body;

        if (!query) {
            res.status(400);
            res.send({ msg: 'query cannot be empty' });
            return;
        }

        const { username, password } = query;
        if (!username || !password) {
            res.status(400);
            res.send({ msg: 'query missing field' });
            return;
        }

        users.authenticate(username, password, function(err, user) {
            if (err) return next(err);
            else if (user === undefined) {
                res.send({ type: 'not_found' });
            } else if (user == null) {
                res.send({ type: 'wrong_password' });
            } else {
                req.session.userId = user._id;
                res.send({ type: 'success' });
            }
        });
    }
};