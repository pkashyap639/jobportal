const express = require("express");
const mongoose = require("mongoose");

const job = require("./controller/Job");
const jobPosting = require("./controller/JobPosting");
var path = require("path");
var bodyParser = require("body-parser");
const User = require("./models/User");
const uri =
  "mongodb+srv://pkashyap148:jobpassword@jobportal.icauweq.mongodb.net/users?retryWrites=true&w=majority&appName=jobportal";

//Paulo's test connection string
//const uri = "mongodb+srv://lambton:3AXw2JI4C2qklMtW@jobapp.nzkszzx.mongodb.net/job_app";
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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

app.get("/", job.allusers);
app.post("/signup", job.signup);
app.post("/signin", job.signin);

//JobList
app.get("/joblist", jobPosting.getAllJobs);
app.get("/jobById", jobPosting.getJobById);
app.post("/postjob", jobPosting.addJob);
app.delete("/deleteJob", jobPosting.removeJob);
app.put("/updateJob", jobPosting.updateJob);

const db = mongoose.connection;
db.once("open", function () {
  console.log("We are connected");
});

app.listen(3000, () => {
  console.log("Server Running Fine");
});
