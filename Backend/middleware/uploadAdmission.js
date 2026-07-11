import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    if (file.fieldname === "studentPhoto") {
      return {
        folder: "JMC-Admission/Photos",

        allowed_formats: ["jpg", "jpeg", "png"],
      };
    }

    return {
      folder: "JMC-Admission/Documents",

      resource_type: "raw",
    };
  },
});

const upload = multer({
  storage,
});

export default upload;
