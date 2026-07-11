import cloudinary from "../config/cloudinary.js";
import CampusChiefMessage from "../model/CampusChiefMessage.js";

// =========================================
// CREATE
// Only One Record Allowed
// =========================================

export const createCampusChiefMessage = async (req, res) => {
  try {
    const exists = await CampusChiefMessage.findOne();

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Campus Chief Message already exists. Please update it.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const chief = await CampusChiefMessage.create({
      name: req.body.name,

      designation: req.body.designation,

      message: req.body.message,

      signature: req.body.signature,

      image: req.file.path,

      public_id: req.file.filename,
    });

    res.status(201).json({
      success: true,
      message: "Campus Chief Message Created",
      data: chief,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// GET
// =========================================

export const getCampusChiefMessage = async (req, res) => {
  try {
    const chief = await CampusChiefMessage.findOne();

    res.json({
      success: true,
      data: chief,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// GET BY ID
// =========================================

export const getCampusChiefMessageById = async (req, res) => {
  try {
    const chief = await CampusChiefMessage.findById(req.params.id);

    if (!chief) {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }

    res.json({
      success: true,
      data: chief,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// UPDATE
// =========================================

export const updateCampusChiefMessage = async (req, res) => {
  try {
    const chief = await CampusChiefMessage.findById(req.params.id);

    if (!chief) {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }

    if (req.file) {
      await cloudinary.uploader.destroy(chief.public_id);

      chief.image = req.file.path;
      chief.public_id = req.file.filename;
    }

    chief.name = req.body.name || chief.name;

    chief.designation = req.body.designation || chief.designation;

    chief.message = req.body.message || chief.message;

    chief.signature = req.body.signature || chief.signature;

    await chief.save();

    res.json({
      success: true,
      message: "Updated Successfully",
      data: chief,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// DELETE
// =========================================

export const deleteCampusChiefMessage = async (req, res) => {
  try {
    const chief = await CampusChiefMessage.findById(req.params.id);

    if (!chief) {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }

    await cloudinary.uploader.destroy(chief.public_id);

    await chief.deleteOne();

    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
