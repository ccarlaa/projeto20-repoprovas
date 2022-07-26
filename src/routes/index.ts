import { Router } from "express";
import authRoute from "./authRoute.js";
import testRoute from "./testsRoute.js";

const router = Router();

router.use(authRoute);
router.use(testRoute);

export default router;