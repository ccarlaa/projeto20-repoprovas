import joi from "joi";
import { newUserInterface } from "./authServices";

const newUserSchema = joi.object<newUserInterface>({
  email: joi.string().email().required(),
  password: joi.string().pattern(/^[0-9a-zA-Z$*&_/@#]{4,}$/).required(),
  passwordConfirmation: joi.string().valid(joi.ref('password')).label('passwords don\'t match').required()
});

export default newUserSchema;