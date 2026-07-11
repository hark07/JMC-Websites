import Admin from "../model/Admin.js";
import { verifyAccessToken } from "../services/jwtService.js";
import { errorResponse } from "../utils/response.js";

const authMiddleware = async (req, res, next) => {
  try {
    // ===============================
    // Get Authorization Header
    // ===============================

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, "Access token required", 401);
    }

    // ===============================
    // Extract Token
    // ===============================

    const token = authHeader.split(" ")[1];

    // ===============================
    // Verify Token
    // ===============================

    const decoded = verifyAccessToken(token);

    // ===============================
    // Find Admin
    // ===============================

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return errorResponse(res, "Admin not found", 401);
    }

    // ===============================
    // Soft Delete Check
    // ===============================

    if (admin.isDeleted) {
      return errorResponse(res, "Account has been deleted", 403);
    }

    // ===============================
    // Status Check
    // ===============================

    if (admin.status !== "ACTIVE") {
      return errorResponse(res, "Account is inactive", 403);
    }

    // ===============================
    // Attach Admin
    // ===============================

    req.admin = admin;

    next();
  } catch (error) {
    return errorResponse(res, "Invalid or expired access token", 401);
  }
};

export default authMiddleware;
