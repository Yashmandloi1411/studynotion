const mongoose = require("mongoose");

const category = require("../models/category");

// createcategory handler
exports.createcategory = async (req, res) => {
  try {
    // name, descr of tag req,body
    const { name, description } = req.body;

    // validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const CategoryDetails = await category.create({
      name: name,
      description: description,
    });
    console.log(CategoryDetails);

    return res.status(200).json({
      success: true,
      message: "Categorys Created Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.staus(500).json({
      success: false,
      message: err.message,
    });
  }
};

// showAllCategory Handlers

exports.showAllCategory = async (req, res) => {
  try {
    const AllCategory = await category.find(
      {},
      { name: true, description: true }
    );
    return res.status(200).json({
      success: true,
      message: "Successfully find All Category",
      data: AllCategory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// categoryPageDetails handler

exports.categoryPageDetails = async (req, res) => {
  try {
    // get category id
    const { categoryId } = req.body;
    // get courses for specified categoryId
    const selectedCategory = await category
      .findById(categoryId)
      .populate("courses")
      .exec();

    // validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }
    // get courses for different category
    const differentCategories = await category
      .find({
        _id: { $ne: categoryId },
      })
      .populate("course")
      .exec();
    // get top selling course
    //HW
    // return res
    return res.status(500).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
