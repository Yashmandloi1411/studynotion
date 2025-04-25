const RatingAndReview = require("../models/RatingAndReview");

const Course = require("../models/Course");

const User = require("../models/User");

// create Rating
exports.createRating = async (req, res) => {
  try {
    // get user id
    const userId = req.user.id;
    // fetch the data from req body
    const { courseId, rating, review } = req.body;
    // check if user is enrolled or not

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Student is not enrolled!",
      });
    }

    // check if user already review the courser
    const alreadyReviewed = await RatingAndReview.findOne(
      { course: courseId },
      { user: userId }
    );

    if (!alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "Course is already review",
      });
    }

    // create rating and review
    const createRating = await RatingAndReview.create({
      course: courseId,
      user: userId,
      rating,
      review,
    });

    // update course with this rating and review

    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          ratingandReviews: createRating,
        },
      },
      { new: true }
    );

    // return res

    return res.status(200).json({
      success: true,
      message: "Rating and review done ",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: true,
      message: "Err in giving Rating and review ",
    });
  }
};

// get Average Rating

exports.getAvgRating = async (req, res) => {
  try {
    // get courseId
    const { courseId } = req.body;

    // cal avg rating

    const result = await RatingAndReview.aggregate(
      {
        $match: {
          course: new mongoose.Types.objectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      }
    );

    if (result.length > 0) {
      // return rating
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    // if no ratig and review exist
    return res.status(200).json({
      success: true,
      message: "Average Rating is 0, no rating given till now",
      averageRating: 0,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: true,
      message: "Err in Finding AVG of Rating&review ",
    });
  }
};

// Get all Rating
exports.getAllRatingAndReview = async (req, res) => {
  try {
    const allReview = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: false,
      message: "ALL Rating&review are fetch successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: true,
      message: "Err in Fetching all Rating&review ",
    });
  }
};

// exports.getAllRatingAndReview = async (req, res) => {
//   try {
//     // course id
//     const { courseId } = req.body;

//     //validation
//     if (!courseId) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid course id",
//       });
//     }

//     await RatingAndReview.findById({ courseId });

//     return res.status(200).json({
//       success: false,
//       message: "ALL Rating&review are fetch successfully",
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(200).json({
//       success: true,
//       message: "Err in Fetching all Rating&review ",
//     });
//   }
// };
