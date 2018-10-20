const profilePage = require('../controller/profile');
const registerPage = require('../controller/register');
const loginPage = require('../controller/login');
const indexPage = require('../controller/index');
const register = require('./register');
const regist = require('./regist');
const login = require('./login');
const logout = require('./logout');

module.exports = {
    profilePage,
    registerPage,
    loginPage,
    indexPage,
    
    register,
    regist,
    login,
    logout
};