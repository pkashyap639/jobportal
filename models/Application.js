const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  userId: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "cancelled", "approved"],
    default: "pending"
  },
});

module.exports = mongoose.model("Application", applicationSchema);
