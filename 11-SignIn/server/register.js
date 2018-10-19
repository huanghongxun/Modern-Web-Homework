const users = require('../users');

module.exports = {
    pathname: '/api/register',
    method: 'put',
    handlers: function (req, res, next) {
        const query = req.body;

        if (!query) {
            res.status(400);
            res.send({ msg: 'query cannot be empty' });
            return;
        }

        const { username, password, stuId, tel, email } = query;
        if (!username || !password || !stuId || !tel || !email) {
            res.status(400);
            res.send({ msg: 'query missing field' });
            return;
        }

        // We should ensure query's correctness
        // on server since user input cannot be trusted.
        let usernameRegex = /^[a-zA-Z]\w{5,17}$/;
        let stuIdRegex = /^[1-9]\d{7}$/;
        let telRegex = /^[1-9]\d{10}$/;
        let emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        if (!usernameRegex.test(username)) {
            res.status(400);
            res.send({ type: 'malformed', field: 'username' });
            return;
        }

        if (!stuIdRegex.test(stuId)) {
            res.status(400);
            res.send({ type: 'malformed', field: 'stuId' });
            return;
        }

        if (!telRegex.test(tel)) {
            res.status(400);
            res.send({ type: 'malformed', field: 'tel' });
            return;
        }

        if (!emailRegex.test(email)) {
            res.status(400);
            res.send({ type: 'malformed', field: 'email' });
            return;
        }

        users.create({ username, password, stuId, tel, email }, function(err, user) {
            if (err) return next(err);
            else return res.end('');
        });
    }
};