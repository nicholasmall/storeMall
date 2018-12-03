"use strict";

/**
 * @author mall
 * @date 2018-10-12 11:01:19
 *  封装弹出框  打开和关闭
 * @constructor
 */
function PopupUtils() {
    let self = this;
    this.popup = $("#popupDiv");
    this.mask = $("#mask");
    this.popupTitle = this.popup.children("#popupTitle");
    this.popupContext = this.popup.children("#popupContext");
    this.PopupConfirmBtn = this.popup.children("#PopupConfirmBtn");
    this.popupCancelBtn = this.popup.children("#popupCancelBtn");
    this.popup.children("#popupClose").click(function () {
        self.close();
    });
}

/**
 * @param title
 * @param context
 * @param cbs 多个回调函数，第一个是确认，第二个是关闭
 */
PopupUtils.prototype.open = function (title, context, ...cbs) {
    let self = this;
    this.popupTitle.html(title);
    this.popupContext.html(context);
    this.popupCancelBtn.click(function () {
        self.close();
    });
    this.PopupConfirmBtn.click(function () {
        self.close();
    });

    if (cbs) {
        if (cbs[0] && typeof cbs[0] === 'function') {
            this.PopupConfirmBtn.click(cbs[0]);
        } else {
        }
        if (cbs[1] && typeof cbs[1] === 'function') {
            this.popupCancelBtn.click(cbs[1]);
        }
    }
    this.mask.show();
    this.popup.show();
};

/**
 * 无按钮弹出框， 如果不传标题，只会显示内容
 * @param title
 * @param context
 * @param cb
 * @param timer
 */
PopupUtils.prototype.layerTips = function (context, title, cb, timer) {
    let self = this;
    timer = timer || 3000;
    this.popupTitle.html(title || "");
    this.popupContext.html(context || "");
    this.popupCancelBtn.hide();
    this.PopupConfirmBtn.hide();
    this.popup.show();
    this.popup.css("width", "300px");
    this.popup.css("margin-left", "-150px");
    this.mask.hide();
    setTimeout(function () {
        self.close();
        self.popupCancelBtn.show();
        self.PopupConfirmBtn.show();
        if (cb && typeof cb === "function") {
            cb();
        }
    }, timer);
};

PopupUtils.prototype.close = function () {
    // 初始化 所有参数
    this.popup.css("width", "580px");
    this.popup.css("margin-left", "-290px");
    this.popup.hide();
    this.mask.hide();

    this.popupTitle.html();
    this.popupContext.html();
    this.PopupConfirmBtn.html("确认");

    this.PopupConfirmBtn.unbind();
    this.popupCancelBtn.unbind();

    this.popupCancelBtn.show();
};

/**
 * 一个按钮的弹出框
 * @param context
 * @param title
 * @param btnName
 * @param cb
 */
PopupUtils.prototype.singleButton = function (context, title, btnName, cb) {
    this.popupTitle.html(title);
    this.popupContext.html(context);
    this.popupCancelBtn.hide();
    this.PopupConfirmBtn.click(function () {
        self.close();
    });
    this.PopupConfirmBtn.html(btnName || "确认");
    if (cb) {
        if (cb && typeof cb === 'function') {
            this.PopupConfirmBtn.click(cb);
        }
    }
    this.mask.show();
    this.popup.show();
};
