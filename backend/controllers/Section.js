const Course = require("../models/Course");

const Section = require("../models/Section");

// createSection handler function

exports.createSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, courseId } = req.body;
    // data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "SectionName and Course Id are not found",
      });
    }

    // create section
    const newSection = await Section.create({ sectionName });
    // create section ki id ko insert karo course me

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      //HW: use populate to replace section/subsection both in the updatedCourseDetails
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // return res
    return res.status(200).json({
      success: true,
      message: "Section Created Succesfully!",
      updatedCourseDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed for creating section",
    });
  }
};

// update a section
exports.updateSection = async (req, res) => {
  try {
    // section name ko update karna ha
    // section name fetch kar ka lao
    const { sectionName, sectionId } = req.body;
    // data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "section fields are required",
      });
    }
    // update data
    const updateSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    // return res
    return res.status(200).json({
      success: true,
      message: updateSection,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed for Updating a section",
    });
  }
};

//delete section

exports.deleteSection = async (req, res) => {
  try {
    // data fetch
    // const {sectionId} = req.body
    const { sectionId } = req.params;
    // delete
    await Section.findByIdAndDelete({ sectionId });
    //TODO: do we need to delete the entry from the course schema
    // return res
    return res.status(200).json({
      success: true,
      message: "Section is deleted successfuly!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed for Deleting a Section",
    });
  }
};
