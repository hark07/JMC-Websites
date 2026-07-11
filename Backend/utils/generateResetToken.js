import crypto from "crypto";

/**
 * ==========================================
 * Generate Secure Reset Token
 * ==========================================
 */

export const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

/**
 * ==========================================
 * Generate Token Expiry
 * Default: 15 Minutes
 * ==========================================
 */

export const generateResetTokenExpiry = (minutes = 15) => {
  return new Date(Date.now() + minutes * 60 * 1000);
};

/**
 * ==========================================
 * Generate Complete Reset Data
 * ==========================================
 */

export const createPasswordResetToken = (minutes = 15) => {
  return {
    token: generateResetToken(),
    expiresAt: generateResetTokenExpiry(minutes),
  };
};

/**
 * ==========================================
 * Check Token Expiry
 * ==========================================
 */

export const isResetTokenExpired = (expiresAt) => {
  return new Date() > new Date(expiresAt);
};

/**
 * ==========================================
 * Remaining Token Time (Seconds)
 * ==========================================
 */

export const getRemainingTime = (expiresAt) => {
  const remaining = Math.floor((new Date(expiresAt) - new Date()) / 1000);

  return remaining > 0 ? remaining : 0;
};
