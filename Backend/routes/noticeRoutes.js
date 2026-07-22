import express from "express";

import upload from "../middleware/uploadNotice.js";

import {
  createNotice,
  getNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
  downloadNoticeFile,
} from "../controllers/noticeController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";

const router = express.Router();

// ===============================
// PUBLIC ROUTES
// ===============================

// DOWNLOAD NOTICE PDF
router.get("/download/:id", downloadNoticeFile);

// GET ALL NOTICES
router.get("/", getNotices);

// GET SINGLE NOTICE
router.get("/:id", getNoticeById);

// ===============================
// PROTECTED ADMIN ROUTES
// ===============================

// CREATE NOTICE
router.post(
  "/",
  authMiddleware,
  permissionMiddleware("NOTICE_CREATE"),
  upload.single("file"),
  createNotice,
);

// UPDATE NOTICE
router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("NOTICE_UPDATE"),
  upload.single("file"),
  updateNotice,
);

// DELETE NOTICE
router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("NOTICE_DELETE"),
  deleteNotice,
);

export default router;
