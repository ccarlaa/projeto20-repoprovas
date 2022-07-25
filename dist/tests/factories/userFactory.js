var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import prisma from "../../database.js";
function createLogin(email = "teste@driven.com", passwordLength = 5) {
    const password = faker.internet.password(passwordLength);
    return {
        email,
        password
    };
}
;
function createUser(login) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.users.create({
            data: {
                email: login.email,
                password: bcrypt.hashSync(login.password, 5)
            }
        });
        return Object.assign(Object.assign({}, user), { plainPassword: login.password });
    });
}
const userFactory = {
    createLogin,
    createUser
};
export default userFactory;
