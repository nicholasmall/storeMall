"use strict";

let crypto = require('crypto');  //加载crypto库
/*
    加密模式列表
    'DSA', 'DSA-SHA', 'DSA-SHA1', 'DSA-SHA1-old',
    'RSA-MD4', 'RSA-MD5', 'RSA-MDC2', 'RSA-RIPEMD160',
    'RSA-SHA', 'RSA-SHA1', 'RSA-SHA1-2', 'RSA-SHA224',
    'RSA-SHA256', 'RSA-SHA384', 'RSA-SHA512',
    'dsaEncryption', 'dsaWithSHA', 'dsaWithSHA1', 'dss1', 'ecdsa-with-SHA1',
    'md4', 'md4WithRSAEncryption', 'md5', 'md5WithRSAEncryption', 'mdc2', 'mdc2WithRSA',
    'ripemd', 'ripemd160', 'ripemd160WithRSA', 'rmd160',
    'sha', 'sha1', 'sha1WithRSAEncryption', 'sha224', 'sha224WithRSAEncryption',
    'sha256', 'sha256WithRSAEncryption', 'sha384', 'sha384WithRSAEncryption',
    'sha512', 'sha512WithRSAEncryption', 'shaWithRSAEncryption',
    'ssl2-md5', 'ssl3-md5', 'ssl3-sha1', 'whirlpool'
 */
function CryptoUtils() {

}

CryptoUtils.prototype.cryptoPWD = function (pwd, salt) {
    return this.RSA_SHA256(this.SHA256(pwd + salt));
};


CryptoUtils.prototype.SHA256 = function (str) {
    let SHA256 = crypto.createHash('sha256');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    SHA256.update(str);
    return SHA256.digest('hex');  //加密后的值d
};

CryptoUtils.prototype.RSA_SHA256 = function (str) {
    let SHA256 = crypto.createHash('RSA-SHA256');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    SHA256.update(str);
    return SHA256.digest('hex');  //加密后的值d
};

CryptoUtils.prototype.MD4 = function (str) {
    let SHA256 = crypto.createHash('md4');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    SHA256.update(str);
    return SHA256.digest('hex');  //加密后的值d
};
CryptoUtils.prototype.salt = function () {
    let random = parseInt(Math.random() * new Date().getTime() / 1000);
    let add = Math.max(parseInt(Math.pow(parseInt(Math.random() * 100), parseInt(Math.random() * 100))), 1);
    let div = Math.min(parseInt(Math.pow(parseInt(Math.random() * 100), parseInt(Math.random() * 100))), 10000);
    return this.MD4(String(random + add - div + 3367));
};

module.exports = CryptoUtils;