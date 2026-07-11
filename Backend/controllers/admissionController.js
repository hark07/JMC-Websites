import Admission from "../model/Admission.js";
import cloudinary from "../config/cloudinary.js";

// CREATE

export const createAdmission = async (req, res) => {
  try {
    const admission = await Admission.create({
      ...req.body,

      studentPhoto: req.files?.studentPhoto
        ? {
            url: req.files.studentPhoto[0].path,
            public_id: req.files.studentPhoto[0].filename,
          }
        : null,

      documents: req.files?.documents
        ? req.files.documents.map((file) => ({
            name: file.originalname,
            url: file.path,
            public_id: file.filename,
          }))
        : [],
    });

    res.status(201).json({
      success: true,

      message: "Admission submitted successfully",

      data: admission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// GET ALL

export const getAdmissions = async (req, res) => {
  try {
    const data = await Admission.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,

      count: data.length,

      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// GET SINGLE

export const getAdmissionById = async (req, res) => {
  try {
    const data = await Admission.findById(req.params.id);

    if (!data)
      return res.status(404).json({
        success: false,

        message: "Admission not found",
      });

    res.json({
      success: true,

      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// UPDATE

export const updateAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission)
      return res.status(404).json({
        message: "Admission not found",
      });

    Object.assign(admission, req.body);

    await admission.save();

    res.json({
      success: true,

      message: "Updated successfully",

      data: admission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// DELETE

export const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission)
      return res.status(404).json({
        message: "Admission not found",
      });

    if (admission.studentPhoto?.public_id) {
      await cloudinary.uploader.destroy(admission.studentPhoto.public_id);
    }

    for (const doc of admission.documents) {
      await cloudinary.uploader.destroy(doc.public_id, {
        resource_type: "raw",
      });
    }

    await admission.deleteOne();

    res.json({
      success: true,

      message: "Admission deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
