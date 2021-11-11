import Joi from 'joi';

export const spaceShipSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  first_name: Joi.string().min(3).max(20).required(),
  last_name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  phone_number: Joi.number().integer().max(11),
}).options({ abortEarly: true, allowUnknown: false });
