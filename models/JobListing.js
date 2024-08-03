const mongoose = require("mongoose");

const joblistingSchema = new mongoose.Schema({
  // employerId: { type: mongoose.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  email: {type: String, required: true},
  location: { type: String, required: true },
  job_type: {type: String, required: true},
  description: { type: String, required: true },
  salary: { type: Number, required: true },
  company_logo: { type: String, required: true },
  company_name: { type: String, required: true },
  company_website: { type: String, required: false },
  listingDate: {type: Date, default: Date.now},
  responsibilities: {type: String, required: true},
  education_experience: {type: String, required: true},
  benefits: {type: String, required: true},
  deadline: {
    type: Date,
    default: () => new Date(Date.now() + 3600 * 24 * 7 * 1000)
  },
  vacancy: { type: Number, required: true },
  years_experience: { type: String, required: true }
});

module.exports = mongoose.model("JobListing", joblistingSchema);
