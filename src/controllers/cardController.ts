import { Request, Response } from "express";
import * as service from "../services/cardService.js";


export async function createCard(req: Request, res: Response) {
  const { employee, type } = res.locals;

  const card = await service.createCard(employee, type);
  res.status(201).send(card);
}

export async function setCardPass(req: Request, res: Response) {
  const { cardId, securityCode } = req.body;

  await service.createPass(cardId, securityCode);
  res.status(200).send("Card password set");
}