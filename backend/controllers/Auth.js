const mongoose = require("mongoose");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

const OTP = require("../models/OTP");

const mailSender = require("../utils/mailSender");

const Profile = require("../models/Profile");

// send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // check user alredy exist
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already register",
      });
    }

    // otp generate

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    console.log("OTP generated:", otp);

    // otp unique hona chiya if otp exist ha to vapas bhaj dega

    const result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      result = await OTP.findOne({ otp: otp });
    }

    // apko otp ki entry db me kari ha

    const otpPayload = { email, otp };

    // const otpBody = await OTP.create({ otpPayload });

    const otpBody = await OTP.create(otpPayload);

    console.log("OTP Body", otpBody);

    return res.status(200).json({
      success: true,
      message: "Otp send successfully",
      otp,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: " Failed to send Otp:",
    });
  }
};

// signUp

exports.signUp = async (req, res) => {
  try {
    // data fetch from req ki body
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      otp,
      accountType,
    } = req.body;

    console.log("all data signup:", req.body);
    //user is exist or not

    //validation karlo
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All field are required!",
      });
    }
    //2 password match karlo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirmed password value doesn't matched!",
      });
    }

    //check user already exist or not
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    // find most recent OTP stored for the user
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    console.log("recent otp:", recentOtp);

    // validate otp
    if (recentOtp.length === 0) {
      // otp not found
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      // invalid otp

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hash password

    let hashedpassword;
    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Error in hashing password !",
      });
    }

    // creat a entry of user in DB

    const profileDetails = await Profile.create({
      // starting ma signup karte samay muja in details ki need nhi ha
      // ham user sa nhi mangaga isliya null kardiya
      dob: null,
      gender: null,
      about: null,
      phone: null,
    });

    const user = await User.create({
      email,
      firstName,
      lastName,
      phone,
      password: hashedpassword,
      confirmPassword,
      otp,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // return res
    return res.status(200).json({
      success: true,
      message: "User is created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: " Failed to SignUp:",
    });
  }
};

// login

exports.login = async (req, res) => {
  try {
    // get data from user body

    const { email, password } = req.body;
    // validation data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All field are required for Login, please try again ",
      });
    }
    // user check exist or not
    const userexist = await User.findOne({ email }).populate(
      "additionalDetails"
    );

    if (!userexist) {
      return res.status(401).json({
        success: false,
        message: "User is not register, plz try again",
      });
    }

    // generate JWT, after password matching
    // compare password

    if (await bcrypt.compare(password, userexist.password)) {
      const payload = {
        email: userexist.email,
        id: userexist._id,
        accountType: userexist.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      (userexist.token = token), (userexist.password = undefined);

      // create cookie and send response

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        userexist,
        message: `user Login Success`,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password are not matching",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to Login Enter correct Field:",
    });
  }
};

// changed password

//HOME: TODO

exports.changePassword = async (req, res) => {
  try {
    // get data from req body
    const { email, oldpassword, newpassword, confirmpassword } = req.body;

    if (!email || !oldpassword || !newpassword || !confirmpassword) {
      return res.status(400).json({
        success: false,
        message:
          "ALL fields email, oldpassword,newpassword, confirmpassword required!",
      });
    }

    // check if user is exist

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user is not exist",
      });
    }

    const isMatch = await bcrypt.compare(newpassword, User.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect  old password",
      });
    }

    if (newpassword !== confirmpassword) {
      return res.staus(401).json({
        success: false,
        message: "New password and confirm password do not match!",
      });
    }

    // Hash new password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password in the database
    user.password = hashedPassword;
    await user.save();

    // Send password update email (Assuming sendEmail function exists)
    await sendEmail(
      user.email,
      "Password Updated",
      "Your password has been successfully updated."
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });

    // get oldpassword, new password, confirmNewPassword
    // validation

    // update password  in DB

    // send mail - password Update
    // return response
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update password!",
    });
  }
};
