const mongoose = require("mongoose");

const Course = require("../models/Course");

const Category = require("../models/category");
const User = require("../models/User");

const { uploadImageToCloudinary } = require("../utils/imageUploader");

//createCourse handler function

exports.CreateCourse = async (req, res) => {
  try {
    // Get user ID from request object     // check for instructor id
    const userId = req.user.id;
    //fetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    // get thumbnail
    const thumbnail = req.files.thumbnailImage;
    // Debugging logs
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);
    // validation: Check if all required fields are provided
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
    // if (!status || status === undefined) {
    //   status = "Draft";
    // }
    const courseStatus = status || "Draft";

    // or ya paylod / decode ma padi ha

    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });
    console.log("Instructor Details:", instructorDetails);

    //Todo: verify that userId and instructordetails._id are same and different ?

    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor Details not found",
      });
    }
    // Check if the tag given is valid
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }
    // check given tag is valid or not
    // if frontend se tag aya ha vo valid hi hoga and backend sa aya ha to postman sa ya
    // aya hotga to invalid bi hosta ha

    if (!thumbnail.tempFilePath) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail file is missing tempFilePath",
      });
    }
    // upload Image to cloudinary
    const thubmnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    console.log("Uploaded Thumbnail:", thubmnailImage);

    // entry created for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tag,
      thumbnail: thubmnailImage.secure_url,
      status: status,
      instructions: instructions,
    });

    // add this new course to the user Schema of Instuctor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // Add the new course to the Categories
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    // return res
    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      data: newCourse,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed while creation of course",
      error: err.message,
    });
  }
};

//getallcourse handler function
exports.getAllCourse = async (req, res) => {
  try {
    const allCourse = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingandReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data for all course fetch successfully",
      data: allCourse,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed while Showing All course",
      error: err.message,
    });
  }
};

// getall course details
exports.getallCourseDetails = async (req, res) => {
  try {
    //get id
    const { courseId } = req.body;
    // fetch details based on id
    const allCourseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingandReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "Subsection",
        },
      })
      .exec();

    // validation

    if (!allCourseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course  with ${courseID}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetch course details",
      data: allCourseDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "err while fetch course details",
    });
  }
};
