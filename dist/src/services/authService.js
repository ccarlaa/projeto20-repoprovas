var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { verifyEmail } from "../repositories/authRepository.js";
import { encrypt, verifyPassword } from "../utils/bcrypt.js";
import { tokenGenerator } from "../utils/tokenGenerator.js";
export function newUserService(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateEmail = yield verifyEmail(email);
        if (validateEmail != undefined) {
            throw { status: 409, message: "Email in use" };
        }
        const passwordEncrypted = encrypt(password);
        const user = {
            email,
            password: passwordEncrypted
        };
        return user;
    });
}
export function signInService(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateEmail = yield verifyEmail(email);
        if (validateEmail == undefined) {
            throw { status: 404, message: "User not found" };
        }
        const passwordEncrypted = validateEmail.password;
        verifyPassword(password, passwordEncrypted);
        const userId = validateEmail.id;
        const token = tokenGenerator(userId, email);
        const session = {
            userId,
            token
        };
        return session;
    });
}
