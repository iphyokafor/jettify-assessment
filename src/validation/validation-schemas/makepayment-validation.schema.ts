import Joi from 'joi';

export const PaymentSchema = Joi.object({
  amount: Joi.number().required(),
  service: Joi.string().required(),
}).options({ abortEarly: true, allowUnknown: false });
