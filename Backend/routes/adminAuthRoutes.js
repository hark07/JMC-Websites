import express from "express";

import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/adminAuthController.js";

import { loginLimiter } from "../middleware/rateLimiter.js";

import validationMiddleware from "../middleware/validationMiddleware.js";

import {
  registerValidator,
  loginValidator,
} from "../validators/authValidator.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER

router.post(
  "/register",
  validationMiddleware(registerValidator),
  registerAdmin,
);

// LOGIN

router.post(
  "/login",
  loginLimiter,
  validationMiddleware(loginValidator),
  loginAdmin,
);

// LOGOUT

router.post("/logout", logoutAdmin);

// REFRESH

router.post("/refresh", refreshAccessToken);

// CHANGE PASSWORD

router.put("/change-password", authMiddleware, changePassword);

// FORGOT PASSWORD

router.post("/forgot-password", forgotPassword);

// RESET PASSWORD

router.post("/reset-password/:token", resetPassword);

export default router;
