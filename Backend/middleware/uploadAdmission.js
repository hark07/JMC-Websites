import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {

    if (file.fieldname === "studentPhoto") {
      return {
        folder: "JMC-Admission/Photos",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png"],
      };
    }

    return {
      folder: "JMC-Admission/Documents",
      resource_type: "raw",
      type: "upload",
      access_mode: "public",
    };

  },
});

const upload = multer({
  storage,
});

export default upload;