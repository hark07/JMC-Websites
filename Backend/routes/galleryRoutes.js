import express from "express";

import upload from "../middleware/galleryUpload.js";

import {
  createGallery,
  getGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";

const router = express.Router();

// ===============================
// PUBLIC ROUTES
// ===============================

// GET ALL GALLERY
router.get("/", getGallery);

// GET SINGLE GALLERY
router.get("/:id", getGalleryById);

// ===============================
// PROTECTED ADMIN ROUTES
// ===============================

// CREATE GALLERY
router.post(
  "/",
  authMiddleware,
  permissionMiddleware("GALLERY_CREATE"),
  upload.single("image"),
  createGallery,
);

// UPDATE GALLERY
router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("GALLERY_UPDATE"),
  upload.single("image"),
  updateGallery,
);

// DELETE GALLERY
router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("GALLERY_DELETE"),
  deleteGallery,
);

export default router;
