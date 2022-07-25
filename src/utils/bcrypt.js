"use strict";
exports.__esModule = true;
exports.verifyPassword = exports.encrypt = void 0;
var bcrypt_1 = require("bcrypt");
var hash = 10;
function encrypt(word) {
    var wordHash = bcrypt_1["default"].hashSync(word, hash);
    return wordHash;
}
exports.encrypt = encrypt;
function verifyPassword(password, passwordEncrypted) {
    if (!bcrypt_1["default"].compareSync(password, passwordEncrypted)) {
        throw { status: 401, message: "Wrong password" };
    }
}
exports.verifyPassword = verifyPassword;
