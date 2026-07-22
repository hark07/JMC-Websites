import express from "express";

import {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";

// Middleware
import authMiddleware from "../middleware/authMiddleware.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";

const router = express.Router();

// ===============================
// PUBLIC ROUTES
// ===============================

// GET ALL NEWS
router.get("/", getNews);

// GET SINGLE NEWS
router.get("/:id", getNewsById);

// ===============================
// PROTECTED ADMIN ROUTES
// ===============================

// CREATE NEWS
router.post(
  "/",
  authMiddleware,
  permissionMiddleware("NEWS_CREATE"),
  createNews,
);

// UPDATE NEWS
router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("NEWS_UPDATE"),
  updateNews,
);

// DELETE NEWS
router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("NEWS_DELETE"),
  deleteNews,
);

export default router;
