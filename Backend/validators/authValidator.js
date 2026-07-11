import Joi from "joi";

export const registerValidator = Joi.object({
  name: Joi.string().min(3).max(50).required(),

  email: Joi.string().email().required(),

  phone: Joi.string().min(10).max(15).required(),

  password: Joi.string().min(6).max(30).required(),

  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

export const loginValidator = Joi.object({
  emailOrPhone: Joi.string().required(),

  password: Joi.string().required(),
});
