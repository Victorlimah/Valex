import { Router } from "express";

import * as controller from "../controllers/purchaseController.js";

import * as schemas from "../schemas/purchaseSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const purchasesRouter = Router();

purchasesRouter.post("/purchase/pos",
  validateSchema(schemas.posPurchaseSchema),
  controller.newPosPurchase
);

purchasesRouter.post("/purchase/online",
  validateSchema(schemas.onlinePurchaseSchema),
  controller.newOnlinePurchase
);

export default purchasesRouter;
