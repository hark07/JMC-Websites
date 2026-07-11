import Gallery from "../model/Gallery.js";
import cloudinary from "../config/cloudinary.js";

// =====================
// CREATE IMAGE
// =====================

export const createGallery = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,

        message: "Image required",
      });
    }

    const gallery = await Gallery.create({
      image: req.file.path,

      public_id: req.file.filename,
    });

    res.status(201).json({
      success: true,

      message: "Image added successfully",

      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// =====================
// GET ALL IMAGES
// =====================

export const getGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,

      count: galleries.length,

      data: galleries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// =====================
// GET SINGLE IMAGE
// =====================

export const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,

        message: "Image not found",
      });
    }

    res.status(200).json({
      success: true,

      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// =====================
// UPDATE IMAGE
// =====================

export const updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,

        message: "Image not found",
      });
    }

    if (req.file) {
      // Delete old image from Cloudinary

      if (gallery.public_id) {
        await cloudinary.uploader.destroy(gallery.public_id);
      }

      // Save new image

      gallery.image = req.file.path;

      gallery.public_id = req.file.filename;
    }

    await gallery.save();

    res.status(200).json({
      success: true,

      message: "Image updated successfully",

      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// =====================
// DELETE IMAGE
// =====================

export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,

        message: "Image not found",
      });
    }

    // Delete from Cloudinary

    if (gallery.public_id) {
      await cloudinary.uploader.destroy(gallery.public_id);
    }

    // Delete from MongoDB

    await gallery.deleteOne();

    res.status(200).json({
      success: true,

      message: "Image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
