import ActivityLog from "../model/ActivityLog.js";

import { successResponse, errorResponse } from "../utils/response.js";

export const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("adminId", "name email role")
      .sort({
        createdAt: -1,
      });

    return successResponse(
      res,

      "Activity logs fetched",

      logs,
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
