var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { newUserService, signInService } from '../services/authService.js';
import { creatSession } from '../repositories/sessionRepository.js';
import { insert } from '../repositories/authRepository.js';
export function newUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield newUserService(email, password);
        try {
            yield insert(user);
            return res.status(201).send("Successfully registered");
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    });
}
export function signInController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const session = yield signInService(email, password);
        const { token } = session;
        try {
            yield creatSession(session);
            return res.status(200).send(token);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    });
}
