const express = require("express");

const router = express.Router();

// import controler

const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  updateDisplayPicture,
} = require("../controllers/Profile");

// middleware

const {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
} = require("../middlewares/auth");
// router ko map karo

router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteProfile", auth, deleteAccount);
router.get("/getUserDetails", auth, getAllUserDetails);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
module.exports = router;
