import { Request, Response } from "express";
import * as service from "../services/cardService.js";


export async function createCard(req: Request, res: Response) {
  const { employee, type } = res.locals;

  await service.createCard(employee, type);

  res.status(201).send("Card created");
}