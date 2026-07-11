import { randomBytes, createHash } from "crypto";

import Admin from "../model/Admin.js";
import RefreshToken from "../model/RefreshToken.js";

import { hashPassword, comparePassword } from "../utils/hashPassword.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../services/jwtService.js";

import { createActivityLog } from "../services/activityService.js";

import { successResponse, errorResponse } from "../utils/response.js";

// ========================================
// REGISTER ADMIN
// ========================================

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // ===============================
    // Validation
    // ===============================

    if (!name || !email || !phone || !password) {
      return errorResponse(res, "All fields are required", 400);
    }

    // Password Length

    if (password.length < 6) {
      return errorResponse(res, "Password must be at least 6 characters", 400);
    }

    // ===============================
    // Email / Phone Check
    // ===============================

    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingAdmin) {
      return errorResponse(res, "Email or Phone already exists", 400);
    }

    // ===============================
    // Hash Password
    // ===============================

    const hashedPassword = await hashPassword(password);

    // ===============================
    // Create Admin
    // ===============================

    const admin = await Admin.create({
      name,
      email,
      phone,
      password: hashedPassword,

      role: "SUPER_ADMIN",

      status: "ACTIVE",

      permissions: [],

      isDeleted: false,
    });

    // ===============================
    // Activity Log
    // ===============================

    await createActivityLog({
      adminId: admin._id,

      action: "REGISTER",

      description: `Admin registered (${admin.email})`,

      req,
    });

    // ===============================
    // Response
    // ===============================

    return successResponse(
      res,
      "Admin registered successfully",
      {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        status: admin.status,
      },
      201,
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// ========================================
// LOGIN ADMIN
// ========================================

export const loginAdmin = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    // Validation
    if (!emailOrPhone || !password) {
      return errorResponse(res, "Email/Phone and password are required", 400);
    }

    // Find Admin
    const admin = await Admin.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!admin) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    // Soft Delete Check
    if (admin.isDeleted) {
      return errorResponse(res, "This account has been deleted", 403);
    }

    // Status Check
    if (admin.status !== "ACTIVE") {
      return errorResponse(res, "Account is inactive", 403);
    }

    // Compare Password
    const isMatch = await comparePassword(password, admin.password);

    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    // Generate Tokens
    const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin);

    // Save Refresh Token
    await RefreshToken.create({
      adminId: admin._id,
      token: refreshToken,
      device: req.headers["user-agent"],
      ipAddress: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // Update Last Login
    admin.lastLogin = new Date();
    await admin.save();

    // Activity Log
    await createActivityLog({
      adminId: admin._id,
      action: "LOGIN",
      description: `Admin (${admin.email}) logged in`,
      req,
    });

    return successResponse(res, "Login successful", {
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        permissions: admin.permissions || [],
        status: admin.status,
        profileImage: admin.profileImage,
      },

      accessToken,
      refreshToken,
    });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// ========================================
// LOGOUT ADMIN
// ========================================

export const logoutAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return errorResponse(res, "Refresh token is required", 400);
    }

    // Delete Refresh Token
    await RefreshToken.findOneAndDelete({
      token: refreshToken,
    });

    // Activity Log
    if (req.admin) {
      await createActivityLog({
        adminId: req.admin._id,
        action: "LOGOUT",
        description: "Admin logged out",
        req,
      });
    }

    return successResponse(res, "Logout successful");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// ========================================
// REFRESH ACCESS TOKEN
// ========================================

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // ===============================
    // Validation
    // ===============================

    if (!refreshToken) {
      return errorResponse(res, "Refresh token is required", 400);
    }

    // ===============================
    // Verify Refresh Token
    // ===============================

    let decoded;

    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      return errorResponse(res, "Invalid or expired refresh token", 401);
    }

    // ===============================
    // Find Refresh Token
    // ===============================

    const storedToken = await RefreshToken.findOne({
      token: refreshToken,
    });

    if (!storedToken) {
      return errorResponse(res, "Refresh token not found", 401);
    }

    // ===============================
    // Expiry Check
    // ===============================

    if (storedToken.expiresAt < new Date()) {
      await RefreshToken.deleteOne({
        token: refreshToken,
      });

      return errorResponse(res, "Refresh token expired", 401);
    }

    // ===============================
    // Find Admin
    // ===============================

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return errorResponse(res, "Admin not found", 404);
    }

    if (admin.isDeleted) {
      return errorResponse(res, "Admin account deleted", 403);
    }

    if (admin.status !== "ACTIVE") {
      return errorResponse(res, "Admin account inactive", 403);
    }

    // ===============================
    // Token Rotation
    // ===============================

    await RefreshToken.deleteOne({
      token: refreshToken,
    });

    const newAccessToken = generateAccessToken(admin);

    const newRefreshToken = generateRefreshToken(admin);

    await RefreshToken.create({
      adminId: admin._id,
      token: newRefreshToken,
      device: req.headers["user-agent"],
      ipAddress: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // ===============================
    // Activity Log
    // ===============================

    await createActivityLog({
      adminId: admin._id,
      action: "TOKEN_REFRESH",
      description: "Access token refreshed",
      req,
    });

    // ===============================
    // Response
    // ===============================

    return successResponse(res, "Token refreshed successfully", {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// ========================================
// CHANGE PASSWORD
// ========================================

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return errorResponse(res, "All fields are required", 400);
    }

    if (newPassword !== confirmPassword) {
      return errorResponse(res, "Passwords do not match", 400);
    }

    if (newPassword.length < 6) {
      return errorResponse(res, "Password must be at least 6 characters", 400);
    }

    // Logged in admin

    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return errorResponse(res, "Admin not found", 404);
    }

    // Check old password

    const isMatch = await comparePassword(oldPassword, admin.password);

    if (!isMatch) {
      return errorResponse(res, "Old password is incorrect", 400);
    }

    // Hash new password

    admin.password = await hashPassword(newPassword);

    await admin.save();

    // Activity Log

    await createActivityLog({
      adminId: admin._id,

      action: "PASSWORD_CHANGE",

      description: "Admin changed password",

      req,
    });

    return successResponse(res, "Password changed successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// ========================================
// FORGOT PASSWORD
// ========================================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return errorResponse(res, "Admin not found", 404);
    }

    // Generate Token

    const resetToken = randomBytes(32).toString("hex");

    // Hash Token

    admin.resetPasswordToken = createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // 15 minutes expiry

    admin.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await admin.save();

    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

    return successResponse(res, "Reset link generated", {
      resetURL,
    });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
// ========================================
// RESET PASSWORD
// ========================================

export const resetPassword = async (req, res) => {
  try {
    const hashedToken = createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!admin) {
      return errorResponse(res, "Invalid or expired token", 400);
    }

    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return errorResponse(res, "Passwords do not match", 400);
    }

    if (password.length < 6) {
      return errorResponse(res, "Password must be at least 6 characters", 400);
    }

    admin.password = await hashPassword(password);

    admin.resetPasswordToken = null;

    admin.resetPasswordExpire = null;

    await admin.save();

    await createActivityLog({
      adminId: admin._id,

      action: "PASSWORD_RESET",

      description: "Admin reset password",

      req,
    });

    return successResponse(res, "Password reset successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
