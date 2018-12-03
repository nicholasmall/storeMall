"use strict";

function Validate() {

}

Validate.prototype.validateAjax = function (option) {
    if (!option) {
        return true;
    } else if (!option.url) {
        return true;
    } else if (!option.success && !option.error) {
        return true;
    }
    return false;
};

/**
 * 验证邮箱格式
 * @param emailNo
 * @returns {boolean}
 */
Validate.prototype.emailCheck = function (emailNo) {
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    if (emailNo === "") {
        return true;
    } else
        return !reg.test(emailNo);
};

/**
 * 检查手机号码格式
 * @param PN
 * @returns {boolean}
 */
Validate.prototype.phoneNumberCheck = function (PN) {
    if (PN === "") {
        return true;
    }
    return !(/^1([34578])\d{9}$/.test(PN));
};

/**
 * 检查是否有中文
 * @param str
 * @returns {boolean}
 */
Validate.prototype.CheckChinese = function (str) {
    return !str.match(/^[(\u4e00-\u9fa5)]+$/);
};

//检查url 是否正确， 用于厂商认证公司url，必须是http、https/ftp开头的,并且是*.*或者*.*.*格式不能有其他特殊字符
// 如：http://anwang.com
Validate.prototype.checkUrl = function (url) {
    let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    return !reg.test(url);
};


// 将可能是xss的代码转义
Validate.prototype.validateAjaxParameter = function (data) {
    let keys = [];
    if (typeof data === "string") {
        keys = Object.keys(JSON.parse(data));
    } else if (typeof data === "object") {
        keys = Object.keys(data);
    }
    if (keys.length) {
        keys.forEach(function (value) {
            data[value] = replaceScript(data[value]);
        })
    }
    return JSON.stringify(data);
};

// 检查参数长度
Validate.prototype.validateParamLength = function (data) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        if (data[keys[i]].length > 100) {
            return true;
        }
    }
    return false;
};

// 验证session是否超时
Validate.prototype.validateSession = function () {
    // if (!isLogin) {
    //     try {
    //         loadingPop("登录超时...");
    //         top.location.href = "/index";
    //     } catch (e) {
    //         loadingPop("登录超时,正在返回首页");
    //         window.location.href = "/index";
    //     }
    // }
};

const vcity = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
    21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
    33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
    42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
    51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
    63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
};

Validate.prototype.checkCard = function (obj) {
    //校验长度，类型
    if (this.isCardNo(obj) === false) {
        return false;
    }
    //检查省份
    if (this.checkProvince(obj) === false) {
        return false;
    }
    //校验生日
    if (this.checkBirthday(obj) === false) {
        return false;
    }
    //检验位的检测
    return this.checkParity(obj) !== false;
};

//检查号码是否符合规范，包括长度，类型
Validate.prototype.isCardNo = function (obj) {
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    return reg.test(obj) !== false;
};
//取身份证前两位,校验省份
Validate.prototype.checkProvince = function (obj) {
    let province = obj.substr(0, 2);
    return vcity[province] !== undefined;
};
//检查生日是否正确
Validate.prototype.checkBirthday = function (obj) {
    let len = obj.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len === 15) {
        let re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        let arr_data = obj.match(re_fifteen);
        let year = arr_data[2];
        let month = arr_data[3];
        let day = arr_data[4];
        let birthday = new Date('19' + year + '/' + month + '/' + day);
        return this.verifyBirthday('19' + year, month, day, birthday);
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len === 18) {
        let re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        let arr_data = obj.match(re_eighteen);
        let year = arr_data[2];
        let month = arr_data[3];
        let day = arr_data[4];
        let birthday = new Date(year + '/' + month + '/' + day);
        return this.verifyBirthday(year, month, day, birthday);
    }
    return false;
};

//校验日期
Validate.prototype.verifyBirthday = function (year, month, day, birthday) {
    let now = new Date();
    let now_year = now.getFullYear();
    if (birthday.getFullYear() === year && (birthday.getMonth() + 1) === month && birthday.getDate() === day) {
        let time = now_year - year;
        return time >= 0 && time <= 130;
    }
    return false;
};

//校验位的检测
Validate.prototype.checkParity = function (obj) {
    //15位转18位
    obj = changeFivteenToEighteen(obj);
    let len = obj.length;
    if (len === 18) {
        let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        let cardTemp = 0, i, valnum;
        for (i = 0; i < 17; i++) {
            cardTemp += obj.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[cardTemp % 11];
        return valnum === obj.substr(17, 1);

    }
    return false;
};

//15位转18位身份证号
Validate.prototype.changeFivteenToEighteen = function (obj) {
    if (obj.length === 15) {
        let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        let cardTemp = 0, i;
        obj = obj.substr(0, 6) + '19' + obj.substr(6, obj.length - 6);
        for (i = 0; i < 17; i++) {
            cardTemp += obj.substr(i, 1) * arrInt[i];
        }
        obj += arrCh[cardTemp % 11];
        return obj;
    }
    return obj;
};