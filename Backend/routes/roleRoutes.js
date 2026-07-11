import express from "express";

import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "../controllers/roleController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";

import { PERMISSIONS } from "../constants/permissions.js";

const router = express.Router();

// ========================================
// CREATE ROLE
// ========================================

router.post(
  "/",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.ROLE_CREATE),
  createRole,
);

// ========================================
// GET ALL ROLES
// ========================================

router.get(
  "/",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.ROLE_READ),
  getAllRoles,
);

// ========================================
// GET ROLE BY ID
// ========================================

router.get(
  "/:id",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.ROLE_READ),
  getRoleById,
);

// ========================================
// UPDATE ROLE
// ========================================

router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.ROLE_UPDATE),
  updateRole,
);

// ========================================
// DELETE ROLE
// ========================================

router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.ROLE_DELETE),
  deleteRole,
);

export default router;
