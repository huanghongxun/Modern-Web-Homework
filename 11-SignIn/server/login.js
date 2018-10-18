const url = require('url');
const users = require('../users');

module.exports = {
    path: '/api/login',
    method: 'PUT',
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