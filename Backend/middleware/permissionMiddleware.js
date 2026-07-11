import { errorResponse } from "../utils/response.js";

const permissionMiddleware = (...requiredPermissions) => {
  return async (req, res, next) => {
    try {
      // ==========================
      // AUTH CHECK
      // ==========================

      if (!req.admin) {
        return errorResponse(res, "Unauthorized", 401);
      }

      // ==========================
      // ACCOUNT STATUS CHECK
      // ==========================

      if (req.admin.status !== "ACTIVE") {
        return errorResponse(res, "Account inactive", 403);
      }

      // ==========================
      // SUPER ADMIN
      // FULL ACCESS
      // ==========================

      if (req.admin.role === "SUPER_ADMIN") {
        return next();
      }

      // ==========================
      // NO PERMISSION REQUIRED
      // ==========================

      if (requiredPermissions.length === 0) {
        return next();
      }

      // ==========================
      // USER PERMISSIONS
      // ==========================

      const userPermissions = req.admin.permissions || [];

      // ==========================
      // CHECK PERMISSION
      // ==========================

      const hasPermission = requiredPermissions.every((permission) =>
        userPermissions.includes(permission),
      );

      if (!hasPermission) {
        return errorResponse(
          res,

          "Permission denied",

          403,
        );
      }

      next();
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  };
};

export default permissionMiddleware;
