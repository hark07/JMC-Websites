import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },

  action: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  ipAddress: {
    type: String,
  },

  device: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
