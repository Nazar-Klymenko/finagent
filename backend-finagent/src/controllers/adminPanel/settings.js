import Admin from "models/admin.js";
import createError from "http-errors";
import asyncHandler from "helpers/asyncHandler.js";

export const changeEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const existingEmail = await Admin.findOne({ email: email });

  if (existingEmail) {
    throw createError.Conflict(
      `Admin with such email (${email}) already exists`
    );
  }

  const admin = await Admin.findByIdAndUpdate(req.currentUser.uid, {
    email: email,
  });

  if (!admin) throw createError.Unauthorized("Wrong admin");

  res.status(200).send({
    message: "Settings updated successfully",
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const admin = await Admin.findById(req.currentUser.uid);
  if (!admin) throw createError.Unauthorized("Wrong admin");

  const isMatch = await admin.isValidPassword(oldPassword);
  if (!isMatch) throw createError.Conflict("Invalid old password");

  admin.password = newPassword;
  await admin.save();

  res.status(200).send({
    message: "Settings updated successfully",
  });
});

export const deleteAdmin = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  try {
    const admin = await Admin.findById(req.currentUser.uid);
    if (!admin) throw createError.Unauthorized();

    const isMatch = await admin.isValidPassword(password);
    if (!isMatch) throw createError.Conflict("Invalid old password");

    await Admin.findByIdAndDelete(req.currentUser.uid);
  } catch (error) {
    next(error);
  }
});

export const getSettingsAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.currentUser.uid);

  if (!admin) {
    throw createError.Unauthorized();
  }
  res.send({
    name: admin.name,
    surname: admin.surname,
    phone: admin.phone,
  });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const { name, surname, phone } = req.body;
  const admin = await Admin.findByIdAndUpdate(
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

  if (!admin) throw createError.Unauthorized("Wrong admin");

  res.status(200).send({
    admin,
  });
});
