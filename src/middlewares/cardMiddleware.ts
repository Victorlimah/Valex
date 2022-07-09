import { Request, Response, NextFunction } from "express";

import { TransactionTypes } from "../repositories/cardRepository.js";

import * as employeeService from "../services/employeeService.js";

export async function validNewCard(req: Request, res: Response, next: NextFunction) {
  const { employee, type }: { employee: string, type: TransactionTypes } = req.body;

  const employeeExist = await employeeService.checkEmployeeExist(employee);
  const typeCardExist = await employeeService.checkTypeCardExist(employeeExist.id, type);

  res.locals.employee = employeeExist;
  res.locals.type = type;
  next();
}