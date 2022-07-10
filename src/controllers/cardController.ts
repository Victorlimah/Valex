import { Request, Response } from "express";
import * as service from "../services/cardService.js";


export async function createCard(req: Request, res: Response) {
  const { employee, type } = res.locals;

  const card = await service.createCard(employee, type);
  res.status(201).send(card);
}

export async function setCardPass(req: Request, res: Response) {
  const { cardId, password } = req.body;

  await service.createPass(cardId, password);
  res.status(200).send("Card password set");
}

export async function blockCard(req: Request, res: Response) {
  const { cardId } = req.body;

  await service.blockCard(cardId);
  res.status(200).send("Card blocked");
}