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
  console.log("Cheguei no controller");

  await service.blockCard(cardId);
  res.status(200).send("Card blocked");
}

export async function unlockCard(req: Request, res: Response){
  const { cardId } = req.body;

  await service.unlockCard(cardId);
  res.status(200).send("Card unlocked");
}

export async function getExtract(req: Request, res: Response){
  const { id } = req.params;
  const cardId = Number(id);

  const extract = await service.getExtract(cardId);
  res.status(200).send(extract);
}