import express from "express";

import {
  createProgram,
  getPrograms,
  getProgramBySlug,
  getProgramById,
  updateProgram,
  deleteProgram,
} from "../controllers/programController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";

const router = express.Router();

// ===============================
// PUBLIC ROUTES
// ===============================

// GET ALL PROGRAMS
router.get("/", getPrograms);

// GET PROGRAM BY SLUG
router.get("/slug/:slug", getProgramBySlug);

// GET PROGRAM BY ID
router.get("/:id", getProgramById);

// ===============================
// PROTECTED ADMIN ROUTES
// ===============================

// CREATE PROGRAM
router.post(
  "/",
  authMiddleware,
  permissionMiddleware("PROGRAM_CREATE"),
  createProgram,
);

// UPDATE PROGRAM
router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("PROGRAM_UPDATE"),
  updateProgram,
);

// DELETE PROGRAM
router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("PROGRAM_DELETE"),
  deleteProgram,
);

export default router;
