"use strict";
let router = require("express").Router();

let UserService = require("../service/UsersService");
let ResultUtils = require("../webConfig/ResultUtils");
let UsersHelp = require("../help/UsersHelp");

let userService = new UserService();
let resultUtils = new ResultUtils("usersController");
let usersHelp = new UsersHelp();

router.post("/login", (req, res) => {
    let loginCount = req.session.loginCount;
    if (loginCount && loginCount.count >= 3) {
        if (loginCount.time > new Date().getTime()) {
            return resultUtils.error("错误登录次数过多，请稍后!", res);
        }
    }
    let user = req.body;
    let errorMessage = usersHelp.validateLogin(user);
    if (errorMessage) {
        resultUtils.error(errorMessage, res);
        return;
    }

    userService.loginService(user, function (err, user) {
        if (err) {
            return resultUtils.error("系统异常", res);
        }
        if (user) {
            req.session.userSession = user;
            delete req.session.loginCount;
            resultUtils.success(user, res);
        } else {
            if (loginCount) {
                if (loginCount.count + 1 > 3) {
                    req.session.loginCount = {
                        count: loginCount.count,
                        time: new Date().getTime() + 10 * 60 * 1000
                    };
                    return resultUtils.error("错误登录次数过多，请稍后!", res);
                } else {
                    if (loginCount.count) {
                        req.session.loginCount = {
                            count: ++loginCount.count,
                            time: 0
                        }
                    }
                }
            } else {
                req.session.loginCount = {
                    count: 1,
                    time: 0
                }
            }
            resultUtils.error("账号或者密码错误！！", res);
        }
    })
});

router.get("/logout", (req, res) => {
    console.log("join logout function ");
    console.log(req.session.userSession);
    req.session.userSession = null;
    res.redirect("/");
});

router.post("/register", (req, res) => {
    let user = req.body;
    let errorMessage = usersHelp.validateRegister(user, req);
    if (errorMessage) {
        return resultUtils.error(errorMessage, res);
    }

    userService.getByUserNameService(user.userName, (err, users) => {
        if (err) {
            return resultUtils.error("系统异常", res);
        }
        if (users) {
            return resultUtils.error("用户已注册！！", res);
        } else {
            userService.registerService(user, (err) => {
                if (err) {
                    return resultUtils.error("系统异常", res);
                }
                resultUtils.success("注册成功。", res);
            });
        }
    });

});

router.post("/forgetPassword", (req, res) => {
    let user = req.body;
    let errorMessage = usersHelp.validateForgetPWD(user, req);
    if (errorMessage) {
        return resultUtils.error(errorMessage, res);
    }

    userService.forgetPasswordService(user, function (err, result) {
        if (err) {
            if (err.code === 1) {
                resultUtils.error("系统异常！！", res);
            } else if (err.code === 0) {
                resultUtils.error("用户不存在！！！", res);
            }
        }

        if (result) {
            resultUtils.success("找回密码成功。", res);
        } else {
            resultUtils.error("密码找回失败，请稍后再试", res);
        }

    })

});

module.exports = router;