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
      return res.status(401).json({ error: "Invalid Email or Password" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid Email or Password" });
    }

    // Create a JWT token
    const token = jwt.sign({ email: email, role: user.role }, key, {
      expiresIn: "1h",
    });

    // Set a cookie with the user data
    res.cookie('user_object', JSON.stringify({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    }), { httpOnly: true, maxAge: 3600000 }); // Cookie expires in 1 hour

    res.status(200).json({ message: "Signin successful", redirectTo: `/profile?username=${user.username}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: "Logout successful", redirectTo: '/login' });
};

exports.gotoadmin = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, key);
    if (decoded.role === "admin") {
      res.status(200).json({ message: "Admin access granted", redirectTo: "/admin" });
    } else {
      res.status(403).json({ error: "Forbidden" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
