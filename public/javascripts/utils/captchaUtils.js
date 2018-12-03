"use strict";

function getCaptcha() {
    ajax.sendRequest({
        url: "/utils/captcha",
        type: "GET",
        success: function (data) {
            $("#captchaDiv").html(data.img);
        }
    });
}