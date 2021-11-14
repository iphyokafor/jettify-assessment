import Joi from 'joi';

export const fundWalletSchema = Joi.object({
  amount: Joi.number()
    .min(1000)
    .message('Amount must be greater or equal to 1000')
    .required(),
}).options({ abortEarly: true, allowUnknown: false });
