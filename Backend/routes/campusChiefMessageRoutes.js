import express from "express";

import upload from "../middleware/campusChiefMessageUpload.js";

import {
  createCampusChiefMessage,
  getCampusChiefMessage,
  getCampusChiefMessageById,
  updateCampusChiefMessage,
  deleteCampusChiefMessage,
} from "../controllers/campusChiefMessageController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";

const router = express.Router();

// ===============================
// PUBLIC ROUTES
// ===============================

// GET ALL
router.get("/", getCampusChiefMessage);

// GET SINGLE
router.get("/:id", getCampusChiefMessageById);

// ===============================
// PROTECTED ADMIN ROUTES
// ===============================

// CREATE
router.post(
  "/",
  authMiddleware,
  permissionMiddleware("MESSAGE_CREATE"),
  upload.single("image"),
  createCampusChiefMessage,
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("MESSAGE_UPDATE"),
  upload.single("image"),
  updateCampusChiefMessage,
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("MESSAGE_DELETE"),
  deleteCampusChiefMessage,
);

export default router;
