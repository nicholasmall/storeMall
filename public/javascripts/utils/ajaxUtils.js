"use strict";
let validate = new Validate();

//TODO 设置返回值状态
const responseConf = {
    0: "",
    1: ""
};

function AjaxUtils() {
    this.ajaxDefaultParams = {}
}

AjaxUtils.prototype.sendRequest = function (params) {
    let self = this;
    if (validate.validateAjax(params)) {
        return; //TODO
    }
    $.ajax({
        url: params.url,
        data: params.data,
        type: params.type || "POST",
        dataType: params.dataType || "JSON",
        async: params.async || true,            // 是否异步
        cache: params.cache || true,            // 是否缓存
        // contentType: params.contentType || "application/json; charset=utf-8",
        success: function (result) {
            self.success(result, params.success);
        }, error: function (err) {
            self.error(err, params.error);
        }, compile: function (end) {
            self.compile(end, params.compile);
        }
    })
};

AjaxUtils.prototype.sendUploadRequest = function (params) {
    let self = this;
    if (validate.validateAjax(params)) {
        return; //TODO
    }
    $.ajax({
        url: params.url,                        // 连接/*server_consts.root +*/
        type: params.type || "post",            //请求方式
        data: params.data || "",                //数据
        async: params.async || true,            // 是否异步
        cache: params.cache || true,            // 是否缓存
        dataType: params.dataType || "JSON",    // 返回值类型
        processData: false,
        contentType: false,  //数据编码
        enctype: 'multipart/form-data',
        success: function (result) {
            self.success(result, params.success);
        }, error: function (err) {
            self.error(err, params.error);
        }, compile: function (end) {
            self.compile(end, params.compile);
        }
    })
};

AjaxUtils.prototype.success = function (result, callback) {
    //TODO  处理返回信息
    callback(result);// 这里是返回数据还是返回整个请求待定
};

AjaxUtils.prototype.error = function (error, callback) {
    if (callback && typeof callback === "function") {
        return callback(error);
    }
};

AjaxUtils.prototype.compile = function (end, callback) {
    if (callback && typeof callback === "function") {
        return callback(end);
    }
};

// TODO 待定 是否处理后端返回状态码
// AjaxUtils.prototype.handType = function (result) {
//     result.code
// };