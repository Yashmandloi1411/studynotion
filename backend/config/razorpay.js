const Razorpay = require("razorpay");

exports.instance = new Razorpay({
  key_id: process.env.Razorpay_key,
  key_secret: process.env.Razorpay_SECRET,
});
