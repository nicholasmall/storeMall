"use strict";
let popup = new PopupUtils();
let timer = new Timer();
$(function () {
    $("#captchaDiv").click(getCaptcha);

    $("#registerBtn").click(() => {
        let username = $("input[name=userName]").val();
        let password = $("input[name=password]").val();
        let confPassword = $("input[name=confPassword]").val();
        let email = $("input[name=email]").val();
        let phoneNumber = $("input[name=phoneNumber]").val();
        let captchaCode = $("input[name=captchaCode]").val();

        if (username.length < 8 || username.length > 18) {
            popup.layerTips("账号8至18位之间！！");
            return false;
        } else if (password.length < 6 || password.length > 18) {
            popup.layerTips("密码6至18位之间！！");
            return false;
        } else if (confPassword !== password) {
            popup.layerTips("两次密码不一致！！");
            return false;
        } else if (validate.emailCheck(email)) {
            popup.layerTips("邮箱格式错误！！");
            return false;
        } else if (validate.phoneNumberCheck(phoneNumber)) {
            popup.layerTips("手机号码格式错误！！");
            return false;
        } else if (captchaCode.length !== 4) {
            popup.layerTips("验证码错误！！");
            return false;
        }
        ajax.sendRequest({
            url: "/users/register",
            data: $("#registerForm").serialize(),
            success: function (data) {
                if (data.code === 1) {
                    popup.layerTips("注册成功。");
                    timer.timerLocation("public/page/login");
                } else {
                    popup.layerTips(data.message);
                }
            }, error: function (err) {
                console.log(err);
            }
        })
    })

});

getCaptcha();