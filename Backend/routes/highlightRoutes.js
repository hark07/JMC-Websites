import express from "express";

import {
  createHighlight,
  deleteHighlight,
  getHighlightById,
  getHighlights,
  updateHighlight,
} from "../controllers/highlightController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";

const router = express.Router();

// ===============================
// PUBLIC ROUTES
// ===============================

// GET ALL HIGHLIGHTS
router.get("/", getHighlights);

// GET SINGLE HIGHLIGHT
router.get("/:id", getHighlightById);

// ===============================
// PROTECTED ADMIN ROUTES
// ===============================

// CREATE HIGHLIGHT
router.post(
  "/",
  authMiddleware,
  permissionMiddleware("HIGHLIGHT_CREATE"),
  createHighlight,
);

// UPDATE HIGHLIGHT
router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("HIGHLIGHT_UPDATE"),
  updateHighlight,
);

// DELETE HIGHLIGHT
router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("HIGHLIGHT_DELETE"),
  deleteHighlight,
);

export default router;
