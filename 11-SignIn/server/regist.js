module.exports = {
    pathname: '/regist',
    method: 'get',
    handlers: function (req, res) {
        res.redirect(301, '/user/register');
    }
};