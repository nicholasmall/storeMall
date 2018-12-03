"use strict";
let replaceUtils;
try {
    replaceUtils = new ReplaceString();
} catch (e) {
    console.error("not require ReplaceString.js file");
}
$(function () {
    $("div#pagination div input#pageGo").attr("class", "phoneNumber");

    $(".strReplace").on("keyup", function () {
        $(this).val(replaceUtils.strReplace($(this).val()));
    });

    $(".strReplaceNotDH").on("keyup", function () {
        $(this).val(replaceUtils.strReplaceNotComma($(this).val()).replace(/\s+/g, ""));
    });

    $(".notChineseCode").on("keyup", function () {
        $(this).val(replaceUtils.strReplace(replaceUtils.removeChineseCode($(this).val())));
    });

    $(".phoneNumber").on("keyup", function () {
        let number = replaceUtils.strReplace(replaceUtils.removeLetter(replaceUtils.removeChineseCode($(this).val())));
        $(this).val(number.length > 16 ? number.substring(0, 16) : number);
    });
    $(".idCardNo").on("keyup", function () {
        let number = replaceUtils.strReplace(replaceUtils.removeChineseCode($(this).val()));
        $(this).val(number.length > 18 ? number.substring(0, 18) : number);
    });
    $(".eltAddr").on("keyup", function () {
        let number = replaceUtils.strReplace(replaceUtils.removeChineseCode($(this).val()));
        $(this).val(number.length > 34 ? number.substring(0, 34) : number);
    });
    $(".replaceSpace").on("keyup", function () {
        $(this).val($(this).val().replace(/\s+/g, ""));
    });
});