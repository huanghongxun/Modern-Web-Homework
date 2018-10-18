const users = require('../users');

module.exports = {
    path: '/api/register',
    method: 'PUT',
    handlers: function (req, res) {
        const query = req.body;

        if (!query) {
            res.status(400);
            res.send({ msg: 'query cannot be empty' });
            return;
        }

        const { username, stuId, tel, email } = query;
        if (!username || !stuId || !tel || !email) {
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
        try {
            users.create({ username, stuId, tel, email });
            res.status(200);
            res.send({});
        } catch (err) {
            if (typeof err == 'string') {
                res.status(409);
                res.send({ type: 'conflict', field: err });
                return;
            }

            res.status(500);
            res.send({ msg: 'error' });
        }
    }
};