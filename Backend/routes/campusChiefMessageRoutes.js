import express from "express";

import upload from "../middleware/campusChiefMessageUpload.js";

import {
  createCampusChiefMessage,
  getCampusChiefMessage,
  getCampusChiefMessageById,
  updateCampusChiefMessage,
  deleteCampusChiefMessage,
} from "../controllers/campusChiefMessageController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  permissionMiddleware("MESSAGE_CREATE"),
  upload.single("image"),
  createCampusChiefMessage,
);

router.get(
  "/",
  authMiddleware,
  permissionMiddleware("MESSAGE_READ"),
  getCampusChiefMessage,
);

router.get(
  "/:id",
  authMiddleware,
  permissionMiddleware("MESSAGE_READ"),
  getCampusChiefMessageById,
);

router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("MESSAGE_UPDATE"),
  upload.single("image"),
  updateCampusChiefMessage,
);

router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("MESSAGE_DELETE"),
  deleteCampusChiefMessage,
);

export default router;
