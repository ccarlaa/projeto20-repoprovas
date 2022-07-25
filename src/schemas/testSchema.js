"use strict";
exports.__esModule = true;
var joi_1 = require("joi");
var newTestSchema = joi_1["default"].object({
    name: joi_1["default"].string().required(),
    pdfUrl: joi_1["default"].string().uri().required(),
    categoryId: joi_1["default"].number().required(),
    teacherDisciplineId: joi_1["default"].number().required()
});
var testSchema = {
    newTestSchema: newTestSchema
};
exports["default"] = testSchema;
