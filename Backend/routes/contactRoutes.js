import express from "express";

import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";

const router = express.Router();

// Public - anyone can submit the contact form
router.post("/", createContact);

// Admin - view all contact submissions
router.get(
  "/",
  authMiddleware,
  permissionMiddleware("CONTACT_READ"),
  getContacts,
);

// Admin - view a single submission
router.get(
  "/:id",
  authMiddleware,
  permissionMiddleware("CONTACT_READ"),
  getContactById,
);

// Admin - update/mark as read
router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("CONTACT_UPDATE"),
  updateContact,
);

// Admin - delete a submission
router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("CONTACT_DELETE"),
  deleteContact,
);

export default router;
