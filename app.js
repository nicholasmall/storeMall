"use strict";
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');

let session = require("express-session");
let NedbStore = require('nedb-session-store')(session);
const sessionMiddleware = session({
    secret: "store mall",
    resave: true,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 30 * 60 * 1000
    },
    store: new NedbStore({filename: 'path_to_nedb_persistence_file.db'})
});

let app = express();

let IndexController = require('./routes/contoller/IndexController');
let UsersController = require('./routes/contoller/UsersController');
let UtilsController = require('./routes/contoller/UtilsController');

const port = 3001;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置请求最大数据
app.use(bodyParser.json({limit: '50kb'}));
app.use(bodyParser.urlencoded({limit: '50kb', extended: true}));
app.use(sessionMiddleware);


app.use("/", IndexController);
app.use('/users', UsersController);
app.use('/utils', UtilsController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.locals.message = "系统异常";
    res.locals.error = '';
    res.render('error');
});

app.listen(port, function () {
    console.log("Express server listening on port " + port);
});

module.exports = app;