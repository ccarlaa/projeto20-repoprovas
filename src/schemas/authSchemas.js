"use strict";
exports.__esModule = true;
var joi_1 = require("joi");
var newUserSchema = joi_1["default"].object({
    email: joi_1["default"].string().email().required(),
    password: joi_1["default"].string().pattern(/^[0-9a-zA-Z$*&_/@#]{4,}$/).required()
});
var loginSchema = joi_1["default"].object({
    email: joi_1["default"].string().email().required(),
    password: joi_1["default"].string().required()
});
var userSchema = {
    newUserSchema: newUserSchema,
    loginSchema: loginSchema
};
exports["default"] = userSchema;
