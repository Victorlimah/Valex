import express, { json } from "express";
import "express-async-errors";

import cors from "cors";
import chalk from "chalk";

import router from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(router);
app.use(errorHandler);

const port = +process.env.PORT || 4000;

app.listen(port, () => {
  console.log(chalk.green(`Server started on port ${port}`));
});
