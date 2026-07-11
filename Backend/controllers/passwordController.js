import crypto from "crypto";

import Admin from "../model/Admin.js";
import PasswordResetToken from "../model/PasswordResetToken.js";
import RefreshToken from "../model/RefreshToken.js";

import { hashPassword, comparePassword } from "../utils/hashPassword.js";

import { successResponse, errorResponse } from "../utils/response.js";

import { sendEmail } from "../services/emailService.js";
import { createActivityLog } from "../services/activityService.js";

// =====================================
// FORGOT PASSWORD
// =====================================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // ===========================
    // Validation
    // ===========================

    if (!email) {
      return errorResponse(res, "Email is required", 400);
    }

    // ===========================
    // Find Admin
    // ===========================

    const admin = await Admin.findOne({
      email,
      isDeleted: false,
    });

    // Do not reveal whether email exists

    if (!admin) {
      return successResponse(
        res,
        "If an account exists, a password reset link has been sent.",
      );
    }

    if (admin.status !== "ACTIVE") {
      return errorResponse(res, "Account is inactive", 403);
    }

    // ===========================
    // Remove Previous Tokens
    // ===========================

    await PasswordResetToken.deleteMany({
      adminId: admin._id,
    });

    // ===========================
    // Generate Reset Token
    // ===========================

    const resetToken = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // ===========================
    // Save Token
    // ===========================

    await PasswordResetToken.create({
      adminId: admin._id,
      token: resetToken,
      expiresAt,
      ipAddress: req.ip,
      device: req.headers["user-agent"],
    });

    // ===========================
    // Reset Link
    // ===========================

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // ===========================
    // Email HTML
    // ===========================

    const html = `
      <div style="font-family:Arial,sans-serif">

        <h2>Password Reset</h2>

        <p>Hello <b>${admin.name}</b>,</p>

        <p>You requested to reset your password.</p>

        <p>
          <a href="${resetLink}">
            Reset Password
          </a>
        </p>

        <p>
          This link expires in
          <b>15 minutes</b>.
        </p>

        <p>
          If you didn't request this,
          ignore this email.
        </p>

      </div>
    `;

    // ===========================
    // Send Email
    // ===========================

    await sendEmail({
      to: admin.email,
      subject: "Reset Password",
      html,
    });

    // ===========================
    // Activity Log
    // ===========================

    await createActivityLog({
      adminId: admin._id,
      action: "FORGOT_PASSWORD",
      description: "Password reset requested",
      req,
    });

    // ===========================
    // Response
    // ===========================

    return successResponse(res, "Password reset link sent successfully.");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// =====================================
// RESET PASSWORD
// =====================================

export const resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    // ===========================
    // Validation
    // ===========================

    if (!token || !password || !confirmPassword) {
      return errorResponse(res, "All fields are required", 400);
    }

    if (password !== confirmPassword) {
      return errorResponse(res, "Passwords do not match", 400);
    }

    if (password.length < 6) {
      return errorResponse(res, "Password must be at least 6 characters", 400);
    }

    // ===========================
    // Find Reset Token
    // ===========================

    const resetToken = await PasswordResetToken.findOne({
      token,
      isUsed: false,
    });

    if (!resetToken) {
      return errorResponse(res, "Invalid reset token", 400);
    }

    // ===========================
    // Check Expiry
    // ===========================

    if (resetToken.expiresAt < new Date()) {
      return errorResponse(res, "Reset token has expired", 400);
    }

    // ===========================
    // Find Admin
    // ===========================

    const admin = await Admin.findById(resetToken.adminId);

    if (!admin) {
      return errorResponse(res, "Admin not found", 404);
    }

    if (admin.isDeleted) {
      return errorResponse(res, "Admin account has been deleted", 403);
    }

    if (admin.status !== "ACTIVE") {
      return errorResponse(res, "Admin account is inactive", 403);
    }

    // ===========================
    // Hash New Password
    // ===========================

    admin.password = await hashPassword(password);

    await admin.save();

    // ===========================
    // Mark Token Used
    // ===========================

    resetToken.isUsed = true;

    await resetToken.save();

    // Delete All Reset Tokens
    await PasswordResetToken.deleteMany({
      adminId: admin._id,
    });

    // Logout From All Devices
    await RefreshToken.deleteMany({
      adminId: admin._id,
    });

    // ===========================
    // Activity Log
    // ===========================

    await createActivityLog({
      adminId: admin._id,
      action: "RESET_PASSWORD",
      description: "Password reset successfully",
      req,
    });

    // ===========================
    // Response
    // ===========================

    return successResponse(
      res,
      "Password has been reset successfully. Please login again.",
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// =====================================
// CHANGE PASSWORD
// =====================================

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // ===========================
    // Validation
    // ===========================

    if (!oldPassword || !newPassword || !confirmPassword) {
      return errorResponse(res, "All fields are required", 400);
    }

    if (newPassword !== confirmPassword) {
      return errorResponse(
        res,
        "New password and confirm password do not match",
        400,
      );
    }

    if (newPassword.length < 6) {
      return errorResponse(res, "Password must be at least 6 characters", 400);
    }

    // ===========================
    // Find Logged In Admin
    // ===========================

    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return errorResponse(res, "Admin not found", 404);
    }

    if (admin.isDeleted) {
      return errorResponse(res, "Admin account has been deleted", 403);
    }

    if (admin.status !== "ACTIVE") {
      return errorResponse(res, "Admin account is inactive", 403);
    }

    // ===========================
    // Verify Old Password
    // ===========================

    const isMatch = await comparePassword(oldPassword, admin.password);

    if (!isMatch) {
      return errorResponse(res, "Old password is incorrect", 400);
    }

    // ===========================
    // Prevent Same Password
    // ===========================

    const isSamePassword = await comparePassword(newPassword, admin.password);

    if (isSamePassword) {
      return errorResponse(
        res,
        "New password cannot be the same as the old password",
        400,
      );
    }

    // ===========================
    // Update Password
    // ===========================

    admin.password = await hashPassword(newPassword);

    await admin.save();

    // ===========================
    // Logout From All Devices
    // ===========================

    await RefreshToken.deleteMany({
      adminId: admin._id,
    });

    // ===========================
    // Activity Log
    // ===========================

    await createActivityLog({
      adminId: admin._id,
      action: "CHANGE_PASSWORD",
      description: "Password changed successfully",
      req,
    });

    // ===========================
    // Success Response
    // ===========================

    return successResponse(
      res,
      "Password changed successfully. Please login again.",
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
