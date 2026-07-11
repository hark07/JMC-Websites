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

// ================= CREATE ABOUT =================

router.post(
  "/",
  authMiddleware,
  permissionMiddleware("ABOUT_CREATE"),
  upload,
  createAbout,
);

// ================= GET ALL =================

router.get("/", authMiddleware, permissionMiddleware("ABOUT_READ"), getAbouts);

// ================= GET SINGLE =================

router.get(
  "/:id",
  authMiddleware,
  permissionMiddleware("ABOUT_READ"),
  getAboutById,
);

// ================= UPDATE =================

router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("ABOUT_UPDATE"),
  upload,
  updateAbout,
);

// ================= DELETE =================

router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("ABOUT_DELETE"),
  deleteAbout,
);

export default router;
