"use strict";
let app = require("express").Router();

app.get("/", (req, res) => {
    let user = req.session.userSession;
    res.render('public/index', {title: 'home | Mall', isLoad: !!user, user: user});
});

app.get("/public/page/help", (req, res) => {
    let user = req.session.userSession;
    res.render('public/help', {title: 'help | Mall', isLoad: !!user, user: user});
});

app.get("/public/page/register", (req, res) => {
    let user = req.session.userSession;
    res.render('public/register', {title: 'register | Mall', isLoad: !!user, user: user});
});

app.get("/public/page/login", (req, res) => {
    let user = req.session.userSession;
    res.render('public/login', {title: 'login | Mall', isLoad: !!user, user: user});
});

app.get("/public/page/forgetPassword", (req, res) => {
    let user = req.session.userSession;
    res.render('forgetPassword', {title: 'forgetPassword | Mall', isLoad: !!user, user: user});
});

app.get("/public/page/buyProduction", (req, res) => {
    let user = req.session.userSession;
    res.render('buyProduction', {title: 'buyProduction | Mall', isLoad: !!user, user: user});
});

module.exports = app;