"use strict";
exports.__esModule = true;
exports.testMiddleware = void 0;
function testMiddleware(schema) {
    return function (req, res, next) {
        var validation = schema.validate(req.body);
        if (validation.error) {
            return res.status(422).send({ error: validation.error.message });
        }
        next();
    };
}
exports.testMiddleware = testMiddleware;
