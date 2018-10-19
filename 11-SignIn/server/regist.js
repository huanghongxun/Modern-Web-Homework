module.exports = {
    pathname: '/regist',
    method: 'get',
    handlers: function (req, res) {
        res.redirect(302, '/user/register');
    }
};