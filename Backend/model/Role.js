import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: true,

      unique: true,

      trim: true,

      uppercase: true,
    },

    description: {
      type: String,

      default: "",
    },

    permissions: [
      {
        type: String,
      },
    ],

    status: {
      type: String,

      enum: ["ACTIVE", "INACTIVE"],

      default: "ACTIVE",
    },

    isDeleted: {
      type: Boolean,

      default: false,
    },
  },

  {
    timestamps: true,
  },
);

const Role = mongoose.model(
  "Role",

  roleSchema,
);

export default Role;
