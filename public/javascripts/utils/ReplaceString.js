"use strict";

// 可能是xss 的字符,和替换后的字符串

function ReplaceString() {
    this.allEnglishCharacter = /[ |`~!@#$%^&*()\-_=+{}[\];:'",<.>\/?\\]/g;
    this.englishCharacterNotComma = /[ |`~!@#$%^&*()\-_=+{}[\];:'"<.>\/?\\]/g;
    this.allChineseCharacter = /[·！￥…（）：“”‘’《》？【】、；，。]/g;
    this.replaceList = [['<', '&lt;'], ['>', '&gt;'], ["\'", "&#39;"], ["\"", "&quot;"]];
}

// 删除所有特殊字符
ReplaceString.prototype.strReplace = function (str) {
    return str.replace(this.allChineseCharacter, '').replace(this.allEnglishCharacter, '');
};

// 删除所有字符除了英文逗号
ReplaceString.prototype.strReplaceNotComma = function (str) {
    return str.replace(this.englishCharacterNotComma, '').replace(this.allChineseCharacter, '');
};

//删除中文 不包括常见中文符号(键盘中可以打出的)
ReplaceString.prototype.removeChineseCode = function (str) {
    return str.replace(/[\u4E00-\u9FA5]/g, '');
};

// 删除字母
ReplaceString.prototype.removeLetter = function (str) {
    return str.replace(/[a-zA-Z]/g, '');
};

/**
 *  替换字符串中所有相关字符
 * @param str    操作的字符串
 * @param subStr 替换的字符
 * @param replacement 替换后的字符
 * @returns {string | void}
 */
ReplaceString.prototype.replaceAll = function (str, subStr, replacement) {
    return str.replace(new RegExp(subStr, "gm"), replacement);
};

// 去除可能是xss的代码
ReplaceString.prototype.replaceScript = function (str) {
    let self = this;
    if (str && str.length) {
        if (str.indexOf("script") > 0) {
            this.replaceList.forEach(function (value) {
                str = self.replaceAll(str, value[0], value[1]);
            });
        }
    }
    return str;
};