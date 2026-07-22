import express from "express";

import upload from "../middleware/uploadAbout.js";

import {
  createAbout,
  getAbouts,
  getAboutById,
  updateAbout,
  deleteAbout,
} from "../controllers/aboutController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";

const router = express.Router();

// ===============================
// PUBLIC ROUTES
// ===============================

// GET ALL ABOUT
router.get("/", getAbouts);

// GET SINGLE ABOUT
router.get("/:id", getAboutById);

// ===============================
// PROTECTED ADMIN ROUTES
// ===============================

// CREATE ABOUT
router.post(
  "/",
  authMiddleware,
  permissionMiddleware("ABOUT_CREATE"),
  upload,
  createAbout,
);

// UPDATE ABOUT
router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("ABOUT_UPDATE"),
  upload,
  updateAbout,
);

// DELETE ABOUT
router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("ABOUT_DELETE"),
  deleteAbout,
);

export default router;
