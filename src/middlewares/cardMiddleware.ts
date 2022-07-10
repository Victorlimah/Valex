import { Request, Response, NextFunction } from "express";

import { TransactionTypes } from "../repositories/cardRepository.js";

import * as cardService from "../services/cardService.js";
import * as employeeService from "../services/employeeService.js";

export async function validNewCard(req: Request, res: Response, next: NextFunction) {
  const { employee, type }: { employee: string, type: TransactionTypes } = req.body;

  const employeeExist = await employeeService.checkEmployeeExist(employee);
  const typeCardExist = await employeeService.checkTypeCardExist(employeeExist.id, type);

  res.locals.employee = employeeExist;
  res.locals.type = type;
  next();
}

export async function validCardActivation(req: Request, res: Response, next: NextFunction){
  const { cardId, securityCode } : { cardId: number, securityCode: string } = req.body;
  if(await cardService.cardIsValid(cardId, securityCode)) next();
}

export async function validBlockCard(req: Request, res: Response, next: NextFunction){
  const { cardId, password } : { cardId: number, password: string } = req.body;
  if(await cardService.cardIsBlocked(cardId, password))
    throw { type: "CardIsBlocked" };
  
  next();
}
