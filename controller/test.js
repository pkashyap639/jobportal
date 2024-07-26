const User = require("../models/User");
const mongoose = require("mongoose");

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
