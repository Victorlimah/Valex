import Joi from 'joi';

export const cardSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid(
    'groceries',
    'restaurants',
    'transport',
    'education',
    'health')
  .required(),
});