import Joi from 'joi';

export const purchaseSchema = Joi.object({
  cardId: Joi.number().required(),
  password: Joi.string().required(),
  businessId: Joi.number().required(),
  amount: Joi.number().positive().required(),
});