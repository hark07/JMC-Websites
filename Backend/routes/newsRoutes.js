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
// CREATE NEWS
// ===============================

router.post(
  "/",

  authMiddleware,

  permissionMiddleware("NEWS_CREATE"),

  createNews,
);

// ===============================
// GET ALL NEWS
// ===============================

router.get(
  "/",

  authMiddleware,

  permissionMiddleware("NEWS_READ"),

  getNews,
);

// ===============================
// GET SINGLE NEWS
// ===============================

router.get(
  "/:id",

  authMiddleware,

  permissionMiddleware("NEWS_READ"),

  getNewsById,
);

// ===============================
// UPDATE NEWS
// ===============================

router.put(
  "/:id",

  authMiddleware,

  permissionMiddleware("NEWS_UPDATE"),

  updateNews,
);

// ===============================
// DELETE NEWS
// ===============================

router.delete(
  "/:id",

  authMiddleware,

  permissionMiddleware("NEWS_DELETE"),

  deleteNews,
);

export default router;
