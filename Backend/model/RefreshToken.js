import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    token: {
      type: String,
      required: true,
    },

    device: {
      type: String,
    },

    ipAddress: {
      type: String,
    },

    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("RefreshToken", refreshTokenSchema);
