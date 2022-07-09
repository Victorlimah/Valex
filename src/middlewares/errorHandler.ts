import { Request, Response, NextFunction } from "express";

export function errorHandler(err, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  res.status(500).send("Something went wrong");
}