import { newUser, verifyEmail } from "../repositories/authRepository.js";
import { encrypt } from "../utils/bcrypt.js";
import { tokenGenerator } from "../utils/tokenGenerator.js";

export async function newUserService(email: string, password: string) {
    const validateEmail = await verifyEmail(email);

    if(validateEmail != undefined) {
        throw { status: 409, message: "Email in use" };
    }

    const passwordEncrypted = encrypt(password);
    const user : newUser = {
        email,
        password: passwordEncrypted
    }
    
    return user;
}