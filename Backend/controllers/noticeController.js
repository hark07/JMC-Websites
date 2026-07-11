import Notice from "../model/Notice.js";
import cloudinary from "../config/cloudinary.js";
import axios from "axios";

// ================= CREATE =================

export const createNotice = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,

        message: "PDF file required",
      });
    }

    const notice = await Notice.create({
      title: req.body.title,

      category: req.body.category,

      description: req.body.description,

      date: req.body.date,

      important: req.body.important || false,

      file: req.file.path,

      file_public_id: req.file.filename,
    });

    res.status(201).json({
      success: true,

      message: "Notice Created Successfully",

      data: notice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= GET ALL =================

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,

      data: notices,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET SINGLE =================

export const getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    res.json({
      success: true,

      data: notice,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE =================

export const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    notice.title = req.body.title || notice.title;

    notice.category = req.body.category || notice.category;

    notice.description = req.body.description || notice.description;

    notice.date = req.body.date || notice.date;

    if (req.body.important !== undefined) {
      notice.important = req.body.important;
    }

    if (req.file) {
      await cloudinary.uploader.destroy(
        notice.file_public_id,

        {
          resource_type: "raw",
        },
      );

      notice.file = req.file.path;

      notice.file_public_id = req.file.filename;
    }

    await notice.save();

    res.json({
      success: true,

      message: "Notice Updated Successfully",

      data: notice,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DELETE =================

export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    await cloudinary.uploader.destroy(
      notice.file_public_id,

      {
        resource_type: "raw",
      },
    );

    await notice.deleteOne();

    res.json({
      success: true,

      message: "Notice Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// DOWNLOAD NOTICE PDF
// ===============================

export const downloadNoticeFile = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }


    const response = await axios.get(notice.file, {
      responseType: "stream",
    });


    res.setHeader(
      "Content-Type",
      "application/pdf"
    );


    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${notice.title}.pdf"`
    );


    response.data.pipe(res);


  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};
