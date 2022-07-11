import Joi from 'joi';

export const posPurchaseSchema = Joi.object({
  cardId: Joi.number().required(),
  password: Joi.string().required(),
  businessId: Joi.number().required(),
  amount: Joi.number().positive().required(),
});

export const onlinePurchaseSchema = Joi.object({
  number: Joi.string().required(),
  holder: Joi.string().required(),
  expiry: Joi.string().required(),
  cvv: Joi.string().required(),
  businessId: Joi.number().required(),
  amount: Joi.number().positive().required(),
});
