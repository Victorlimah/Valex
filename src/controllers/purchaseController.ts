import { Request, Response } from "express";

import * as cardService from "../services/cardService.js";

export async function newPosPurchase(req: Request, res: Response) {
  const { cardId, password, businessId, amount } = req.body;

  await cardService.purchasePOS(cardId, password, businessId, amount);
  res.status(200).send({ message: "Purchase successful" });
}

export async function newOnlinePurchase(req: Request, res: Response) {
  const { number, holder, expiry, cvv, businessId, amount } = req.body;

  await cardService.purchaseOnline(number, holder, expiry, cvv, businessId, amount);
  res.status(200).send({ message: "Purchase successful" });
}