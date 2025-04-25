const express = require("express");
const router = express.Router();

// controller import for course

// course controllers Import
const {
  CreateCourse,
  getAllCourse,
  getallCourseDetails,
} = require("../controllers/Course");

// section controller import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// subsection controller ko import

const {
  createSubSection,
  updateSubSection,
  deleteSubsection,
} = require("../controllers/Subsection");

// rating and review import
const {
  createRating,
  getAvgRating,
  getAllRatingAndReview,
} = require("../controllers/RatingAndReview");

const {
  createcategory,
  showAllCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// import middleware

const {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
} = require("../middlewares/auth");

// routes
// course ka routes
// course can only be created by instructor

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

router.post("/createCourse", auth, isInstructor, CreateCourse);
router.post("/getAllCourses", getAllCourse);
router.post("/getCourseDetails", getallCourseDetails);

// ********************************************************************************************************
//                                      section routes
// *********************************************************************

router.post("/addSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);

// ********************************************************************************************************
//                                      subsection routes
// *********************************************************************

router.post("/addSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubsection", auth, isInstructor, deleteSubsection);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// category can only be created by admin

router.post("/createcategory", auth, isAdmin, createcategory);
router.get("/showAllCategory", auth, showAllCategory);
router.get("/getcategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
// rating and reviwe ka route

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAvgRating", getAvgRating);
router.get("/getAllRatingAndReview", getAllRatingAndReview);

module.exports = router;
