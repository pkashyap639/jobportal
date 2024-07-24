const express = require("express");
const mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();

const uri =
  "mongodb+srv://pkashyap148:jobpassword@jobportal.icauweq.mongodb.net/?retryWrites=true&w=majority&appName=jobportal";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
