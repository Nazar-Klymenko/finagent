import User from "models/user";
import createError from "http-errors";
import { asyncHandler } from "helpers/asyncHandler";
import { pagination } from "helpers/pagination";

export const allUsers = asyncHandler(async (req, res) => {
  let { page, size } = req.query;
  let { limit, skip } = pagination(page, size);
  let query = {};

  console.log(skip, limit);
  const users = await User.find(query, {
    password: 0,
    __v: 0,
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  let maximumPages = await User.find(query).countDocuments();
  maximumPages = Math.ceil(maximumPages / size);
  res.status(200).send({ users, maximumPages });
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
