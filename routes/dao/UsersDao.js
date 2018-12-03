"use strict";

let mysqlConfig = require("../webConfig/DBConfig");
let MysqlUtils = require("../utils/MysqlUtils");
let user = require("../module/UsersBean");

function UsersDao() {
    this.db = new MysqlUtils(mysqlConfig.mysqlDBConfig);
}

UsersDao.prototype.loginDao = function (user, cb) {
    let sql = "SELECT * FROM BL_HD_USER WHERE account_name = ? and LANDING_PASSWORD = ?";
    let options = [user.userName, user.password];
    let self = this;
    this.db.sql(sql, options, (err, user) => {
        if (err) {
            return cb(err)
        }
        return cb(null, user[0] ? self.resetBean(user[0]) : null);
    })
};

UsersDao.prototype.getByUserNameDao = function (userName, cb) {
    let sql = "SELECT * FROM BL_HD_USER WHERE account_name = ? ";
    let option = [userName];
    let self = this;
    this.db.sql(sql, option, (err, user) => {
        if (err) {
            return cb(err);
        }
        return cb(null, user[0] ? self.resetBean(user[0]) : null);
    })
};

UsersDao.prototype.registerDao = function (user, cb) {
    let sql = "INSERT INTO BL_HD_USER(ACCOUNT_NAME, PHONE_NUMBER, EMAIL, LANDING_PASSWORD, SALT, USER_STATE,NAME_AUTHENTICATION) VALUES(?,?,?,?,?,?,?)";
    let option = [user.userName, user.phoneNumber, user.email, user.password, user.salt, 1, 0];
    this.db.sql(sql, option, (err, user) => {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    })
};

UsersDao.prototype.forgetPasswordDao = function (user, cb) {
    let sql = "UPDATE BL_HD_USER SET LANDING_PASSWORD=? WHERE  ACCOUNT_NAME=? ";
    let option = [user.password, user.userName];
    this.db.sql(sql, option, (err, result) => {
        if (err) {
            return cb(err);
        }
        cb(null, result)
    })
};

/**
 * 将数据库中的字段数据对应到模型中
 * @param bean
 */
UsersDao.prototype.resetBean = function (bean) {
    let keys = Object.keys(bean);
    keys.forEach((key) => {
        switch (key) {
            case "ACCOUNT_NAME":
                user.userName = bean[key];
                break;
            case "PHONE_NUMBER":
                user.phone = bean[key];
                break;
            case "EMAIL":
                user.email = bean[key];
                break;
            case "LANDING_PASSWORD":
                user.password = bean[key];
                break;
            case "TRADING_PASSWORD":
                user.tradingPWD = bean[key];
                break;
            case "USER_STATE":
                user.state = bean[key];
                break;
            case "NAME_AUTHENTICATION":
                user.auth = bean[key];
                break;
            case "ID":
                user.id = bean[key];
                break;
            case "SALT":
                user.salt = bean[key];
                break;
        }
    });
    return user;

};

module.exports = UsersDao;