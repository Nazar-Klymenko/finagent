import Application from "models/application.js";
import createError from "http-errors";
import asyncHandler from "helpers/asyncHandler.js";
import { attachImagesAdmin } from "helpers/attachDocument";

import addHistoryRecord from "utils/history.js";
import sendNotification from "utils/notification.js";

export const getAllApplications = asyncHandler(async (req, res) => {
  const ApplicationList = await Application.find({
    employee_id: { $eq: null },
  })
    .populate("user")
    .populate("employee");

  if (!ApplicationList) {
    res.send({ message: "You don't have any applications" });
  }
  res.send({
    ApplicationList,
  });
});

export const getArchivedApplications = asyncHandler(async (req, res) => {
  const ApplicationList = await Application.find({
    archived: true,
  })
    .populate("user")
    .populate("employee");

  if (!ApplicationList) {
    res.send({ message: "There are no archived applications" });
  }
  res.send({
    ApplicationList,
  });
});

export const getTakenApplications = asyncHandler(async (req, res) => {
  const ApplicationList = await Application.find({
    employee_id: { $ne: null },
  })
    .populate("user", "-_id -__v -password -isActive -createdAt -updatedAt")
    .populate("employee", "-__v -password -isActive -createdAt -updatedAt");

  if (!ApplicationList) {
    res.send({ message: "You don't have any applications" });
  }
  res.send({ ApplicationList });
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
  const SpecificApplication = await Application.find(
    {
      _id: req.params.id,
    },
    { _id: 0, __v: 0 }
  )
    .populate("user", "-_id -__v -password -isActive -createdAt -updatedAt")
    .populate(
      "employee",
      "-__v -password -isActive -createdAt -updatedAt -phone"
    );

  if (SpecificApplication.length === 0) {
    throw createError.Forbidden();
  }

  res.status(200).send(SpecificApplication);
});

export const getMyApplications = asyncHandler(async (req, res) => {
  const ApplicationList = await Application.find({
    employee_id: req.currentUser.uid,
  }).populate("user", "-_id -__v -password -isActive -createdAt -updatedAt ");

  if (!ApplicationList) {
    res.send({ message: "You don't have any applications" });
  }
  res.send({
    ApplicationList,
  });
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

  addHistoryRecord(
    req.currentUser.uid,
    "assign",
    "assigned an application",
    req.params.id
  );

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

  addHistoryRecord(
    req.currentUser.uid,
    "return",
    "returned an application",
    req.params.id
  );

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

  addHistoryRecord(
    req.currentUser.uid,
    "updated feedback",
    `updated feedback: ${req.body.feedback}`,
    req.params.id
  );

  sendNotification(
    application.user_id,
    `New feedback on your ${application.type} application`,
    `New feedback on your ${application.type} application`,
    application.type,
    application._id
  );

  res.status(200).send({ application });
});

export const updateStatus = asyncHandler(async (req, res) => {
  const application = await Application.findByIdAndUpdate(req.params.id, {
    status: req.body.status,
  });

  addHistoryRecord(
    req.currentUser.uid,
    "updated status",
    `updated status to ${req.body.status}`,
    req.params.id
  );

  sendNotification(
    application.user_id,
    `New status on your ${application.type} application`,
    `New status on your ${application.type} application`,
    application.type,
    application._id
  );

  res.status(200).send({ message: "application updated successfully" });
});

export const putApplicationInArchive = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  application.archived = true;
  application.save();

  addHistoryRecord(
    req.currentUser.uid,
    "archiving application",
    "process successful",
    req.params.id
  );

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
  await attachImagesAdmin(id, files);

  res.status(200).send({
    message: "Documents attached successfully",
  });
});
