const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/error");
exports.updateUser = async (req, res, next) => {
  // console.log(req.body);

  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account!"));
  }
  try {
    const updates = {
      username: req.body.username,
      email: req.body.email,
      profilePicture: req.body.profilePicture,
    };

    if (req.body.password) {
      updates.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can delete only your account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(error);
  }
};
