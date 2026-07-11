import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    duration: {
      type: String,
      required: true,
    },

    eligibility: {
      type: String,
      required: true,
    },

    seats: {
      type: String,
      required: true,
    },

    affiliation: {
      type: String,
      default: "Tribhuvan University",
    },

    description: {
      type: String,
      required: true,
    },

    objectives: [
      {
        type: String,
      },
    ],

    status: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("Program", programSchema);
