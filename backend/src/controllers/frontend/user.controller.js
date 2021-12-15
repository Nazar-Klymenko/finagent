import asyncHandler from "helpers/asyncHandler.js";
import createError from "http-errors";
import Application from "models/application";
import User from "models/user.js";

export const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.currentUser.uid);
  await Application.updateMany(
    { user_id: req.currentUser.uid },
    { $set: { archived: true } }
  );

  res.status(200).send({ message: "success" });
});
