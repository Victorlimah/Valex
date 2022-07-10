import { Router } from "express";

import * as card from "../middlewares/cardMiddleware.js";
import * as auth from "../middlewares/authMiddleware.js";

import * as controller from "../controllers/cardController.js";

import * as schemas from "../schemas/cardSchemas.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const cardRouter = Router();

cardRouter.post("/card", 
  validateSchema(schemas.cardSchema),
  auth.checkApiKey, card.validNewCard,
  controller.createCard
); 

cardRouter.post("/card/activate",
  validateSchema(schemas.cardPasswordSchema),
  card.validCardActivation,
  controller.setCardPass
); 

cardRouter.get("/cards/:id"); // get cards of a user || [REMOVED]

cardRouter.get("/card/:id/extract",
  controller.getExtract

); // get balance and transactions of a card

cardRouter.put("/card/block",
  validateSchema(schemas.blockCardSchema),
  card.validBlockCard,
  controller.blockCard
);

cardRouter.put("/card/unlock",
  validateSchema(schemas.blockCardSchema),
  card.validUnlockCard,
  controller.unlockCard
);

export default cardRouter;
