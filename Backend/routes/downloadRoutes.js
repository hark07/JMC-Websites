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

// DOWNLOAD FILE

router.get("/file/:id", downloadFile);

// CREATE

router.post(
  "/",
  authMiddleware,
  permissionMiddleware("DOWNLOAD_CREATE"),
  upload.single("file"),
  createDownload,
);

// GET ALL

router.get(
  "/",
  authMiddleware,
  permissionMiddleware("DOWNLOAD_READ"),
  getDownloads,
);

// GET SINGLE

router.get(
  "/:id",
  authMiddleware,
  permissionMiddleware("DOWNLOAD_READ"),
  getDownloadById,
);

// UPDATE

router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("DOWNLOAD_UPDATE"),
  upload.single("file"),
  updateDownload,
);

// DELETE

router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("DOWNLOAD_DELETE"),
  deleteDownload,
);

export default router;
