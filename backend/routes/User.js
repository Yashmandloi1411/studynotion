const express = require("express");
const router = express.Router();

// import controller
const {
  resetpasswordToken,
  updatedDetails,
  resetPassword,
} = require("../controllers/ResetPassword");

const {
  sendOTP,
  signUp,
  login,
  changePassword,
} = require("../controllers/Auth");

// middleware
const { auth } = require("../middlewares/auth");

// router ko map karo Auth vala controller sa
router.post("/sendOTP", sendOTP);
router.post("/signUp", signUp);
router.post("/login", login);
router.post("/changePassword", auth, changePassword);

// router ko map with  resetPassword vala  controller
router.post("/reset-password-token", resetpasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
