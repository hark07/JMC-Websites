import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "JMC-About",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({
  storage,
});

export default upload.fields([
  {
    name: "campusImage",
    maxCount: 1,
  },
  {
    name: "chiefImage",
    maxCount: 1,
  },
]);