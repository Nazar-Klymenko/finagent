import asyncHandler from "helpers/asyncHandler.js";
import createError from "http-errors";
import User from "models/user.js";

export const SettingsGet = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.currentUser.uid);

  if (!user) {
    throw createError.Unauthorized();
  }
  res.send({
    fullName: user.fullName,
    phone: user.phone,
  });
});

export const settingsUpdate = asyncHandler(async (req, res) => {
  const { fullName, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.currentUser.uid,
    {
      fullName: fullName,
      phone: phone,
    },
    {
      new: true,
    }
  );

  if (!user) throw createError.Unauthorized("Wrong user");

  res.status(200).send({
    user,
  });
});
