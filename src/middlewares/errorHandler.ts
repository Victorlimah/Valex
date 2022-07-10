import { Request, Response, NextFunction } from "express";

export function errorHandler(err, _req: Request, res: Response, _next: NextFunction) {
  const details = err.details || err.type;

  const errors = {
    "InvalidApiKey": 401,
    "NoKeyProvided": 400,
    "EmployeeNotFound": 401,
    "EmployeeAlreadyHasCard": 409,
    "ValidationError": 422,
    "CardNotFound": 401,
    "CardExpired": 401,
    "CardHasPassword": 401,
    "InvalidCVV": 401,
    "InvalidPassword": 401,
    "CardIsBlocked": 401,
    "CardIsNotBlocked": 401,
  }                               
  
  const status = errors[err.type] || 500;
  res.status(status).json({ errors: details });
}