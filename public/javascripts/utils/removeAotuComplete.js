"use strict";
// 去除 google自动填充到input
if (navigator.userAgent.toLowerCase().indexOf("chrome") !== -1) {
    let inputErs = document.getElementsByTagName("input");
    for (let i = 0; i < inputErs.length; i++) {
        if (inputErs[i].type !== "submit") {
            inputErs[i].disabled = true;
        }
    }
    setTimeout(function () {
        for (let i = 0; i < inputErs.length; i++) {
            if (inputErs[i].type !== "submit") {
                inputErs[i].disabled = false;
            }
        }
    }, 100);
}