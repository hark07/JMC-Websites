import { errorResponse } from "../utils/response.js";

// ======================================
// VALIDATION MIDDLEWARE
// ======================================

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((item) => ({
        field: item.path.join("."),
        message: item.message,
      }));

      return errorResponse(res, "Validation failed", 400, errors);
    }

    next();
  };
};

export default validationMiddleware;
