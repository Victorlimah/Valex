import { Request, Response } from "express";

import * as cardService from "../services/cardService.js";

export async function rechargeCard(req: Request, res: Response){
  const { cardId, amount } = req.body;

  await cardService.rechargeCard(cardId, amount);
  res.status(200).send({ message: "Rechage successful" });
}