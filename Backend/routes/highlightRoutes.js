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

router.post(
  "/",
  authMiddleware,
  permissionMiddleware("HIGHLIGHT_CREATE"),
  createHighlight,
);

router.get(
  "/",
  authMiddleware,
  permissionMiddleware("HIGHLIGHT_READ"),
  getHighlights,
);

router.get(
  "/:id",
  authMiddleware,
  permissionMiddleware("HIGHLIGHT_READ"),
  getHighlightById,
);

router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("HIGHLIGHT_UPDATE"),
  updateHighlight,
);

router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("HIGHLIGHT_DELETE"),
  deleteHighlight,
);

export default router;
