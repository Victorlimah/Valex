import { Request, Response, NextFunction } from "express";

export function errorHandler(err, _req: Request, res: Response, _next: NextFunction) {

  const errors = {
    "InvalidApiKey": 401,
    "NoKeyProvided": 400,
    "EmployeeNotFound": 401,
    "EmployeeAlreadyHasCard": 409,
  }                               
  
  const status = errors[err.message] || 500;
  res.status(status).json({ message: err.message });
}