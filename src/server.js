"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var app_js_1 = require("./app.js");
var port = process.env.PORT;
app_js_1["default"].listen(port, function () {
    console.log("|-----------------------------------|");
    console.log("| Running at http://localhost:".concat(port, "  |"));
    console.log("|-----------------------------------|");
});
