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

// ===============================
// PUBLIC ROUTES
// ===============================

// GET ALL EVENTS
router.get("/", getEvents);

// GET SINGLE EVENT
router.get("/:id", getEventById);

// ===============================
// PROTECTED ADMIN ROUTES
// ===============================

// CREATE EVENT
router.post(
  "/",
  authMiddleware,
  permissionMiddleware("EVENT_CREATE"),
  createEvent,
);

// UPDATE EVENT
router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("EVENT_UPDATE"),
  updateEvent,
);

// DELETE EVENT
router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("EVENT_DELETE"),
  deleteEvent,
);

export default router;
