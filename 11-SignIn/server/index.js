const userinfoPage = require('../controller/userinfo');
const registerPage = require('../controller/register');
const loginPage = require('../controller/login');
const register = require('./register');
const regist = require('./regist');
const login = require('./login');
const logout = require('./logout');

module.exports = {
    userinfoPage,
    registerPage,
    loginPage,
    
    register,
    regist,
    login,
    logout
};