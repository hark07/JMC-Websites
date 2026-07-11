import Program from "../model/Program.js";

// =============================
// CREATE PROGRAM
// =============================

export const createProgram = async (req, res) => {
  try {
    const program = await Program.create(req.body);

    res.status(201).json({
      success: true,

      message: "Program created successfully",

      data: program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// =============================
// GET ALL PROGRAMS
// =============================

export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,

      count: programs.length,

      data: programs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// =============================
// GET PROGRAM BY SLUG
// =============================

export const getProgramBySlug = async (req, res) => {
  try {
    const program = await Program.findOne({
      slug: req.params.slug,
    });

    if (!program) {
      return res.status(404).json({
        success: false,

        message: "Program not found",
      });
    }

    res.status(200).json({
      success: true,

      data: program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// =============================
// GET PROGRAM BY ID
// =============================

export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,

        message: "Program not found",
      });
    }

    res.json({
      success: true,

      data: program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// =============================
// UPDATE PROGRAM
// =============================

export const updateProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,

        message: "Program not found",
      });
    }

    program.code = req.body.code || program.code;

    program.title = req.body.title || program.title;

    program.slug = req.body.slug || program.slug;

    program.duration = req.body.duration || program.duration;

    program.eligibility = req.body.eligibility || program.eligibility;

    program.seats = req.body.seats || program.seats;

    program.affiliation = req.body.affiliation || program.affiliation;

    program.description = req.body.description || program.description;

    program.objectives = req.body.objectives || program.objectives;

    await program.save();

    res.status(200).json({
      success: true,

      message: "Program updated successfully",

      data: program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// =============================
// DELETE PROGRAM
// =============================

export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,

        message: "Program not found",
      });
    }

    await program.deleteOne();

    res.status(200).json({
      success: true,

      message: "Program deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
