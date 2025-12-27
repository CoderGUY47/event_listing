const jwt = require("jsonwebtoken");

/**
 * Decode a JWT token without verification
 * @param {string} token - JWT token to decode
 * @returns {object} Decoded token payload
 */
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token to verify
 * @returns {object} Verified and decoded token payload
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

/**
 * Get token expiration date
 * @param {string} token - JWT token
 * @returns {Date} Expiration date
 */
const getTokenExpiration = (token) => {
  const decoded = decodeToken(token);
  if (decoded && decoded.exp) {
    return new Date(decoded.exp * 1000);
  }
  return null;
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if expired
 */
const isTokenExpired = (token) => {
  const expiration = getTokenExpiration(token);
  if (!expiration) return true;
  return expiration < new Date();
};

module.exports = {
  decodeToken,
  verifyToken,
  getTokenExpiration,
  isTokenExpired,
};
