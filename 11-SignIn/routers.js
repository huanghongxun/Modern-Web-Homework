const path = require('path');
const url = require('url');
const fs = require('fs');

const safeCheck = function(req, res, next) {
    if (req.url.indexOf('..') != -1) {
        res.writeHead(400);
        res.end('Not a valid path');
        return;
    }

    next();
}

const processStaticResources = function(req, res, next) {
    let url = req.url;
    let que = url.indexOf('?'), pathname;
    if (que != -1) url = url.substring(0, que);
    if (url == '/')
        pathname = path.resolve(__dirname, './dist/index.html');
    else
        pathname = path.resolve(__dirname, './dist' + url);

    let ext = path.extname(pathname);

    const contentTypes = {
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.htm': 'text/htm',
        '.ico': 'image/x-icon',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.doc': 'application/msword',
        '.pdf': 'application/pdf',
        '.json': 'application/json',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mp3'
    };

    fs.exists(pathname, function(exist) {
        if (!exist) {
            next();
            return;
        }

        if (fs.statSync(pathname).isDirectory()) {
            res.statusCode = 403;
            res.end('Forbidden');
            return;
        }

        fs.readFile(pathname, function(err, data) {
            if (err) {
                res.statusCode = 500;
                res.end('Server error');
                console.log(err);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', contentTypes[ext] || 'text/plain');
                res.end(data);
            }
        });
    });
};

const processDynamicResources = dynamicRouters => function(req, res, next) {
    let flag = false;
    let parsed = url.parse(req.url || '/');
    for (let router of dynamicRouters) {
        if (router.method && router.method != req.method)
            continue;

        if (router.pathname) {
            if (parsed.pathname == router.pathname)
                flag = true;
        }

        if (router.test && router.test(parsed))
            flag = true;

        if (flag) {
            router.accept(req, res);
            break;
        }
    }
    if (!flag) next();
};

const processNotFound = function(req, res, next) {
    res.statusCode = 404;
    res.end('Not Found');
};

module.exports = {
    safeCheck,
    processStaticResources,
    processDynamicResources,
    processNotFound
};