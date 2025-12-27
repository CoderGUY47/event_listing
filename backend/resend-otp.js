require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const { generateOTP, sendOTPEmail } = require("./utils/emailService");

const resendOTP = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const email = "4gamingtester@gmail.com";
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      process.exit(0);
    }

    console.log("User found:", user.email);
    console.log("Is verified:", user.isVerified);

    // Generate new OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.verificationOTP = otp;
    user.otpExpires = otpExpires;
    await user.save();

    console.log("New OTP generated:", otp);

    // Send email
    const emailSent = await sendOTPEmail(email, user.name, otp);
    console.log("Email sent:", emailSent);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

resendOTP();
