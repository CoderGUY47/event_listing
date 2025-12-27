require("dotenv").config();
const { sendOTPEmail } = require("./utils/emailService");

// Test email sending
const testEmail = async () => {
  console.log("Testing email service...");
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log(
    "EMAIL_PASSWORD:",
    process.env.EMAIL_PASSWORD ? "***SET***" : "NOT SET"
  );

  try {
    const result = await sendOTPEmail(
      "p.q.zaar@gmail.com",
      "Test User",
      "123456"
    );
    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

testEmail();
