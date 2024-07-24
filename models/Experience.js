const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  duration: { type: String, required: true },
});

module.exports = mongoose.model("Experience", experienceSchema);
