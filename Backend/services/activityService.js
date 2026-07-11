import ActivityLog from "../model/ActivityLog.js";

export const createActivityLog = async ({
  adminId,

  action,

  description,

  req,
}) => {
  await ActivityLog.create({
    adminId,

    action,

    description,

    ipAddress: req.ip,

    device: req.headers["user-agent"],
  });
};
