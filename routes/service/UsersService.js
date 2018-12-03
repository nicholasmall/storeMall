"use strict";

let UsersDao = require("../dao/UsersDao");
let CryptoUtils = require("../utils/CryptoUtils");

const userDao = new UsersDao();
const crypto = new CryptoUtils();

function UsersService() {
}

UsersService.prototype.loginService = (user, cb) => {
    userDao.getByUserNameDao(user.userName, (err, DBUser) => {
        if (err) {
            return cb(err);
        }
        if (DBUser) {
            let cryptoPassword = crypto.cryptoPWD(user.password, DBUser.salt);
            if (cryptoPassword === DBUser.password) {
                cb(null, DBUser);
            } else {
                cb(null, null);
            }
        } else {
            return cb(null, null)
        }
    });
};

UsersService.prototype.getByUserNameService = (userName, cb) => {
    userDao.getByUserNameDao(userName, cb);
};

UsersService.prototype.registerService = (user, cb) => {
    user.salt = crypto.salt(); //加密
    user.password = crypto.cryptoPWD(user.password, user.salt);
    userDao.registerDao(user, cb);
};

UsersService.prototype.forgetPasswordService = (user, cb) => {

    userDao.getByUserNameDao(user.userName, (err, DBUser) => {
        if (err) {
            return cb({code: 1});
        }
        if (DBUser) {
            user.password = crypto.cryptoPWD(user.password, DBUser.salt);
            userDao.forgetPasswordDao(user, (err, result) => {
                if (err) {
                    return cb({code: 1});
                }

                if (result) {
                    if (result.affectedRows > 0) {
                        cb(null, true);
                    } else {
                        cb(null, false);
                    }
                }
            })
        } else {
            cb({code: 0});
        }
    })
};


module.exports = UsersService;