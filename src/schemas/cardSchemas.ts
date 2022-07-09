import Joi from 'joi';

export const cardSchema = Joi.object({
  employee: Joi.string().required(),
  type: Joi.string().valid(
    'groceries',
    'restaurants',
    'transport',
    'education',
    'health')
  .required(),
});