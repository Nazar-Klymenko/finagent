import Application from "models/application";
import createError from "http-errors";
import { asyncHandler } from "helpers/asyncHandler";

import { pagination } from "helpers/pagination";

export const getAllApplications = asyncHandler(async (req, res) => {
  let { page, size } = req.query;
  let { status } = req.params;
  let query;

  if (status === "all") {
    query = {
      archived: false,
      employee_id: { $eq: null },
    };
  } else if (status === "taken") {
    query = {
      archived: false,
      employee_id: { $ne: null },
    };
  } else if (status === "archived") {
    query = {
      archived: true,
    };
  } else if (status === "my-applications") {
    query = {
      archived: false,
      employee_id: req.currentUser.uid,
    };
  }

  const { skip, limit } = pagination(page, size);

  const applications = await Application.find(query)
    .populate("user")
    .populate("employee")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  let maximumPages = await Application.find(query).countDocuments();
  maximumPages = Math.ceil(maximumPages / size);

  res.status(200).send({ applications, maximumPages });
});

export const getAllApplicationsForUser = asyncHandler(async (req, res) => {
  const ApplicationList = await Application.find({
    user_id: req.params.id,
  })
    .populate("user", "-_id -__v -password -isActive -createdAt -updatedAt")
    .populate(
      "employee",
      "-__v -password -isActive -createdAt -updatedAt -phone"
    );

  if (!ApplicationList) {
    res.send({ message: "You don't have any applications" });
  }
  res.send({
    ApplicationList,
  });
});

export const getSpecificApplication = asyncHandler(async (req, res) => {
  const SpecificApplication = await Application.findOne(
    {
      _id: req.params.id,
    },
    { _id: 0, __v: 0 }
  )
    .populate("user")
    .populate(
      "employee",
      "-__v -password -isActive -createdAt -updatedAt -phone"
    );

  if (!SpecificApplication) {
    throw createError.Forbidden();
  } else if (SpecificApplication.length === 0) {
    throw createError.Forbidden();
  }

  res.status(200).send(SpecificApplication);
});

export const assignApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application.employee_id != undefined) {
    throw createError.BadRequest();
  } else if (application.employee_id != null) {
    throw createError.BadRequest();
  }

  application.employee_id = req.currentUser.uid;
  application.save();

  res.status(200).send({ message: "application assigned successfully" });
});

export const returnApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application.employee_id != req.currentUser.uid) {
    if (!req.isSupervisor) {
      throw createError.BadRequest();
    }
  }

  application.employee_id = null;
  application.save();

  res.status(200).send({ message: "application assigned successfully" });
});

export const updateFeedback = asyncHandler(async (req, res) => {
  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { $push: { feedback: { message: req.body.feedback, date: Date.now() } } },
    { safe: true, upsert: true, new: true }
  )
    .populate("user", "-_id -__v -password -isActive -createdAt -updatedAt")
    .populate(
      "employee",
      "-_id -__v -password -isActive -createdAt -updatedAt -phone"
    );

  res.status(200).send({ application });
});

export const updateStatus = asyncHandler(async (req, res) => {
  const application = await Application.findByIdAndUpdate(req.params.id, {
    status: req.body.status,
  });

  res.status(200).send({ message: "application updated successfully" });
});

export const putApplicationInArchive = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  application.archived = true;
  application.save();

  res.status(200).send({ message: "application archived successfully" });
});

export const attachDocumentsAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let files;
  req.files;
  req.files.files;

  if (req.files.files.length === undefined) {
    files = [req.files.files];
  } else {
    files = req.files.files;
  }

  res.status(200).send({
    message: "Documents attached successfully",
  });
});
