const mongoose = require("mongoose");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expire: 300,
  },
  otp: {
    type: String,
    required: true,
  },
});

// a function -> to send email

// iska kam ya ha ki OTP.create sa phala mail send kardega

async function sendVerification(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email from StudyNotion",
      emailTemplate(otp)
    );
    console.log("Email Send Successfully", mailResponse);
  } catch (err) {
    console.log("error occur in mail send:", err);
  }
}

// pre middleware is used
// db ma entry create karna ka phala otp bhjana ha
otpSchema.pre("save", async function (next) {
  await sendVerification(this.email, this.otp);
});

module.exports = mongoose.model("OTP", otpSchema);
