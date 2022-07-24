import joi from "joi";
import { newUser } from "../repositories/authRepository.js";

const newUserSchema = joi.object<newUser>({
  email: joi.string().email().required(),
  password: joi.string().pattern(/^[0-9a-zA-Z$*&_/@#]{4,}$/).required()
});

const loginSchema = joi.object<newUser>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const userSchema = {
  newUserSchema,
  loginSchema
};

export default userSchema;