"use strict";

let validate = new Validate();
let message = $(".errorMessage");
let encryptUtils = new EncryptUtils();
$(function () {
    $("#loginBut").click(loginFunc);
    $("body").keydown(function (event) {
        if (event.keyCode === 13) {
            loginFunc();
        }
    })

});

function loginFunc() {
    let userName = $("input[name=username]").val();
    let userPWd = $("input[name=password]");
    if (validate.emailCheck(userName) && validate.phoneNumberCheck(userName)) {
        message.html("账号错误！");
        return;
    }
    if (!userPWd.val()) {
        message.html("密码不能为空！");
        return;
    } else if (userPWd.val().length < 6 || userPWd.val().length > 18) {
        message.html("密码格式错误！");
        return;
    }
    userPWd.val(encryptUtils.resEncrypt(userPWd.val()));
    // let params = $.utils.getUrlParams("backstageUrl");
    // if(params){
    //     console.log(params);
    //     $("#loginForm").append(`<input type='hidden' value='${params+window.location.hash}' name="backstageUrl" >`);
    // }
    $("form").submit();
}