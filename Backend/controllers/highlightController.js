import Highlight from "../model/Highlight.js";

// ==========================
// CREATE HIGHLIGHT
// ==========================

export const createHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.create({
      title: req.body.title,
    });

    res.status(201).json({
      success: true,

      message: "Highlight created successfully",

      data: highlight,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================
// GET ALL HIGHLIGHTS
// ==========================

export const getHighlights = async (req, res) => {
  try {
    const highlights = await Highlight.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,

      count: highlights.length,

      data: highlights,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================
// GET SINGLE HIGHLIGHT
// ==========================

export const getHighlightById = async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);

    if (!highlight) {
      return res.status(404).json({
        success: false,

        message: "Highlight not found",
      });
    }

    res.status(200).json({
      success: true,

      data: highlight,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================
// UPDATE HIGHLIGHT
// ==========================

export const updateHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);

    if (!highlight) {
      return res.status(404).json({
        success: false,

        message: "Highlight not found",
      });
    }

    highlight.title = req.body.title || highlight.title;

    highlight.status = req.body.status ?? highlight.status;

    await highlight.save();

    res.status(200).json({
      success: true,

      message: "Highlight updated successfully",

      data: highlight,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================
// DELETE HIGHLIGHT
// ==========================

export const deleteHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);

    if (!highlight) {
      return res.status(404).json({
        success: false,

        message: "Highlight not found",
      });
    }

    await highlight.deleteOne();

    res.status(200).json({
      success: true,

      message: "Highlight deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
