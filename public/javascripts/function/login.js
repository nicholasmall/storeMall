"use strict";

let popup = new PopupUtils();
$(function () {
    $("#loginBtn").click(function () {
        let userName = $("input[name=userName]").val();
        let pwd = $("input[name=password]").val();
        if (!userName || userName.length < 6) {
            popup.layerTips("账号格式错误!");
            return false;
        } else if (!pwd || pwd.length < 6 || pwd.length > 18) {
            popup.layerTips("密码格式错误!");
            return false;
        }
        ajax.sendRequest({
            url: "/users/login",
            data: $("#loginForm").serialize(),
            success: function (data) {
                if (data.code === 0) {
                    popup.layerTips(data.message);
                } else {
                    window.location.href = "/";
                }
            }, error: function (err) {
                console.log(err);
            }
        })
    })
});