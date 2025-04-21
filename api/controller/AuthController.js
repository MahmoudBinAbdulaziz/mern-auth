const User = require("../models/User");
const bcryptjs = require("bcryptjs");
exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  console.log(req.body);
};
exports.google = async (req, res, next) => {
  console.log(req.body);
};
exports.logOut = async (req, res, next) => {
  console.log(req.body);
};
