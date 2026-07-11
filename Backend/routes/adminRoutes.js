import express from "express";

import {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  updateProfile,
  getMyProfile,
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";

import { PERMISSIONS } from "../constants/permissions.js";

import {
  createAdminValidator,
  updateAdminValidator,
  updateProfileValidator,
} from "../validators/adminValidator.js";

const router = express.Router();

// =====================================================
// PROFILE ROUTES (KEEP THESE FIRST)
// =====================================================

// GET MY PROFILE
// GET /api/admin/profile
router.get("/profile", authMiddleware, getMyProfile);

// UPDATE MY PROFILE
// PUT /api/admin/profile/update
router.put(
  "/profile/update",
  authMiddleware,
  uploadMiddleware.single("profileImage"),
  validationMiddleware(updateProfileValidator),
  updateProfile,
);

// =====================================================
// ADMIN CRUD
// =====================================================

// CREATE ADMIN
// POST /api/admin/accounts
router.post(
  "/accounts",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.ADMIN_CREATE),
  validationMiddleware(createAdminValidator),
  createAdmin,
);

// GET ALL ADMINS
// GET /api/admin/accounts
router.get(
  "/accounts",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.ADMIN_READ),
  getAllAdmins,
);

// GET SINGLE ADMIN
// GET /api/admin/accounts/:id
router.get(
  "/accounts/:id",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.ADMIN_READ),
  getAdminById,
);

// UPDATE ADMIN
// PUT /api/admin/accounts/:id
router.put(
  "/accounts/:id",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.ADMIN_UPDATE),
  validationMiddleware(updateAdminValidator),
  updateAdmin,
);

// DELETE ADMIN
// DELETE /api/admin/accounts/:id
router.delete(
  "/accounts/:id",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.ADMIN_DELETE),
  deleteAdmin,
);

export default router;
