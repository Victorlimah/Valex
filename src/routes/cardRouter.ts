import { Router } from "express";

import * as card from "../middlewares/cardMiddleware.js";
import * as auth from "../middlewares/authMiddleware.js";

import * as controller from "../controllers/cardController.js";

import * as schemas from "../schemas/cardSchemas.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/card", validateSchema(schemas.cardSchema),
  auth.checkApiKey, card.validNewCard,
  controller.createCard
); 
cardRouter.post(
  "/card/activate",validateSchema(schemas.cardPasswordSchema),
  
  ); // activate a card
cardRouter.get("/cards/:id"); // get cards of a user
cardRouter.get("/card/:id"); // get balance and transactions of a card
cardRouter.put("/card/block"); // block a card
cardRouter.put("/card/unblock"); // unblock a card

export default cardRouter;
