import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,

      required: true,

      trim: true,
    },

    category: {
      type: String,

      required: true,

      trim: true,
    },

    description: {
      type: String,

      required: true,

      trim: true,
    },

    date: {
      type: String,

      required: true,
    },

    important: {
      type: Boolean,

      default: false,
    },

    file: {
      type: String,

      required: true,
    },

    file_public_id: {
      type: String,

      required: true,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("Notice", noticeSchema);
