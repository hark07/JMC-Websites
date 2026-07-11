import Admin from "../model/Admin.js";
import OTP from "../model/OTP.js";

import { createOTP, verifyOTP } from "../services/otpService.js";

import { successResponse, errorResponse } from "../utils/response.js";

import { createActivityLog } from "../services/activityService.js";

// ======================================
// SEND OTP
// ======================================

export const sendOTP = async (req, res) => {
  try {
    const { email, phone, purpose } = req.body;

    // ===========================
    // Validation
    // ===========================

    if (!email && !phone) {
      return errorResponse(res, "Email or Phone is required", 400);
    }

    if (!purpose) {
      return errorResponse(res, "Purpose is required", 400);
    }

    // ===========================
    // Find Admin
    // ===========================

    const admin = await Admin.findOne({
      $or: [{ email }, { phone }],
    });

    if (!admin) {
      return errorResponse(res, "Admin not found", 404);
    }

    // ===========================
    // Deleted Check
    // ===========================

    if (admin.isDeleted) {
      return errorResponse(res, "Account deleted", 403);
    }

    // ===========================
    // Status Check
    // ===========================

    if (admin.status !== "ACTIVE") {
      return errorResponse(res, "Account is inactive", 403);
    }

    // ===========================
    // Delete Previous OTP
    // ===========================

    await OTP.deleteMany({
      adminId: admin._id,
      purpose,
      verified: false,
    });

    // ===========================
    // Generate New OTP
    // ===========================

    await createOTP({
      adminId: admin._id,
      email: admin.email,
      phone: admin.phone,
      purpose,
    });

    // ===========================
    // Activity Log
    // ===========================

    await createActivityLog({
      adminId: admin._id,
      action: "SEND_OTP",
      description: `OTP sent for ${purpose}`,
      req,
    });

    // ===========================
    // Response
    // ===========================

    return successResponse(res, "OTP sent successfully.");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// ======================================
// VERIFY OTP
// ======================================

export const verifyAdminOTP = async (req, res) => {
  try {
    const { email, otp, purpose } = req.body;

    // ===========================
    // Validation
    // ===========================

    if (!email) {
      return errorResponse(res, "Email is required", 400);
    }

    if (!otp) {
      return errorResponse(res, "OTP is required", 400);
    }

    if (!purpose) {
      return errorResponse(res, "Purpose is required", 400);
    }

    // ===========================
    // Find Admin
    // ===========================

    const admin = await Admin.findOne({
      email,
      isDeleted: false,
    });

    if (!admin) {
      return errorResponse(res, "Admin not found", 404);
    }

    if (admin.status !== "ACTIVE") {
      return errorResponse(res, "Account is inactive", 403);
    }

    // ===========================
    // Verify OTP
    // ===========================

    await verifyOTP(email, otp, purpose);

    // ===========================
    // Activity Log
    // ===========================

    await createActivityLog({
      adminId: admin._id,
      action: "VERIFY_OTP",
      description: `OTP verified for ${purpose}`,
      req,
    });

    // ===========================
    // Response
    // ===========================

    return successResponse(res, "OTP verified successfully.");
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

// ======================================
// RESEND OTP
// ======================================

export const resendOTP = async (req, res) => {
  try {
    const { email, phone, purpose } = req.body;

    // ===========================
    // Validation
    // ===========================

    if (!email && !phone) {
      return errorResponse(res, "Email or Phone is required", 400);
    }

    if (!purpose) {
      return errorResponse(res, "Purpose is required", 400);
    }

    // ===========================
    // Find Admin
    // ===========================

    const admin = await Admin.findOne({
      $or: [{ email }, { phone }],
      isDeleted: false,
    });

    if (!admin) {
      return errorResponse(res, "Admin not found", 404);
    }

    // ===========================
    // Status Check
    // ===========================

    if (admin.status !== "ACTIVE") {
      return errorResponse(res, "Account is inactive", 403);
    }

    // ===========================
    // Delete Previous Unused OTPs
    // ===========================

    await OTP.deleteMany({
      adminId: admin._id,
      purpose,
      verified: false,
    });

    // ===========================
    // Create New OTP
    // ===========================

    await createOTP({
      adminId: admin._id,
      email: admin.email,
      phone: admin.phone,
      purpose,
    });

    // ===========================
    // Activity Log
    // ===========================

    await createActivityLog({
      adminId: admin._id,
      action: "RESEND_OTP",
      description: `OTP resent for ${purpose}`,
      req,
    });

    // ===========================
    // Response
    // ===========================

    return successResponse(res, "OTP resent successfully.");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
