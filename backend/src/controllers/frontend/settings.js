import createError from "http-errors";
import asyncHandler from "helpers/asyncHandler.js";
import User from "models/user.js";
import Application from "models/application";

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

  res.status(200).send({
    message: "Settings updated successfully",
  });
});

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
