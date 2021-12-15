import asyncHandler from "@helpers/asyncHandler.js";
import Application from "@models/application";
import User from "@models/user.js";
import createError from "http-errors";

export const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.currentUser.uid);
  await Application.updateMany(
    { user_id: req.currentUser.uid },
    { $set: { archived: true } }
  );

  res.status(200).send({ message: "user deleted successfully" });
});

export const getSettings = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.currentUser.uid);

  if (!user) {
    throw createError.Unauthorized();
  }
  res.send({
    fullName: user.fullName,
    phone: user.phone,
  });
});

export const updateSettings = asyncHandler(async (req, res, next) => {
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
