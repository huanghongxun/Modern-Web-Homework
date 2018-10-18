const http = require('http');
const routers = require('./routers');
const server = require('./server');
const users = require('./users');
const SERVER_PORT = 8000;

users.load('./users.json');

const router = [
    routers.safeCheck,
    routers.processStaticResources,
    routers.processDynamicResources(server),
    routers.processNotFound
];

function callRouter(req, res, i) {
    if (i >= router.length)
        return;

    router[i](req, res, () => callRouter(req, res, i + 1));
}

http.createServer(function(req, res) {
    callRouter(req, res, 0);
}).listen(SERVER_PORT);