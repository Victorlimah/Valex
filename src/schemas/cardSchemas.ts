import Joi from 'joi';

export const cardSchema = Joi.object({
  employee: Joi.string().required(),
  type: Joi.string().valid(
    'groceries',
    'restaurant',
    'transport',
    'education',
    'health')
  .required(),
});

export const cardPasswordSchema = Joi.object({
  cardId: Joi.number().required(),
  securityCode: Joi.string().length(3).required(),
  password: Joi.string().regex(/^[0-9]{4}$/).required(),
});

export const blockCardSchema = Joi.object({
  cardId: Joi.number().required(),
  password: Joi.string().regex(/^[0-9]{4}$/).required(),
});