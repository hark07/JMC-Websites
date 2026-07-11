import express from "express";

import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  permissionMiddleware("EVENT_CREATE"),
  createEvent,
);

router.get("/", authMiddleware, permissionMiddleware("EVENT_READ"), getEvents);

router.get(
  "/:id",
  authMiddleware,
  permissionMiddleware("EVENT_READ"),
  getEventById,
);

router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("EVENT_UPDATE"),
  updateEvent,
);

router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("EVENT_DELETE"),
  deleteEvent,
);

export default router;
