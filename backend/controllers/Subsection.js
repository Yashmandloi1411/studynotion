const SubSection = require("../models/SubSection");

const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { findByIdAndDelete } = require("../models/User");

// createSubsection handler

exports.createSubSection = async (req, res) => {
  try {
    // data fetch
    // sectionId: hamna khud se send kari ha
    const { sectionId, title, timeDuration, description } = req.body;

    // vedio to file sa milagu
    const video = req.files.video;

    // data validation
    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required in subsection creation!",
      });
    }

    console.log(video);

    // upload vedio to cloudinary

    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // subsection ko bana kar uski id ko push karna ha section ka under

    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    // update section with the sub section id  in ObjectId
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    );
    //HW: log updated section here, after addign populate query

    // return res
    return res.status(200).json({
      success: true,
      message: "Successfully create a subsection",
      updatedSection,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create a subsection",
      error: err.message,
    });
  }
};

//HW: updateSubSection

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, title, timeDuration, description } = req.body;

    // vedio to file sa milagu
    const vedio = req.files.vedioUrl;

    // data validation
    if (!sectionId || !title || !timeDuration || !description || !vedioUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields are required in subsection!",
      });
    }

    // update subsection
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      sectionId,
      { title },
      { timeDuration },
      { description },
      { new: true }
    );

    return res.status(200).json({
      success: false,
      message: "Subsection is Updated successfully",
      updatedSubSection,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to Update a subsection",
    });
  }
};

//HW: deleted Subsection

exports.deleteSubsection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    await Section.findByIdAndDelete({ sectionId });

    return res.status(200).json({
      success: true,
      message: "Subsection is deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete a subsection",
    });
  }
};
