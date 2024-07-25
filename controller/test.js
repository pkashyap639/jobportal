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
