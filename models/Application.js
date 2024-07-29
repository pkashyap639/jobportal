const mongoose = require("mongoose");
const User = require("./User");
const JobListing = require("./JobListing")

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.ObjectId, ref: "JobListing", required: true },
  userId: { type: mongoose.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "cancelled", "approved"],
    default: "pending"
  },
  applicationDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Application", applicationSchema);
