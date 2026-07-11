import cloudinary from "../config/cloudinary.js";
import Download from "../model/Download.js";
import axios from "axios";

// =====================================
// Create Download
// =====================================

export const createDownload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    const download = await Download.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,

      file: req.file.path,

      file_public_id: req.file.filename,
    });

    res.status(201).json({
      success: true,
      message: "Download created successfully",
      data: download,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get All Downloads
// =====================================

export const getDownloads = async (req, res) => {
  try {
    const downloads = await Download.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: downloads.length,
      data: downloads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get Single Download
// =====================================

export const getDownloadById = async (req, res) => {
  try {
    const download = await Download.findById(req.params.id);

    if (!download) {
      return res.status(404).json({
        success: false,
        message: "Download not found",
      });
    }

    res.status(200).json({
      success: true,
      data: download,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Update Download
// =====================================

export const updateDownload = async (req, res) => {
  try {
    const download = await Download.findById(req.params.id);

    if (!download) {
      return res.status(404).json({
        success: false,
        message: "Download not found",
      });
    }

    download.title = req.body.title || download.title;
    download.description = req.body.description || download.description;
    download.category = req.body.category || download.category;

    // Update PDF if uploaded
    if (req.file) {
      await cloudinary.uploader.destroy(download.file_public_id, {
        resource_type: "raw",
      });

      download.file = req.file.path;
      download.file_public_id = req.file.filename;
    }

    await download.save();

    res.status(200).json({
      success: true,
      message: "Download updated successfully",
      data: download,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Delete Download
// =====================================

export const deleteDownload = async (req, res) => {
  try {
    const download = await Download.findById(req.params.id);

    if (!download) {
      return res.status(404).json({
        success: false,
        message: "Download not found",
      });
    }

    // Delete PDF from Cloudinary
    await cloudinary.uploader.destroy(download.file_public_id, {
      resource_type: "raw",
    });

    // Delete document from MongoDB
    await download.deleteOne();

    res.status(200).json({
      success: true,
      message: "Download deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Download PDF File
// ===============================

export const downloadFile = async (req, res) => {
  try {
    const file = await Download.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    const response = await axios.get(file.file, {
      responseType: "stream",
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.title}.pdf"`,
    );

    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
