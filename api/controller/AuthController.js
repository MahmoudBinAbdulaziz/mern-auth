const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");
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
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token itself expires in 1 day
    );
    const { password: hashedPassword, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
exports.google = async (req, res, next) => {
  console.log(req.body);
};
exports.logOut = async (req, res, next) => {
  console.log(req.body);
};
