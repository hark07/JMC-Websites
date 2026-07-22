import express from "express";
import upload from "../middleware/uploadAdmission.js";

import {
  createAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmission,
  deleteAdmission,
} from "../controllers/admissionController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";

const router = express.Router();

// PUBLIC
router.post(
  "/",
  upload.fields([
    { name: "studentPhoto", maxCount: 1 },
    { name: "documents", maxCount: 20 },
  ]),
  createAdmission,
);

// ADMIN
router.get(
  "/",
  authMiddleware,
  permissionMiddleware("ADMISSION_VIEW"),
  getAdmissions,
);

router.get(
  "/:id",
  authMiddleware,
  permissionMiddleware("ADMISSION_VIEW"),
  getAdmissionById,
);

router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("ADMISSION_UPDATE"),
  upload.fields([
    { name: "studentPhoto", maxCount: 1 },
    { name: "documents", maxCount: 20 },
  ]),
  updateAdmission,
);

router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("ADMISSION_DELETE"),
  deleteAdmission,
);

export default router;
