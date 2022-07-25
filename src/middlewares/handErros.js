"use strict";
exports.__esModule = true;
function errorHandle(error, req, res, next) {
    if (error.response) {
        return res.sendStatus(error.response.status);
    }
    ;
    if (error.status) {
        return res.status(error.status).send(error.message);
    }
    ;
    console.log(error);
    res.sendStatus(500);
}
exports["default"] = errorHandle;
;
