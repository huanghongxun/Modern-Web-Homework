const express = require('express');
const path = require('path');
const server = require('./server');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const SERVER_PORT = 8000;

mongoose.connect('mongodb://localhost/auth');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error '));
db.once('open', function() {});

const app = express();
app.use(express.static(path.resolve(__dirname, "./dist")));
app.use(express.static(path.resolve(__dirname, "./assets")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: '17343050',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: db})
}));

Object.keys(server)
    .map(key => server[key])
    .forEach(router => app[router.method](router.pathname, router.handlers));

app.listen(SERVER_PORT);