import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { testMiddleware } from "../middlewares/testMiddleware.js";
import testSchema from "../schemas/testSchema.js";
import { newTestController } from "../controllers/testController.js";

const { newTestSchema } = testSchema;

const testRoute = Router();

testRoute.post('/new-test', validateToken, testMiddleware(newTestSchema), newTestController);

export default testRoute;
