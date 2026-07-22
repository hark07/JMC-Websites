import express from "express";

import upload from "../middleware/uploadDownload.js";

import {
  createDownload,
  getDownloads,
  getDownloadById,
  updateDownload,
  deleteDownload,
  downloadFile,
} from "../controllers/downloadController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";

const router = express.Router();

// ===============================
// PUBLIC ROUTES
// ===============================

// DOWNLOAD FILE
router.get("/file/:id", downloadFile);

// GET ALL DOWNLOADS
router.get("/", getDownloads);

// GET SINGLE DOWNLOAD
router.get("/:id", getDownloadById);

// ===============================
// PROTECTED ADMIN ROUTES
// ===============================

// CREATE DOWNLOAD
router.post(
  "/",
  authMiddleware,
  permissionMiddleware("DOWNLOAD_CREATE"),
  upload.single("file"),
  createDownload
);

// UPDATE DOWNLOAD
router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("DOWNLOAD_UPDATE"),
  upload.single("file"),
  updateDownload
);

// DELETE DOWNLOAD
router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("DOWNLOAD_DELETE"),
  deleteDownload
);

export default router;