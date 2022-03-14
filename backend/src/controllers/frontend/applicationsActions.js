import Application from "models/application.js";
import User from "models/application.js";
import asyncHandler from "helpers/asyncHandler.js";
import createError from "http-errors";
import { PaginationHelper } from "helpers/paginationHelper";

export const getAllAplications = asyncHandler(async (req, res) => {
  let { category } = req.params;
  let { page, size } = req.query;
  const { skip, limit } = PaginationHelper(page, size);

  let filters = {
    user_id: req.currentUser.uid,
    category: category,
    archived: false,
  };

  let applications = await Application.find(
    filters,
    "_id user_id user status type category createdAt updatedAt"
  )
    .populate("user")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  let maximumPages = await Application.find(filters).countDocuments();
  maximumPages = Math.ceil(maximumPages / size);

  let data = { applications, maximumPages };
  res.send(data);
});

export const getSpecificApplication = asyncHandler(async (req, res) => {
  const data = await Application.findOne({
    _id: req.params.id,
    user_id: req.currentUser.uid,
  }).populate("user");

  if (!data) {
    throw createError.Forbidden();
  } else if (data.length === 0) {
    throw createError.Forbidden();
  }
  res.send(data);
});

export const archiveApplication = asyncHandler(async (req, res) => {
  await Application.findByIdAndUpdate(req.params.id, {
    archived: true,
  });

  res.status(200).send({ message: "application updated successfully" });
});
