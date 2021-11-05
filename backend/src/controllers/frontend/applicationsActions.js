import Application from "models/application.js";
import User from "models/application.js";
import asyncHandler from "helpers/asyncHandler.js";
import createError from "http-errors";
import { PaginationHelper } from "helpers/paginationHelper";

export const getPreviewApplications = asyncHandler(async (req, res) => {
  let { category, status } = req.params;
  let { page, size } = req.query;

  const { skip, limit } = PaginationHelper(page, size);

  category = category.slice(0, -1);
  let filters = {
    user_id: req.currentUser.uid,
    category: category,
    archived: false,
    status: { $ne: 5 },
  };

  if (status === "ready") {
    filters.status = "5";
  }

  if (category === "archive") {
    delete filters.category;
    delete filters.status;
    filters.archived = true;
  }
  const query = { ...filters };

  const ApplicationList = await Application.find(
    query,
    "_id user_id user status type category createdAt updatedAt"
  )
    .populate("user")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  let maximumPages = await Application.find(query).countDocuments();

  res.status(200).send({
    ApplicationList,
    maximumPages: Math.ceil(maximumPages / size),
  });
});

export const getSpecificApplication = asyncHandler(async (req, res) => {
  const SpecificApplication = await Application.findOne({
    _id: req.params.id,
    user_id: req.currentUser.uid,
  }).populate("user");
  // .populate("user_id", "-_id -__v -isActive -createdAt -updatedAt ");
  if (!SpecificApplication) {
    throw createError.Forbidden();
  } else if (SpecificApplication.length === 0) {
    throw createError.Forbidden();
  }
  res.status(200).send(SpecificApplication);
});

export const archiveApplication = asyncHandler(async (req, res) => {
  await Application.findByIdAndUpdate(req.params.id, {
    archived: true,
  });

  res.status(200).send({ message: "application updated successfully" });
});

export const getQuantityApplications = asyncHandler(async (req, res) => {
  let { category } = req.params;

  let quantityArchived = await Application.find({
    user_id: req.currentUser.uid,
    archived: true,
  }).countDocuments();
  let quantityInsurances = await Application.find({
    user_id: req.currentUser.uid,
    category: "insurance",
    archived: false,
  }).countDocuments();
  let quantityLoans = await Application.find({
    user_id: req.currentUser.uid,
    category: "loan",
    archived: false,
  }).countDocuments();

  category = category.slice(0, -1);

  let quantityReady = await Application.find({
    user_id: req.currentUser.uid,
    category: category,
    status: 5,
    archived: false,
  }).countDocuments();
  let quantityPending = await Application.find({
    user_id: req.currentUser.uid,
    category: category,
    status: { $ne: 5 },
    archived: false,
  }).countDocuments();

  res.status(200).send({
    quantityInsurances,
    quantityLoans,
    quantityReady,
    quantityArchived,
    quantityPending,
  });
});
