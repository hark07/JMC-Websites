import Admin from "../model/Admin.js";
import { DEFAULT_PERMISSIONS } from "../routes/defaultPermissions.js";
import { hashPassword } from "../utils/hashPassword.js";
import { successResponse, errorResponse } from "../utils/response.js";

// =================================
// CREATE ADMIN
// =================================

export const createAdmin = async (req, res) => {
  try {
    const { name, email, phone, password, role, permissions } = req.body;

    // Check Existing Admin
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingAdmin) {
      return errorResponse(res, "Email or Phone already exists", 400);
    }

    // Hash Password
    const hashedPassword = await hashPassword(password);

    // Default Role
    const selectedRole = role || "ADMIN";

    // Create Admin
    const admin = await Admin.create({
      name,
      email,
      phone,
      password: hashedPassword,

      role: selectedRole,

      permissions:
        permissions && permissions.length > 0
          ? permissions
          : DEFAULT_PERMISSIONS[selectedRole],

      status: "ACTIVE",
    });

    return successResponse(res, "Admin created successfully", admin, 201);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// =================================
// GET ALL ADMINS
// =================================

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({
      isDeleted: false,
    })
      .select("-password")
      .sort({ createdAt: -1 });

    return successResponse(res, "Admins fetched successfully", admins);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// =================================
// GET SINGLE ADMIN
// =================================

export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      _id: req.params.id,
      isDeleted: false,
    }).select("-password");

    if (!admin) {
      return errorResponse(res, "Admin not found", 404);
    }

    return successResponse(res, "Admin fetched successfully", admin);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// =================================
// UPDATE ADMIN
// =================================

export const updateAdmin = async (req, res) => {
  try {
    const { name, email, phone, role, permissions, status } = req.body;

    const admin = await Admin.findById(req.params.id);

    if (!admin || admin.isDeleted) {
      return errorResponse(res, "Admin not found", 404);
    }

    // Check duplicate email
    if (email && email !== admin.email) {
      const emailExists = await Admin.findOne({
        email,
        _id: { $ne: admin._id },
      });

      if (emailExists) {
        return errorResponse(res, "Email already exists", 400);
      }

      admin.email = email;
    }

    // Check duplicate phone
    if (phone && phone !== admin.phone) {
      const phoneExists = await Admin.findOne({
        phone,
        _id: { $ne: admin._id },
      });

      if (phoneExists) {
        return errorResponse(res, "Phone already exists", 400);
      }

      admin.phone = phone;
    }

    if (name) {
      admin.name = name;
    }

    // Role Update
    if (role) {
      admin.role = role;

      admin.permissions =
        permissions && permissions.length > 0
          ? permissions
          : DEFAULT_PERMISSIONS[role];
    }

    if (status) {
      admin.status = status;
    }

    await admin.save();

    return successResponse(res, "Admin updated successfully", admin);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// =================================
// DELETE ADMIN (SOFT DELETE)
// =================================

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin || admin.isDeleted) {
      return errorResponse(res, "Admin not found", 404);
    }

    admin.isDeleted = true;
    admin.status = "INACTIVE";

    await admin.save();

    return successResponse(res, "Admin deleted successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// =================================
// UPDATE PROFILE
// =================================

export const updateProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (!admin || admin.isDeleted) {
      return errorResponse(res, "Admin not found", 404);
    }

    const { name, phone } = req.body;

    // Check Duplicate Phone
    if (phone && phone !== admin.phone) {
      const phoneExists = await Admin.findOne({
        phone,
        _id: { $ne: admin._id },
      });

      if (phoneExists) {
        return errorResponse(res, "Phone number already exists", 400);
      }
    }

    if (name) {
      admin.name = name;
    }

    if (phone) {
      admin.phone = phone;
    }

    // Upload Image (Cloudinary)
    if (req.file) {
      admin.profileImage = req.file.path;
    }

    await admin.save();

    return successResponse(res, "Profile updated successfully", {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      profileImage: admin.profileImage,
      role: admin.role,
      permissions: admin.permissions,
      status: admin.status,
    });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// =================================
// GET MY PROFILE
// =================================

export const getMyProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");

    if (!admin || admin.isDeleted) {
      return errorResponse(res, "Admin not found", 404);
    }

    return successResponse(res, "Profile fetched successfully", admin);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
