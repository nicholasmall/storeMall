"use strict";

function Format() {

}

//时间格式化
Format.prototype.formatDateForUTC = function (dateStr) {
    let d = new Date(dateStr);
    return d.getFullYear() + '-' +
        (d.getMonth() + 1) + '-' +
        d.getDate() + ' ' +
        d.getHours() + ':' +
        (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + ':' +
        (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
};

/**
 * 数字格式化 123,456,789.0321...
 * @return {string}
 */
Format.prototype.CommaFormatted = function (amount) {
    let delimiter = ",";
    amount = String(amount);
    let a = amount.split('.', 2);

    let d = a[1];
    let i = parseInt(a[0]);
    if (isNaN(i)) {
        return "";
    }
    let minus = '';
    if (i < 0) {
        minus = '-';
    }
    i = Math.abs(i);
    let n = String(i);
    a = [];
    while (n.length > 3) {
        let nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) {
        a.unshift(n);
    }
    n = a.join(delimiter);

    if (d && d.length > 0) {
        amount = n + '.' + d;
    } else {
        amount = n;
    }
    amount = minus + amount;
    return amount;
};