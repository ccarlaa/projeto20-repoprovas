import express, { json } from "express";
import "express-async-errors";
import router from "./routes/index.js";
import errorHandle from "./middlewares/handErros.js";
const app = express();
app.use(json());
app.use(router);
app.use(errorHandle);
export default app;
