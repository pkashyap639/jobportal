const mongoose = require("mongoose");

const joblistingSchema = new mongoose.Schema({
  employerId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
});

module.exports = mongoose.model("JobListing", joblistingSchema);
