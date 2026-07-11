import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    campusTitle: {
      type: String,
      required: true,
      trim: true,
    },

    campusDescription1: {
      type: String,
      required: true,
    },

    campusDescription2: {
      type: String,
      required: true,
    },

    campusImage: {
      type: String,
      required: true,
    },

    vision: {
      type: String,
      required: true,
    },

    mission: {
      type: String,
      required: true,
    },

    chiefTitle: {
      type: String,
      default: "Campus Chief's Message",
    },

    chiefMessage1: {
      type: String,
      required: true,
    },

    chiefMessage2: {
      type: String,
      required: true,
    },

    chiefMessage3: {
      type: String,
      required: true,
    },

    chiefName: {
      type: String,
      required: true,
    },

    chiefPosition: {
      type: String,
      default: "Campus Chief",
    },

    chiefImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("About", aboutSchema);
