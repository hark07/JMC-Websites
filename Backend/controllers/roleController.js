import Role from "../model/Role.js";

import { successResponse, errorResponse } from "../utils/response.js";

import { createActivityLog } from "../services/activityService.js";

// ========================================
// CREATE ROLE
// ========================================

export const createRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    if (!name) {
      return errorResponse(res, "Role name is required", 400);
    }

    const existingRole = await Role.findOne({
      name: name.toUpperCase(),
      isDeleted: false,
    });

    if (existingRole) {
      return errorResponse(res, "Role already exists", 400);
    }

    const role = await Role.create({
      name: name.toUpperCase(),
      description,
      permissions: permissions || [],
    });

    await createActivityLog({
      adminId: req.admin._id,
      action: "CREATE_ROLE",
      description: `Created role ${role.name}`,
      req,
    });

    return successResponse(res, "Role created successfully", role, 201);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// ========================================
// GET ALL ROLES
// ========================================

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({
      isDeleted: false,
    }).sort({
      createdAt: -1,
    });

    return successResponse(res, "Roles fetched successfully", roles);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// ========================================
// GET ROLE BY ID
// ========================================

export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!role) {
      return errorResponse(res, "Role not found", 404);
    }

    return successResponse(res, "Role fetched successfully", role);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// ========================================
// UPDATE ROLE
// ========================================

export const updateRole = async (req, res) => {
  try {
    const { name, description, permissions, status } = req.body;

    const role = await Role.findById(req.params.id);

    if (!role || role.isDeleted) {
      return errorResponse(res, "Role not found", 404);
    }

    if (name) {
      role.name = name.toUpperCase();
    }

    if (description !== undefined) {
      role.description = description;
    }

    if (permissions) {
      role.permissions = permissions;
    }

    if (status) {
      role.status = status;
    }

    await role.save();

    await createActivityLog({
      adminId: req.admin._id,
      action: "UPDATE_ROLE",
      description: `Updated role ${role.name}`,
      req,
    });

    return successResponse(res, "Role updated successfully", role);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// ========================================
// DELETE ROLE (SOFT DELETE)
// ========================================

export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role || role.isDeleted) {
      return errorResponse(res, "Role not found", 404);
    }

    role.isDeleted = true;
    role.status = "INACTIVE";

    await role.save();

    await createActivityLog({
      adminId: req.admin._id,
      action: "DELETE_ROLE",
      description: `Deleted role ${role.name}`,
      req,
    });

    return successResponse(res, "Role deleted successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
