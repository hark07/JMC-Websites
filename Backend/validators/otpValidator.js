import Joi from "joi";

// ======================================
// SEND OTP
// ======================================

export const sendOTPValidator = Joi.object({
  email: Joi.string().email().required(),

  purpose: Joi.string()
    .valid(
      "REGISTER",
      "LOGIN",
      "FORGOT_PASSWORD",
      "EMAIL_VERIFICATION",
      "PHONE_VERIFICATION",
    )
    .required(),
});

// ======================================
// VERIFY OTP
// ======================================

export const verifyOTPValidator = Joi.object({
  email: Joi.string().email().required(),

  otp: Joi.string().length(6).required(),

  purpose: Joi.string()
    .valid(
      "REGISTER",
      "LOGIN",
      "FORGOT_PASSWORD",
      "EMAIL_VERIFICATION",
      "PHONE_VERIFICATION",
    )
    .required(),
});

// ======================================
// RESEND OTP
// ======================================

export const resendOTPValidator = Joi.object({
  email: Joi.string().email().required(),

  purpose: Joi.string()
    .valid(
      "REGISTER",
      "LOGIN",
      "FORGOT_PASSWORD",
      "EMAIL_VERIFICATION",
      "PHONE_VERIFICATION",
    )
    .required(),
});
