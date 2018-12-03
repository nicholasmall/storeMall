"use strict";

let popup = new PopupUtils();
let encryptUtils = new EncryptUtils();
let captchaCode = new CaptchaCode();
$(function () {

//发送验证码
    $("#sendPhoneCodeBtn").click(function () {
        let self = $(this);
        let username = $("input[name=accountName]");
        self.attr({"disabled": "disabled"});
        username.attr("disabled", "disabled");
        $.utils.ajax({
            url: "/user/sendForgetPWDSMSCode",
            data: {username: username.val(), captchaCode: $("input[name=captchaCode]").val()},
            type: "GET",
            success: function (data) {
                if (data === true) {
                    $.utils.timerFun(self, function () {
                        self.removeAttr("disabled");
                    });
                } else {
                    captchaCode.reload();
                    username.removeAttr("disabled");
                    self.removeAttr("disabled");
                }
            }, fail: function (data) {
                username.removeAttr("disabled");
                if (data.code === 2014) {
                    $.utils.timerFun(self, function () {
                        self.removeAttr("disabled");
                    });
                } else {
                    captchaCode.reload();
                    self.removeAttr("disabled");
                }
                popup.layerTips(data.message);
            }
        })

    });

    $("#forgetPasswordBtn").click(function () {

        let newPassword = $("input[name=newPassword]");
        let confirmPassword = $("input[name=confirmPassword]");
        let pwd = newPassword.val();
        let confPwd = confirmPassword.val();
        newPassword.val(encryptUtils.resEncrypt(newPassword.val()));
        confirmPassword.val(encryptUtils.resEncrypt(confirmPassword.val()));
        $.utils.ajax({
            url: "/user/forgetPassword",
            data: $("form").serialize(),
            success: function (data) {
                if (data) {
                    let message = "";
                    if (server_consts.language === "en") {
                        message = "forget password success";
                    } else if (server_consts.language === "zh_CN") {
                        message = "找回密码成功";
                    }
                    popup.layerTips(message, server_consts.tips, function () {
                        window.location.href = server_consts.root + "/login";
                    }, 2000);
                }
            }, fail: function (error) {
                captchaCode.reload();
                newPassword.val(pwd);
                confirmPassword.val(confPwd);
                popup.layerTips(error.message, server_consts.tips);
            }
        })
    })

});