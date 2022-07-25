"use strict";
exports.__esModule = true;
var express_1 = require("express");
var authRoute_js_1 = require("./authRoute.js");
var testsRoute_js_1 = require("./testsRoute.js");
var router = (0, express_1.Router)();
router.use(authRoute_js_1["default"]);
router.use(testsRoute_js_1["default"]);
exports["default"] = router;
