"use strict";

const mysql = require("mysql");

function MysqlUtils(mysqlConf) {
    this.connection = mysql.createConnection(mysqlConf);
    this.connection.connect();
}

MysqlUtils.prototype.sql = function (sql, option, callback) {
    console.log("sql :", sql);
    console.log("params :", option);
    this.connection.query(sql, option, function (err, result) {
        if (err) {
            console.log("mysql Utils  err /utils/MysqlUtils.js:15 line :", err);
            return callback(err);
        }
        callback(null, result);
    })
};
module.exports = MysqlUtils;