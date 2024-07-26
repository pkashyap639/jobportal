const mongoose = require("mongoose");
const Resume = require("./Resume");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["job_seeker", "employer"] },
  resume: Resume,
});

module.exports = mongoose.model("User", userSchema);
