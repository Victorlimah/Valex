import { Request, Response, NextFunction } from "express";

import * as service from "../services/cardService.js";

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
  const key: string = req.header("x-api-key");

  const company = service.verifyApiKey(key);
  if(!company) throw { message: "InvalidApiKey" };

  res.locals.company = company;

  next();
}