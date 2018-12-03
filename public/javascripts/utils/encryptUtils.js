"use strict";

function EncryptUtils() {
    let self = this;
    require([server_consts.root + "/static/js/thirdparty/javascriptEncrypt/jsencrypt.js"], function (JSEncrypt) {
        self.encrypt = new JSEncrypt.JSEncrypt();
        self.init();
    });
}

EncryptUtils.prototype.init = function () {
    let self = this;
    $.utils.ajax({
        url: "/DefaultPublicKey",
        success: function (resDate) {
            self.encrypt.setPublicKey(resDate.publicKey);
        }, fail: function (error) {
            self.encrypt.setPublicKey(error.publicKey);
        }
    })
};

EncryptUtils.prototype.resEncrypt = function (data) {
    return this.encrypt.encrypt(data);
};

