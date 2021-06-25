import createError from "http-errors";
import asyncHandler from "helpers/asyncHandler.js";
import User from "models/user.js";
import Application from "models/user.js";

export const changeEmail = asyncHandler(async (req, res, next) => {
  const { currentPassword, email } = req.body;
  const user = await User.findById(req.currentUser.uid);
  if (!user) throw createError.Unauthorized();

  const isMatch = await user.isValidPassword(currentPassword);
  if (!isMatch) throw createError.Conflict("Invalid password");

  if (user.email == email) {
    throw createError.Conflict(`Your current email is already (${email})`);
  }

  await user.update(req.currentUser.uid, { email: email });

  // user.email = email;
  // await user.save();

  res.status(200).send({
    message: "Settings updated successfully",
  });
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.currentUser.uid);
  if (!user) throw createError.Unauthorized("Wrong user");

  const isMatch = await user.isValidPassword(oldPassword);
  if (!isMatch) throw createError.Conflict("Invalid old password");

  user.password = newPassword;
  await user.save();

  res.status(200).send({
    message: "password updated successfully",
  });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const user = await User.findById(req.currentUser.uid);
  if (!user) throw createError.Unauthorized();

  const isMatch = await user.isValidPassword(password);
  if (!isMatch) throw createError.Conflict("Invalid old password");

  await User.findByIdAndDelete(req.currentUser.uid);
  await Application.deleteMany({ user_id: req.currentUser.uid });

  res.status(200).send({ message: "user deleted successfully" });
});

export const getSettings = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.currentUser.uid);

  if (!user) {
    throw createError.Unauthorized();
  }
  res.send({
    name: user.name,
    surname: user.surname,
    phone: user.phone,
  });
});

export const updateSettings = asyncHandler(async (req, res, next) => {
  const { name, surname, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.currentUser.uid,
    {
      name: name,
      surname: surname,
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
