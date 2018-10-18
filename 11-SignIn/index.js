const http = require('http');
const express = require('express');
const server = require('./server');
const bodyParser = require('body-parser');
const SERVER_PORT = 8000;

app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(express.static(path.resolve(__dirname, "../assets")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const addingSep = str => str.indexOf("://") != -1 || str.startsWith("/") ? str : "/" + str;

Object.keys(json)
    .filter(key => !key.endsWith("map"))
    .filter(key => !key.startsWith("app"))
    .forEach(key => js.push(addingSep(json[key])));

Object.keys(json)
    .filter(key => !key.endsWith("map"))
    .filter(key => key.startsWith("app"))
    .forEach(key => js.push(addingSep(json[key])));

Object.keys(server)
    .map(key => server[key])
    .forEach(router => app[router.method](`${router.path}`, router.handlers));

http.createServer(function(req, res) {
    callRouter(req, res, 0);
}).listen(SERVER_PORT);