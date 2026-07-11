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

router.post(
  "/",
  authMiddleware,
  permissionMiddleware("PROGRAM_CREATE"),
  createProgram,
);

router.get(
  "/",
  authMiddleware,
  permissionMiddleware("PROGRAM_READ"),
  getPrograms,
);

router.get(
  "/slug/:slug",
  authMiddleware,
  permissionMiddleware("PROGRAM_READ"),
  getProgramBySlug,
);

router.get(
  "/:id",
  authMiddleware,
  permissionMiddleware("PROGRAM_READ"),
  getProgramById,
);

router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("PROGRAM_UPDATE"),
  updateProgram,
);

router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("PROGRAM_DELETE"),
  deleteProgram,
);

export default router;
