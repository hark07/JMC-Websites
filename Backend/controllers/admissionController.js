import Admission from "../model/Admission.js";
import cloudinary from "../config/cloudinary.js";

// CREATE ADMISSION
export const createAdmission = async (req, res) => {
  try {
    const admission = await Admission.create({
      fullName: req.body.fullName,
      nepaliName: req.body.nepaliName,
      dobAD: req.body.dobAD,
      dobBS: req.body.dobBS,
      gender: req.body.gender,
      nationality: req.body.nationality,
      citizenshipNo: req.body.citizenshipNo,
      nationalId: req.body.nationalId,
      bloodGroup: req.body.bloodGroup,
      maritalStatus: req.body.maritalStatus,
      religion: req.body.religion,
      email: req.body.email,
      mobile: req.body.mobile,

      permanentAddress: {
        province: req.body.permanentProvince,
        district: req.body.permanentDistrict,
        municipality: req.body.permanentMunicipality,
        ward: req.body.permanentWard,
        tole: req.body.permanentTole,
      },

      temporaryAddress: {
        province: req.body.temporaryProvince,
        district: req.body.temporaryDistrict,
        municipality: req.body.temporaryMunicipality,
        ward: req.body.temporaryWard,
        tole: req.body.temporaryTole,
      },

      father: {
        name: req.body.fatherName,
        occupation: req.body.fatherOccupation,
        mobile: req.body.fatherMobile,
      },

      mother: {
        name: req.body.motherName,
        occupation: req.body.motherOccupation,
        mobile: req.body.motherMobile,
      },

      guardian: {
        name: req.body.guardianName,
        relation: req.body.guardianRelation,
        contact: req.body.guardianContact,
      },

      academic: {
        see: {
          school: req.body.seeSchool,
          board: req.body.seeBoard,
          year: req.body.seeYear,
          gpa: req.body.seeGPA,
        },

        plusTwo: {
          college: req.body.plusTwoCollege,
          board: req.body.plusTwoBoard,
          faculty: req.body.plusTwoFaculty,
          year: req.body.plusTwoYear,
          gpa: req.body.plusTwoGPA,
        },
      },

      admission: {
        faculty: req.body.faculty,
        program: req.body.program,
        subjectGroup: req.body.subjectGroup,
        academicYear: req.body.academicYear,
        rollNo: req.body.rollNo,
        registrationNo: req.body.registrationNo,
      },

      declaration: {
        signature: req.body.applicantSignature,
        date: req.body.declarationDate,
      },

      studentPhoto: req.files?.studentPhoto?.[0]
        ? {
            url: req.files.studentPhoto[0].path,
            public_id: req.files.studentPhoto[0].filename,
          }
        : null,

     documents: req.files?.documents?.length
  ? req.files.documents.map((file) => ({
      name: file.originalname,

      url: file.path.replace(
        "/raw/upload/",
        "/raw/upload/fl_attachment:false/"
      ),

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
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL ADMISSIONS
export const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: admissions.length,
      data: admissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE ADMISSION
export const getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    res.status(200).json({
      success: true,
      data: admission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE ADMISSION
export const updateAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admission updated successfully",
      data: admission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE ADMISSION
export const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    if (admission.studentPhoto?.public_id) {
      await cloudinary.uploader.destroy(admission.studentPhoto.public_id);
    }

    if (admission.documents?.length) {
      for (const doc of admission.documents) {
        if (doc.public_id) {
          await cloudinary.uploader.destroy(doc.public_id, {
            resource_type: "raw",
          });
        }
      }
    }

    await Admission.findByIdAndDelete(req.params.id);

    res.status(200).json({
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
