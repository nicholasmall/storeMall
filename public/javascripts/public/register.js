"use strict";

let validate = new Validate();
let message = $(".errorMessage");

let popup = new PopupUtils();
let encryptUtils = new EncryptUtils();
let captchaCode = new CaptchaCode();

$(function () {
    $("#registerBut").click(function () {
        /*if (!$("#termsOfService").is(":checked")) {
            if (server_consts.language === "zh_CN") {
                popup.layerTips("请阅读服务条款", server_consts.tips);
            } else if (server_consts.language === "en") {
                popup.layerTips("Please read the Terms of Service", server_consts.tips);
            }
            return;
        }*/
        let landingPassword = $("input[name=landingPassword]");
        let confirmPassword = $("input[name=confirmPassword]");
        let pwd = landingPassword.val();
        let confPwd = confirmPassword.val();
        landingPassword.val(encryptUtils.resEncrypt(landingPassword.val()));
        confirmPassword.val(encryptUtils.resEncrypt(confirmPassword.val()));
        message.html("");
        $.utils.ajax({
            url: "/user/register",
            data: $("#registerFrom").serialize(),
            success: function (data) {
                if (data === true) {
                    popup.layerTips("注册成功。", server_consts.tips, function () {
                        window.location.href = server_consts.root + "/login";
                    });
                }
            },
            fail: function (data) {
                landingPassword.val(pwd);
                confirmPassword.val(confPwd);
                captchaCode.reload();
                message.html(data.message);
            }
        })
    });

    //发送验证码
    $("#sendRegisterCodeBtn").click(function () {
        let self = $(this);
        let username = $("input[name=phoneNumber]").val();
        self.attr({"disabled": "disabled"});
        $.utils.ajax({
            url: "/user/sendSMSCode",
            data: {username: username, captchaCode: $("input[name=captchaCode]").val()},
            type: "GET",
            fail: function (data) {
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
    })

});

function validateUserName(username) {
    if (!validate.phoneNumberCheck(username)) {
        return 1;
    } else if (!validate.emailCheck(username)) {
        return 2;
    } else {
        return 0;
    }
}
