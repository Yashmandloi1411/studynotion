const User = require("../models/User");

const Profile = require("../models/Profile");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// profile create karna ki need nhi ha bcoz apna dummy
// profile  , additiondetails ka name sa banai ha or usma value null h ajust usko update kardo

exports.updateProfile = async (req, res) => {
  try {
    // user data
    const { dob = "", gender, about = "", phone } = req.body;
    // get user id
    const id = req.user.id;

    // user details bcoz apko ya pata nhi ha ki profile ki id kya
    // ha isliya ap userdetails ka under profile id padi hogi usma sa nikalaga

    const userDetails = await User.findById(id);

    const profileId = userDetails.additionalDetails;

    //
    const profileDetails = await Profile.findById(profileId);

    if (!profileDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }
    // update profile
    profileDetails.dob = dob;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.phone = phone;
    // object create kar ka save method ka use karlo
    await profileDetails.save();

    // return res
    return res.status(200).json({
      success: true,
      message: "Profile is Updated Successfully",
      profileDetails,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to update User proifile",
      err: err.message,
    });
  }
};

// deleteAccount
exports.deleteAccount = async (req, res) => {
  try {
    // get id

    console.log("reguest USER:", req.user);
    const id = req.user.id;
    console.log("USER ID:", id);
    // validation
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found ",
      });
    }

    // delete profile
    // profile id Fetch
    // const profileId = user.userDetails;

    await Profile.findByIdAndDelete({ _id: user.userDetails });

    //Todo: HW unenroll user from all enrolled courses
    // delete User
    await User.findByIdAndDelete({ _id: id });

    // return res
    return res.status(200).json({
      success: true,
      message: "User is Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "User Profile is Not deleted",
    });
  }
};

// getAlluseDetails

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.User.id;

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    console.log("THIS IS USER DETAILS");
    console.log(userDetails);

    return res.status(200).json({
      success: true,
      message: "Successfully fetch All user Details",
      data: userDetails,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error while Fetching user All details",
    });
  }
};

// UpdateDisplayPicture

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);

    const updateProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updateProfile,
    });
  } catch (err) {
    console.error(err);
    return res.satus(500).json({
      success: false,
      message: "Error in Updating Display picture",
    });
  }
};

// getEnrolledCourses
