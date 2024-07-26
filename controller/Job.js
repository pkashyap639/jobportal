const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const key = "asdlkjfalsdbflabfawfafnkwabfalksdbfawfiwaubfe";

exports.allusers = async (req, res) => {
  try {
    //res.status(201).json(await Student.find());
    var userList = await User.find();
    res.status(201).json(userList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.signup = async (req, res) => {
  try {
    var user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid Email" });
    }
    if (user.password !== password) {
      res.status(401).json({ error: "Invalid Password" });
    }
    const token = jwt.sign({ email: email }, key, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
