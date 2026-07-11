import express from "express";

import upload from "../middleware/upload.js";

import {
  createHero,
  getHeroes,
  getHeroById,
  updateHero,
  deleteHero,
} from "../controllers/heroController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import permissionMiddleware from "../middleware/permissionMiddleware.js";

const router = express.Router();

// CREATE HERO

router.post(
  "/",

  authMiddleware,

  permissionMiddleware("HERO_CREATE"),

  upload.single("image"),

  createHero,
);

// GET ALL HERO

router.get(
  "/",

  authMiddleware,

  permissionMiddleware("HERO_READ"),

  getHeroes,
);

// GET SINGLE HERO

router.get(
  "/:id",

  authMiddleware,

  permissionMiddleware("HERO_READ"),

  getHeroById,
);

// UPDATE HERO

router.put(
  "/:id",

  authMiddleware,

  permissionMiddleware("HERO_UPDATE"),

  upload.single("image"),

  updateHero,
);

// DELETE HERO

router.delete(
  "/:id",

  authMiddleware,

  permissionMiddleware("HERO_DELETE"),

  deleteHero,
);

export default router;
