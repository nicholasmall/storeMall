"use strict";

let popup = new PopupUtils();
let timer = new Timer();

$(() => {
    $("#captchaDiv").click(getCaptcha);

    $("#forgetPWDBtn").click(() => {
        let userName = $("input[name=userName]").val().length;
        let password = $("input[name=password]").val();
        let confPassword = $("input[name=confPassword]").val();
        let captchaCode = $("input[name=captchaCode]").val().length;
        let SMSCode = $("input[name=SMSCode]").val().length;

        if (userName < 8 || userName > 18) {
            return popup.layerTips("账号格式错误！！");
        } else if (password.legnth < 6 || password.length > 18) {
            return popup.layerTips("密码格式错误！！");
        } else if (confPassword !== password) {
            return popup.layerTips("两次密码不一致！！");
        } else if (captchaCode !== 4) {
            return popup.layerTips("验证码错误！！");
        } else if (SMSCode !== 4) {
            return popup.layerTips("短信码错误！！");
        }

        ajax.sendRequest({
            url: "/users/forgetPassword",
            data: $("#forgetPWDFrom").serialize(),
            success: (data) => {
                if (data.code === 1) {
                    popup.layerTips("找回密码成功。", "喜大普奔");
                    timer.timerLocation("/public/page/login");
                } else {
                    popup.layerTips(data.message, "提示");
                }
            }
        })
    })
});

getCaptcha();