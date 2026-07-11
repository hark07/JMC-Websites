import Joi from "joi";

// ======================================
// ROLES
// ======================================

const roles = ["SUPER_ADMIN", "ADMIN"];

// ======================================
// ADMIN STATUS
// ======================================

const status = ["ACTIVE", "INACTIVE"];

// ======================================
// CREATE ADMIN
// ======================================

export const createAdminValidator = Joi.object({
  name: Joi.string().min(3).max(50).required(),

  email: Joi.string().email().required(),

  phone: Joi.string().min(10).max(15).required(),

  password: Joi.string().min(6).max(30).required(),

  role: Joi.string()
    .valid(...roles)
    .optional(),

  permissions: Joi.array().items(Joi.string()).optional(),

  status: Joi.string()
    .valid(...status)
    .optional(),
});

// ======================================
// UPDATE ADMIN
// ======================================

export const updateAdminValidator = Joi.object({
  name: Joi.string().min(3).max(50).optional(),

  email: Joi.string().email().optional(),

  phone: Joi.string().min(10).max(15).optional(),

  role: Joi.string()
    .valid(...roles)
    .optional(),

  permissions: Joi.array().items(Joi.string()).optional(),

  status: Joi.string()
    .valid(...status)
    .optional(),
}).min(1);

// ======================================
// UPDATE PROFILE
// ======================================

export const updateProfileValidator = Joi.object({
  name: Joi.string().min(3).max(50).optional(),

  phone: Joi.string().min(10).max(15).optional(),
}).min(1);
