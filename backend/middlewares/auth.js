const JWT = require("jsonwebtoken");
require("dotenv").config();

// User

const User = require("../models/User");

// auth

// auth middlewares ka under ap jwt token check
// karte the if miljaya to
// 3 way
exports.auth = async (req, res, next) => {
  try {
    // extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    console.log("Token received:", token);

    // if token misising then return res
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is Missing",
      });
    }
    // verify the token
    try {
      // decode == payload bat ekk hi ha a
      const decode = JWT.verify(token, process.env.JWT_SECRET);
      console.log("decode ka data :", decode);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: " Something went wrong while verification of token",
      });
    }
    next();
  } catch (errr) {
    return res.status(400).json({
      success: false,
      message: "something went wrong while validating the token",
    });
  }
};

// isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(200).json({
        success: false,
        message: "This is a protected route for student only",
      });
    }
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "User role can't be verified ,plz try again!",
    });
  }
};

// isInstructor

exports.isInstructor = async (req, res, next) => {
  try {
    console.log("ACCOUNT TYPE KI VALUE instructor:", req.user.accountType);
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor only",
      });
    }
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Instructor role can't be verified ,plz try again!",
    });
  }
};

// isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    console.log("ACCOUNT TYPE KI VALUE:", req.user.accountType);
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
      });
    }
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Admin role can't be verified ,plz try again!",
    });
  }
};
