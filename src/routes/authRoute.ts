import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { newUserController } from "../controllers/authController.js";
import newUserSchema from "../utils/authSchemas.js";

const authRoute = Router();

authRoute.post('/sign-up', authMiddleware(newUserSchema), newUserController);
authRoute.post('/sign-in', )

export default authRoute;
