"use strict";

function ResultUtils(className) {
    this.className = className;
}

ResultUtils.prototype.success = function (data, res) {
    let message = {
        code: 1,
        data: data || "",
        message: "success",
        date: new Date(),
        class: this.className
    };
    res.send(message)
};

ResultUtils.prototype.error = function (err, res) {
    let message = {
        code: 0,
        data: null,
        message: err,
        date: new Date(),
        class: this.className
    };
    res.send(message)
};

module.exports = ResultUtils;



