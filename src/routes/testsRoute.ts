import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { testMiddleware } from "../middlewares/testMiddleware.js";
import testSchema from "../schemas/testSchema.js";
import { newTestController, getTestsByDisciplineController, getTestsByTeacherController } from "../controllers/testController.js";

const { newTestSchema } = testSchema;

const testRoute = Router();

testRoute.post('/new-test', validateToken, testMiddleware(newTestSchema), newTestController);
testRoute.get('/tests/disciplines', validateToken, getTestsByDisciplineController);
testRoute.get('/tests/teachers', validateToken, getTestsByTeacherController);

export default testRoute;
