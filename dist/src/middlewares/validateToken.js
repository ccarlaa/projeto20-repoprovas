var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { verifySession } from "../repositories/sessionRepository.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function validateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorization = req.headers.authorization;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "").trim();
        let error;
        const secretKey = process.env.SECRET_KEY;
        if (!token) {
            return res.status(401).send("Token not send");
        }
        jwt.verify(token, secretKey, function (err) {
            if (err) {
                error = err;
            }
        });
        if (error) {
            return res.status(401).send("Invalid token");
        }
        const sessionValidate = yield verifySession(token);
        res.locals.userId = {
            userId: sessionValidate.userId
        };
        next();
    });
}
