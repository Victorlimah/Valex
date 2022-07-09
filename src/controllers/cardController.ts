import { Request, Response } from "express";
import * as service from "../services/cardService.js";


export function createCard(req: Request, res: Response) {
  const { employee, type } = req.body;
  const key: string = req.header('x-api-key');

  service.createCard(key, employee, type)

  res.status(201).send("card created");  
}