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

// PUBLIC CONTACT FORM

router.post("/", createContact);

// ADMIN GET ALL

router.get(
  "/",
  authMiddleware,
  permissionMiddleware("CONTACT_READ"),
  getContacts,
);

// ADMIN SINGLE

router.get(
  "/:id",
  authMiddleware,
  permissionMiddleware("CONTACT_READ"),
  getContactById,
);

// MARK READ / UPDATE

router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("CONTACT_UPDATE"),
  updateContact,
);

// DELETE

router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("CONTACT_DELETE"),
  deleteContact,
);

export default router;
