const mongoose = require("mongoose");
const Resume = require("./Resume");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, index:{unique: true}},
  email: { type: String, required: true, index:{unique: true} },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["job_seeker", "employer"] },
  resume: Resume,
});

const User = mongoose.model("User", userSchema);
User.createIndexes(); // Ensure indexes are created -- will fail if current database has duplicated indexes
module.exports = User;


