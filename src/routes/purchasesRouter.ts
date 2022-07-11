import { Router } from "express";

import * as controller from "../controllers/purchaseController.js";

import { purchaseSchema } from "../schemas/purchaseSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const purchasesRouter = Router();

purchasesRouter.post("/purchase",
  validateSchema(purchaseSchema),
  controller.newPurchase
);

export default purchasesRouter;