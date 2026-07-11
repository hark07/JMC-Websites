import About from "../model/About.js";
import cloudinary from "../config/cloudinary.js";

// ================= CREATE =================

export const createAbout = async (req, res) => {
  try {
    const about = await About.create({
      campusTitle: req.body.campusTitle,
      campusDescription1: req.body.campusDescription1,
      campusDescription2: req.body.campusDescription2,

      vision: req.body.vision,
      mission: req.body.mission,

      chiefTitle: req.body.chiefTitle,
      chiefMessage1: req.body.chiefMessage1,
      chiefMessage2: req.body.chiefMessage2,
      chiefMessage3: req.body.chiefMessage3,

      chiefName: req.body.chiefName,
      chiefPosition: req.body.chiefPosition,

      campusImage: req.files?.campusImage ? req.files.campusImage[0].path : "",

      campusImage_public_id: req.files?.campusImage
        ? req.files.campusImage[0].filename
        : "",

      chiefImage: req.files?.chiefImage ? req.files.chiefImage[0].path : "",

      chiefImage_public_id: req.files?.chiefImage
        ? req.files.chiefImage[0].filename
        : "",
    });

    res.status(201).json({
      success: true,
      message: "About Created Successfully",
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL =================

export const getAbouts = async (req, res) => {
  try {
    const abouts = await About.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: abouts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE =================

export const getAboutById = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About not found",
      });
    }

    res.json({
      success: true,
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE =================

export const updateAbout = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About not found",
      });
    }

    about.campusTitle = req.body.campusTitle || about.campusTitle;

    about.campusDescription1 =
      req.body.campusDescription1 || about.campusDescription1;

    about.campusDescription2 =
      req.body.campusDescription2 || about.campusDescription2;

    about.vision = req.body.vision || about.vision;

    about.mission = req.body.mission || about.mission;

    about.chiefTitle = req.body.chiefTitle || about.chiefTitle;

    about.chiefMessage1 = req.body.chiefMessage1 || about.chiefMessage1;

    about.chiefMessage2 = req.body.chiefMessage2 || about.chiefMessage2;

    about.chiefMessage3 = req.body.chiefMessage3 || about.chiefMessage3;

    about.chiefName = req.body.chiefName || about.chiefName;

    about.chiefPosition = req.body.chiefPosition || about.chiefPosition;

    // Campus Image
    if (req.files?.campusImage) {
      if (about.campusImage_public_id) {
        await cloudinary.uploader.destroy(about.campusImage_public_id);
      }

      about.campusImage = req.files.campusImage[0].path;

      about.campusImage_public_id = req.files.campusImage[0].filename;
    }

    // Chief Image
    if (req.files?.chiefImage) {
      if (about.chiefImage_public_id) {
        await cloudinary.uploader.destroy(about.chiefImage_public_id);
      }

      about.chiefImage = req.files.chiefImage[0].path;

      about.chiefImage_public_id = req.files.chiefImage[0].filename;
    }

    await about.save();

    res.json({
      success: true,
      message: "About Updated Successfully",
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE =================

export const deleteAbout = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About not found",
      });
    }

    if (about.campusImage_public_id) {
      await cloudinary.uploader.destroy(about.campusImage_public_id);
    }

    if (about.chiefImage_public_id) {
      await cloudinary.uploader.destroy(about.chiefImage_public_id);
    }

    await about.deleteOne();

    res.json({
      success: true,
      message: "About Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
