import createError from "http-errors";
import User from "models/user.js";
import asyncHandler from "helpers/asyncHandler.js";

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.currentUser.uid, {
    isActive: true,
  });
  res.status(200).send({ message: "account activated successfully" });
});

export const confirmRestorePassword = async (req, res, next) => {
  const { password } = req.body;
  try {
    const user = await User.findById(req.currentUser.uid);
    if (!user) {
      throw createError.BadRequest();
    }
    user.password = password;
    await user.save();

    res.status(200).send({ message: "user password updated successfully" });
  } catch (error) {
    if (error.name === "ValidationError")
      return next(createError.BadRequest("Wrong password format"));
    next(error);
  }
};
