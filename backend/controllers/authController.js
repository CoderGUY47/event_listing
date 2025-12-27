const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { generateOTP, sendOTPEmail } = require("../utils/emailService");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      verificationOTP: otp,
      otpExpires: otpExpires,
    });

    // Send OTP email
    const emailSent = await sendOTPEmail(email, name, otp);

    if (!emailSent) {
      return res
        .status(500)
        .json({ message: "Failed to send verification email" });
    }

    res.status(201).json({
      success: true,
      message:
        "Registration successful! Please check your email for the OTP code.",
      userId: user.userId,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email }).select(
      "+verificationOTP +otpExpires"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    if (!user.verificationOTP || !user.otpExpires) {
      return res
        .status(400)
        .json({ message: "No OTP found. Please request a new one." });
    }

    if (user.otpExpires < new Date()) {
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
    }

    if (user.verificationOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP code" });
    }

    // Mark as verified and clear OTP
    user.isVerified = true;
    user.verificationOTP = undefined;
    user.otpExpires = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.verificationOTP = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP email
    const emailSent = await sendOTPEmail(email, user.name, otp);

    if (!emailSent) {
      return res
        .status(500)
        .json({ message: "Failed to send verification email" });
    }

    res.status(200).json({
      success: true,
      message: "OTP has been resent to your email",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide an email and password" });
    }

    // Check for user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email first" });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Google Login
// @route   POST /api/auth/google
// @access  Public
exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, sub, picture } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
        avatar: picture,
        isVerified: true, // Google users are auto-verified
        password: Math.random().toString(36).slice(-10),
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ message: "Google login failed" });
  }
};

// @desc    Update user profile & avatar
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update name if provided
    if (req.body.name) {
      user.name = req.body.name;
    }

    // Update avatar if file provided
    if (req.file) {
      // If user has an old avatar (that is locally uploaded), delete it
      if (
        user.avatar &&
        user.avatar.startsWith(process.env.BASE_URL || "http://localhost:5000")
      ) {
        const oldAvatarPath = user.avatar.split("/uploads/")[1];
        const fs = require("fs");
        const path = require("path");
        const filePath = path.join(__dirname, "../uploads", oldAvatarPath);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      // Set new avatar URL
      // Use BASE_URL from env or default to localhost
      const baseUrl = process.env.BASE_URL || "http://localhost:5000";
      user.avatar = `${baseUrl}/uploads/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete user account
// @route   DELETE /api/auth/profile
// @access  Private
exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      userId: user.userId,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isVerified: user.isVerified,
    },
  });
};
