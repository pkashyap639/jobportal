const express = require("express");
const mongoose = require("mongoose");

const test = require("./controller/test");
var path = require("path");
var bodyParser = require("body-parser");
const User = require("./models/User");
const uri =
  "mongodb+srv://pkashyap148:jobpassword@jobportal.icauweq.mongodb.net/users?retryWrites=true&w=majority&appName=jobportal";
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

const db = mongoose.connection;
db.once("open", function () {
  console.log("We are connected");
});
