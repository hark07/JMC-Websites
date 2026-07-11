import OTP from "../model/OTP.js";
import generateOTP from "../utils/generateOTP.js";

import { sendOTPEmail } from "./emailService.js";
import { sendSMSOTP } from "./smsService.js";

// ======================================
// CREATE OTP
// ======================================

export const createOTP = async ({ adminId, email, phone, purpose }) => {
  const otp = generateOTP();

  await OTP.create({
    adminId,
    email,
    phone,
    otp,
    purpose,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  if (email) {
    await sendOTPEmail(email, otp);
  }

  if (phone) {
    await sendSMSOTP(phone, otp);
  }

  return otp;
};

// ======================================
// VERIFY OTP
// ======================================

export const verifyOTP = async (email, otp, purpose) => {
  const otpData = await OTP.findOne({
    email,
    otp,
    purpose,
    verified: false,
  });

  if (!otpData) {
    throw new Error("Invalid OTP");
  }

  if (otpData.expiresAt < new Date()) {
    throw new Error("OTP expired");
  }

  if (otpData.attempts >= 5) {
    throw new Error("Too many attempts");
  }

  otpData.verified = true;

  await otpData.save();

  return true;
};
