const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  dob: {
    type: String,
  },
  gender: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
