const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");

const Course = require("../models/Course");
const User = require("../models/User");

const mailSender = require("../utils/mailSender");

// mail template be require karo

// capture the payment and initiate the Razorpay order

exports.capturePayment = async (req, res) => {
  try {
    // get course id & user id
    const { course_id } = req.body;

    const userId = req.user.id;

    // validation
    if (!course_id) {
      return res.status(400).json({
        success: false,
        message: "Invalid course_id",
      });
    }
    // valid courseDetails
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.status(400).json({
          success: false,
          message: "course is Not found",
        });
      }
      // user already pay for the same course

      // conversion string id to objid
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "Student is alredy enrolled",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "ERR in course finding",
      });
    }
    // order creted
    const amount = course.price;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId: course_id,
        userId,
      },
    };
    try {
      // initiate payment using razorpay
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);

      // return res
      return res.status(200).json({
        success: true,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: "Could not initiate order",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failde",
    });
  }
};

// verify the signature of razorpay and server

exports.verifySignature = async (req, res) => {
  const webhookSecret = "123456";

  const signature = req.headers["x-razorpay-signature"];
  // 3 step process
  // step:1
  const shasum = crypto.createHmac("sha256", webhookSecret);
  // step:2
  shasum.update(JSON.stringify(req.body));
  // step:3
  const digest = shasum.digest("hex");

  // match signature and digest
  if (signature === digest) {
    console.log("Payment is Authorized");

    // ab course and user id frontend sa nhi arhi ha
    // to ap req.body ya header use nhi karsatc ya razorpaya sa arhi ha
    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      // fulfil the action

      // find the course id and enroll the student in it
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not found",
        });
      }

      console.log(enrolledCourse);

      // find the student and add the course to their list enrolled courses me

      const enrolledStudent = await User.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      Console.log(enrolledStudent);

      //  mail send kardo confirmation vala

      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulation, you are onboarder into a new course study notion"
      );
      console.log(emailResponse);
      return res.status(200).json({
        success: true,
        message: "Signatured vefied and course Added ",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Course not found",
      });
    }
  } else {
    return res.status(500).json({
      success: false,
      message: "Invalid request",
    });
  }
};
