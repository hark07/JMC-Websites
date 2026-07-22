import multer from "multer";
import multerStorageCloudinary from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";


const { CloudinaryStorage } = multerStorageCloudinary;


const storage = new CloudinaryStorage({

  cloudinary,

  params: {
    folder: "JMC-Hero",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],
  },

});


const upload = multer({
  storage,
});


export default upload;