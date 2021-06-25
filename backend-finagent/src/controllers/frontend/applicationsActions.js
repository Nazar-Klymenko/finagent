import Application from "models/application.js";
import User from "models/application.js";
import asyncHandler from "helpers/asyncHandler.js";
import createError from "http-errors";

import path from "path";
const __dirname = path.resolve();

export const getPreviewApplications = asyncHandler(async (req, res, next) => {
  let { category, status } = req.params;
  let { page, size, count } = req.query;
  category = category.slice(0, -1);
  let filters = {
    user_id: req.currentUser.uid,
    category: category,
    archived: false,
  };

  if (!page || page == 0) {
    page = 1;
  }
  if (!size) {
    size = 4;
  }
  const skip = (page - 1) * size;
  const limit = parseInt(size);

  if (status === "ready") {
    filters.status = "5";
  }
  const query = { ...filters };

  const ApplicationList = await Application.find(
    query,
    "_id user_id status type category createdAt updatedAt"
  )
    .limit(limit)
    .skip(skip)
    .populate("user_id", "-_id -__v -isActive -createdAt -updatedAt");

  let maximumPages = 1;
  if (count) {
    maximumPages = await Application.find(
      query,
      "_id user_id status type category createdAt updatedAt"
    ).count();
  }

  res.send({
    ApplicationList,
    maximumPages: Math.ceil(maximumPages / size),
  });
});

export const getSpecificApplication = asyncHandler(async (req, res, next) => {
  const SpecificApplication = await Application.findOne(
    {
      _id: req.params.id,
      user_id: req.currentUser.uid,
    },
    { _id: 0, __v: 0 }
  ).populate("user_id", "-_id -__v -isActive -createdAt -updatedAt ");

  if (SpecificApplication.length === 0) {
    throw createError.Forbidden();
  }
  res.status(200).send(SpecificApplication);
});

export const getArchivedApplications = asyncHandler(async (req, res, next) => {
  let { page, size } = req.query;
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 20;
  }
  const skip = (page - 1) * size;
  const limit = parseInt(size);

  const ApplicationList = await Application.find(
    {
      user_id: req.currentUser.uid,
      archived: true,
    },
    "_id user_id category type status createdAt updatedAt"
  )
    .limit(limit)
    .skip(skip)
    .populate(
      "user_id",
      "-_id -__v -password -isActive -createdAt -updatedAt "
    );

  res.send({
    ApplicationList,
  });
});

export const archiveApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findByIdAndUpdate(req.params.id, {
    archived: true,
  });

  res.status(200).send({ message: "application updated successfully" });
});

export const autofillApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.find({ user_id: req.currentUser.uid });
  const user = await User.findById(req.currentUser.uid);

  // if (!application.length) {
  // }
  res.status(200).send({
    name: user.name,
    surname: user.surname,
    phoneNumber: user.phone,
    email: user.email,
    application,
  });
});

export const serveImage = asyncHandler(async (req, res, next) => {
  const imgPath = path.resolve(__dirname, "./src/files/documents");
  res.sendFile(`${imgPath}/${req.params.filename}`);
});
