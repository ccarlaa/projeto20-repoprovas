import joi from "joi";
import { newUserInterface } from "../authServices";
import { newUser } from "../../repositories/authRepository";

const newUserSchema = joi.object<newUserInterface>({
  email: joi.string().email().required(),
  password: joi.string().pattern(/^[0-9a-zA-Z$*&_/@#]{4,}$/).required(),
  passwordConfirmation: joi.string().valid(joi.ref('password')).label('passwords don\'t match').required()
});

const loginSchema = joi.object<newUser>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const userSchema = {
  newUserSchema,
  loginSchema
}

export default userSchema;