import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { newUserController, signInController } from "../controllers/authController.js";
import userSchema from "../schemas/authSchemas.js";

const { newUserSchema, loginSchema } = userSchema;

const authRoute = Router();

authRoute.post('/sign-up', authMiddleware(newUserSchema), newUserController);
authRoute.post('/sign-in', authMiddleware(loginSchema),signInController);

export default authRoute;
