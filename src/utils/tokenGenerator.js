"use strict";
exports.__esModule = true;
exports.tokenGenerator = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
function tokenGenerator(userId, email) {
    var secretKey = process.env.SECRET_KEY;
    var token = jsonwebtoken_1["default"].sign({ id: userId, email: email }, secretKey);
    return token;
}
exports.tokenGenerator = tokenGenerator;
