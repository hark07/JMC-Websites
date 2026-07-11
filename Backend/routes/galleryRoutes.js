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

// CREATE GALLERY

router.post(
  "/",

  authMiddleware,

  permissionMiddleware("GALLERY_CREATE"),

  upload.single("image"),

  createGallery,
);

// GET ALL

router.get(
  "/",

  authMiddleware,

  permissionMiddleware("GALLERY_READ"),

  getGallery,
);

// GET SINGLE

router.get(
  "/:id",

  authMiddleware,

  permissionMiddleware("GALLERY_READ"),

  getGalleryById,
);

// UPDATE

router.put(
  "/:id",

  authMiddleware,

  permissionMiddleware("GALLERY_UPDATE"),

  upload.single("image"),

  updateGallery,
);

// DELETE

router.delete(
  "/:id",

  authMiddleware,

  permissionMiddleware("GALLERY_DELETE"),

  deleteGallery,
);

export default router;
