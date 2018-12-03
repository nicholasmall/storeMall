"use strict";

let Users = {
    userName: "",
    phone: "",
    email: "",
    password: "",
    tradingPWD: "",
    state: "",
    auth: "",
    id: 0,
    salt: ""
};

let users = new Proxy(Users, {
    get(target, key) {
        return target[key];
    }, set(target, key, value) {
        if (key !== "salt") {
            target[key] = value;
        }
    }
});

module.export = users;