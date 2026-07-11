import express from "express";

import {
  resendOTP,
  sendOTP,
  verifyAdminOTP,
} from "../controllers/otpController.js";

const router = express.Router();

// =====================================
// SEND OTP
// =====================================

router.post("/send", sendOTP);

// =====================================
// VERIFY OTP
// =====================================

router.post("/verify", verifyAdminOTP);

// =====================================
// RESEND OTP
// =====================================

router.post("/resend", resendOTP);

export default router;
