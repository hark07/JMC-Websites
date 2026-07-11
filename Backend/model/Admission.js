import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    nepaliName: {
      type: String,
    },

    dobAD: {
      type: String,
    },

    dobBS: {
      type: String,
    },

    gender: {
      type: String,
    },

    nationality: {
      type: String,
    },

    citizenshipNo: {
      type: String,
    },

    nationalId: {
      type: String,
    },

    bloodGroup: {
      type: String,
    },

    maritalStatus: {
      type: String,
    },

    religion: {
      type: String,
    },

    email: {
      type: String,
    },

    mobile: {
      type: String,
      required: true,
    },

    permanentAddress: {
      province: String,
      district: String,
      municipality: String,
      ward: String,
      tole: String,
    },

    temporaryAddress: {
      province: String,
      district: String,
      municipality: String,
      ward: String,
      tole: String,
    },

    father: {
      name: String,
      occupation: String,
      mobile: String,
    },

    mother: {
      name: String,
      occupation: String,
      mobile: String,
    },

    guardian: {
      name: String,
      relation: String,
      contact: String,
    },

    academic: {
      see: {
        school: String,
        board: String,
        year: String,
        gpa: String,
      },

      plusTwo: {
        college: String,
        board: String,
        faculty: String,
        year: String,
        gpa: String,
      },
    },

    admission: {
      faculty: String,

      program: String,

      subjectGroup: String,

      academicYear: String,

      rollNo: String,

      registrationNo: String,
    },

    studentPhoto: {
      url: String,
      public_id: String,
    },

    documents: [
      {
        name: String,
        url: String,
        public_id: String,
      },
    ],

    declaration: {
      signature: String,

      date: String,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("Admission", admissionSchema);
