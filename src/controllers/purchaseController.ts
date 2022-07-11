import { Request, Response } from "express";

import * as cardService from "../services/cardService.js";

export async function newPurchase(req: Request, res: Response) {
  const { cardId, password, businessId, amount } = req.body;

  await cardService.newPurchase(cardId, password, businessId, amount);
  res.status(200).send({ message: "Purchase successful" });
}