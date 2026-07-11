import jwt from "jsonwebtoken";

// Generate Access Token

export const generateAccessToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      role: admin.role,
      permissions: admin.permissions,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: process.env.JWT_EXPIRE || "15m",
    },
  );
};

// Generate Refresh Token

export const generateRefreshToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
    },

    process.env.JWT_REFRESH_SECRET,

    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d",
    },
  );
};

// Verify Access Token

export const verifyAccessToken = (token) => {
  return jwt.verify(
    token,

    process.env.JWT_SECRET,
  );
};

// Verify Refresh Token

export const verifyRefreshToken = (token) => {
  return jwt.verify(
    token,

    process.env.JWT_REFRESH_SECRET,
  );
};
