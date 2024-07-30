const express = require("express");
const mongoose = require("mongoose");

const job = require("./controller/Job");
const jobPosting = require("./controller/JobPosting");
const application = require("./controller/Application");
var path = require("path");
var bodyParser = require("body-parser");
const User = require("./models/User");
const PageController = require("./controller/PageController");
// const uri =
//   "mongodb+srv://pkashyap148:jobpassword@jobportal.icauweq.mongodb.net/users?retryWrites=true&w=majority&appName=jobportal";

//Paulo's connection string -> as I've applied some changes the strutucutre, please use this database
const uri = "mongodb+srv://lambton:3AXw2JI4C2qklMtW@jobapp.nzkszzx.mongodb.net/job_app";

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));

// Function to convert datetime to "x hours ago"
function timeAgo(date) {
  const now = new Date();
  const then = new Date(date);
  const diff = now - then; // Difference in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // Approximation
  const years = Math.floor(days / 365); // Approximation

  if (years > 0) {
      return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (weeks > 0) {
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  } else if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
      return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  }
}

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'static')));
// Middleware to make the timeAgo function available in all EJS templates
app.use((req, res, next) => {
  res.locals.timeAgo = timeAgo;
  next();
});

// const u = new User({
//   username: "123",
//   email: "123",
//   password: "PASS",
//   role: "employer",
// });
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

//urls for views
app.get("/", PageController.getHomeContents);
app.get("/about", PageController.about);
app.get("/post-job", PageController.postNewJob);

app.get("/all-jobs", jobPosting.getAllJobs);
app.get("/jobById", jobPosting.getJobById);

app.post("/signup", job.signup);
app.post("/signin", job.signin);

//JobList
// app.get("/joblist", jobPosting.getAllJobs);

app.post("/postjob", jobPosting.addJob);
app.delete("/deleteJob", jobPosting.removeJob);
app.put("/updateJob", jobPosting.updateJob);

//JobApplication
app.get("/job/applicants", application.getApplicationsByJob);
app.get("/appliedJobs/", application.getApplicationByUser);
app.post("/apply", application.apply);
app.put("/application/updatestatus", application.changeStatus);

const db = mongoose.connection;
db.once("open", function () {
  console.log("We are connected");
});

app.listen(3000, () => {
  console.log("Server Running Fine");
});
