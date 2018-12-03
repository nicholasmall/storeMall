"use strict";
//
// let mysqlConfig = require("../webConfig/DBConfig");
// let MysqlUtils = require("../utils/MysqlUtils");
// let db = new MysqlUtils(mysqlConfig.mysqlDBConfig);
//
// let sql = "SELECT * FROM BL_HD_USER";
//
// let user = {
//     userName: "test1",
//     phoneNUmber: "phone",
//     email: "email",
//     password: "pwd",
//     salt: "salt"
// };
//
// let option = [];
// db.sql(sql, option, (err, result) => {
//     console.log(err);
//     console.log(result)
// });

//


let CryptoUtils = require("../utils/CryptoUtils");

const crypto = new CryptoUtils();

console.log(crypto.cryptoPWD("123456","7127f8b55324c41d26d8286aa4c6ffd9"));


