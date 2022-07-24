import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { testMiddleware } from "../middlewares/testMiddleware.js";
import testSchema from "../schemas/testSchema.js";
import { newTestController, getTestsByDisciplineController, getTestsByTeacherController } from "../controllers/testController.js";

const { newTestSchema } = testSchema;

const testRoute = Router();

testRoute.post('/new-test', validateToken, testMiddleware(newTestSchema), newTestController);
testRoute.post('/tests/disciplines', validateToken, getTestsByDisciplineController);
testRoute.post('/tests/teachers', validateToken, getTestsByTeacherController);

export default testRoute;
