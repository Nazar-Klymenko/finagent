import User from "models/user.js";
import createError from "http-errors";
import asyncHandler from "helpers/asyncHandler.js";

export const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find(
    {},
    {
      password: 0,
      __v: 0,
    }
  );

  res.status(200).send(users);
});

export const SpecificUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id, {
    password: 0,
    __v: 0,
  });

  if (!user) {
    throw createError.BadRequest();
  }

  res.status(200).send({ user });
});
