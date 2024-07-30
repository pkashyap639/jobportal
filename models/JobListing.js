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
  listingDate: {type: Date, default: Date.now}
  
});

module.exports = mongoose.model("JobListing", joblistingSchema);
