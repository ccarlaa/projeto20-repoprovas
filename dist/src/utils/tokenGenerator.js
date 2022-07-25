import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function tokenGenerator(userId, email) {
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: userId, email }, secretKey);
    return token;
}
