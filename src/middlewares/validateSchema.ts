import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export function validateSchema(schema: Joi.ObjectSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  };
}
