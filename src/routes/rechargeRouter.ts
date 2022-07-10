import { Router } from "express";

import { rechargeSchema } from "../schemas/rechargeSchemas.js";
import { validateSchema } from "../middlewares/validateSchema.js";

import * as authMiddleware from "../middlewares/authMiddleware.js";
import * as rechargeController from "../controllers/rechargeController.js";

const rechargeRouter = Router();

rechargeRouter.post('/recharge',
  validateSchema(rechargeSchema),
  authMiddleware.checkApiKey,
  rechargeController.rechargeCard
);

export default rechargeRouter;
