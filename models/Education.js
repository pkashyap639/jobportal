const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  year: { type: Number, required: true },
});

module.exports = mongoose.model("Education", educationSchema);
