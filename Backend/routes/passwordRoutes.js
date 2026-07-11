import express from "express";

import {
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/passwordController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================
// FORGOT PASSWORD
// POST /api/password/forgot
// ======================================

router.post("/forgot", forgotPassword);

// ======================================
// RESET PASSWORD
// POST /api/password/reset
// ======================================

router.post("/reset", resetPassword);

// ======================================
// CHANGE PASSWORD
// PUT /api/password/change
// Protected Route
// ======================================

router.put("/change", authMiddleware, changePassword);

export default router;
