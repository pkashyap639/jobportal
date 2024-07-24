const mongoose = require("mongoose");
const Experience = require("./Experience");
const Education = require("./Education");

const resumeSchema = new mongoose.Schema({
  skills: [{ type: String, required: true }],
  experience: [Experience],
  education: [Education],
});

module.exports = mongoose.model("Resume", resumeSchema);
