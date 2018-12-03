"use strict";

let ValidateUtils = require("../utils/ValidateUtils");
let CaptchaUtils = require("../utils/CaptchaUtils");

let validate = new ValidateUtils();
let captchaUtils = new CaptchaUtils();


/**
 * 验证用户操作时，传入的参数是否合法
 * @constructor
 */
function UsersHelp() {

}

//------------------------------------ 根据不同方法进行一次性验证 start ↓  ------------------------------------

// 验证登录数据
UsersHelp.prototype.validateLogin = function (user) {
    let UNMsg = this.userNameV(user.userName);
    if (UNMsg) {
        return UNMsg;
    }
    let PWDMsg = this.passwordV(user.password);
    if (PWDMsg) {
        return PWDMsg;
    }

    return null;
};

//验证注册数据
// username pwd confPWD email phone
UsersHelp.prototype.validateRegister = function (user, req) {
    let msg = this.validateLogin(user); // 需要验证的参数有部分和登录验证的一样，这里共用
    if (msg) {
        return msg;
    }
    let confPwdMsg = this.confPasswordV(user.password, user.confPassword);
    if (confPwdMsg) {
        return confPwdMsg;
    }
    let phoneMsg = this.phoneNumberV(user.phoneNumber);
    if (phoneMsg) {
        return phoneMsg;
    }
    let emailMsg = this.emailV(user.email);
    if (emailMsg) {
        return emailMsg;
    }
    let captchaMsg = this.captchaCodeV(user.captchaCode, req);

    return null;
};

UsersHelp.prototype.validateForgetPWD = function (user, req) {
    let msg = this.validateLogin(user); // 需要验证的参数有部分和登录验证的一样，这里共用
    if (msg) {
        return msg;
    }
    let confPwdMsg = this.confPasswordV(user.password, user.confPassword);
    if (confPwdMsg) {
        return confPwdMsg;
    }
    let smsMsg = this.smsCodeV(user.SMSCode);
    if (smsMsg) {
        return smsMsg;
    }
    return null;
};

//------------------------------------ 根据不同方法进行一次性验证 end ↑  ------------------------------------


//------------------------------------ 每个属性分开验证 start ↓  ------------------------------------

UsersHelp.prototype.captchaCodeV = (captchaCode, req) => {
    if (captchaCode !== captchaUtils.getCaptchaCode(req)) {
        return "图形验证码错误！！";
    }
    return null;
};

UsersHelp.prototype.smsCodeV = (smsCode) => {
    if (smsCode.length !== 4) {
        return "短信验证码错误！！！";
    }
    return null;
};

UsersHelp.prototype.emailV = (email) => {
    if (validate.emailCheck(email)) {
        return "邮箱格式错误！！";
    }
    return null;
};

UsersHelp.prototype.phoneNumberV = (phone) => {
    if (validate.phoneNumberCheck(phone)) {
        return "手机号码错误！！";
    }
    return null;
};

UsersHelp.prototype.confPasswordV = (pwd, confPWd) => {
    if (pwd !== confPWd) {
        return "两次密码不一致！！"
    }
    return null;
};


UsersHelp.prototype.passwordV = (pwd) => {
    if (validate.inNull(pwd)) {
        return "密码不能为空";
    } else if (pwd.length < 6 || pwd.length > 18) {
        return "密码格式错误!";
    }
    return null;
};


UsersHelp.prototype.userNameV = (userName) => {
    if (validate.inNull(userName)) {
        return "账号不能为空";
    } else if (validate.containsSpecialCharacters(userName)) {
        return "账号不能有特殊字符";
    } else if (userName.length < 8 || userName.length > 18) {
        return "账号在8至18位之间！";
    }
    return null;
};

//------------------------------------ 每个属性分开验证 end ↑  ------------------------------------

module.exports = UsersHelp;