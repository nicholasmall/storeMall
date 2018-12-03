"use strict";

function Timer() {

}

// 定时器
Timer.prototype.timeOut = function (time, cb) {
    setTimeout(function () {
        cb();
    }, time || 800);
};

// 刷新当前界面
Timer.prototype.timerReload = function (time) {
    this.timeOut(time, function () {
        location.reload();
    });
};

// 弹窗、跳转界面
Timer.prototype.timerLocation = function (url, time) {
    this.timeOut(time, function () {
        window.location.href = url;
    })
};