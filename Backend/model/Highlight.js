import mongoose from "mongoose";

const highlightSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("Highlight", highlightSchema);
