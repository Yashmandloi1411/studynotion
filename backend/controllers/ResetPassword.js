const User = require("../models/User");

const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

// reset pass token
exports.resetpasswordToken = async (req, res) => {
  try {
    // email req, body
    const email = req.body.email;
    // validation
    const emailExist = await User.findOne({ email: email });
    if (!emailExist) {
      return res.status(400).json({
        success: false,
        message: "Plz Enter the correct email ",
      });
    }

    // generate token
    const token = crypto.randomUUID();

    // update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetpasswordExpires: new Date(Date.now() + 5 * 60 * 1000),
      },
      { new: true }
    );
    console.log("DETAILS", updatedDetails);
    // create url
    // link generate Backend on port no 4000, frontend port 3000
    const url = `http://localhost:3000/update-password/${token}`;
    // send mail continaing the url

    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link is:${url}`
    );

    // return res

    return res.status(200).json({
      success: true,
      message: "Email Send Successfully Plz check email ",
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      success: false,
      message: "Error in while reset a pssword",
    });
  }
};

// // reset password

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      });
    }
    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      });
    }
    // resetpasswordExpires
    if (!(userDetails.resetpasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    );
    res.json({
      success: true,
      message: `Password Reset Successful`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    });
  }
};
