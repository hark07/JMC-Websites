import multer from "multer";

import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "admin-profile",

    allowed_formats: ["jpg", "png", "jpeg", "webp"],

    transformation: [
      {
        width: 500,
        height: 500,
        crop: "fill",
      },
    ],
  },
});

const upload = multer({
  storage,
});

export default upload;
