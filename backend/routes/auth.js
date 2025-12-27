const express = require("express");
const router = express.Router();
const {
  register,
  login,
  googleLogin,
  verifyOTP,
  resendOTP,
  updateProfile,
  deleteAccount,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);

// Profile routes
router.put("/profile", protect, upload.single("avatar"), updateProfile);
router.delete("/profile", protect, deleteAccount);

module.exports = router;
