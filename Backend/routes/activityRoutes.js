import express from "express";

import { getActivityLogs } from "../controllers/activityController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",

  authMiddleware,

  roleMiddleware("SUPER_ADMIN"),

  getActivityLogs,
);

export default router;
