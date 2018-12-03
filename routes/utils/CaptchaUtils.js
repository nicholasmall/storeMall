"use strict";

function CaptchaUtils() {

}

CaptchaUtils.prototype.getCaptchaCode = (req) => {
    return req.session.captcha;

};

module.exports = CaptchaUtils;