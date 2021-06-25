import Application from "models/application.js";
import createError from "http-errors";
import asyncHandler from "helpers/asyncHandler.js";

import addHistoryRecord from "utils/history.js";
import sendNotification from "utils/notification.js";

export const getAllApplications = asyncHandler(async (req, res, next) => {
  const ApplicationList = await Application.find({
    assignedEmployee: { $eq: null },
  })
    .populate("user_id", "-_id -__v -password -isActive -createdAt -updatedAt")
    .populate(
      "assignedEmployee",
      "-_id -__v -password -isActive -createdAt -updatedAt"
    );

  if (!ApplicationList) {
    res.send({ message: "You don't have any applications" });
  }
  res.send({
    ApplicationList,
  });
});

export const getTakenApplications = asyncHandler(async (req, res, next) => {
  const ApplicationList = await Application.find({
    assignedEmployee: { $ne: null },
  })
    .populate("user_id", "-_id -__v -password -isActive -createdAt -updatedAt")
    .populate(
      "assignedEmployee",
      "-_id -__v -password -isActive -createdAt -updatedAt"
    );

  if (!ApplicationList) {
    res.send({ message: "You don't have any applications" });
  }
  res.send({ ApplicationList });
});

export const getAllApplicationsForUser = asyncHandler(
  async (req, res, next) => {
    const ApplicationList = await Application.find({
      user_id: req.params.id,
    })
      .populate(
        "user_id",
        "-_id -__v -password -isActive -createdAt -updatedAt"
      )
      .populate(
        "assignedEmployee",
        "-_id -__v -password -isActive -createdAt -updatedAt -phone"
      );

    if (!ApplicationList) {
      res.send({ message: "You don't have any applications" });
    }
    res.send({
      ApplicationList,
    });
  }
);

export const getSpecificApplication = asyncHandler(async (req, res, next) => {
  const SpecificApplication = await Application.find(
    {
      _id: req.params.id,
    },
    { _id: 0, __v: 0 }
  )
    .populate("user_id", "-_id -__v -password -isActive -createdAt -updatedAt")
    .populate(
      "assignedEmployee",
      "-_id -__v -password -isActive -createdAt -updatedAt -phone"
    );

  if (SpecificApplication.length === 0) {
    throw createError.Forbidden();
  }

  res.status(200).send(SpecificApplication);
});

export const getMyApplications = asyncHandler(async (req, res, next) => {
  const ApplicationList = await Application.find({
    assignedEmployee: req.currentUser.uid,
  }).populate(
    "user_id",
    "-_id -__v -password -isActive -createdAt -updatedAt "
  );

  if (!ApplicationList) {
    res.send({ message: "You don't have any applications" });
  }
  res.send({
    ApplicationList,
  });
});

export const assignApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id);

  if (application.assignedEmployee != undefined) {
    throw createError.BadRequest();
  } else if (application.assignedEmployee != null) {
    throw createError.BadRequest();
  }

  application.assignedEmployee = req.currentUser.uid;
  application.save();

  addHistoryRecord(
    req.currentUser.uid,
    "assign",
    "assigned an application",
    req.params.id
  );

  res.status(200).send({ message: "application assigned successfully" });
});

export const returnApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id);

  if (application.assignedEmployee != req.currentUser.uid) {
    throw createError.BadRequest();
  }

  application.assignedEmployee = null;
  application.save();

  addHistoryRecord(
    req.currentUser.uid,
    "return",
    "returned an application",
    req.params.id
  );

  res.status(200).send({ message: "application assigned successfully" });
});

export const returnApplicationToPool = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id);

  application.assignedEmployee = null;
  application.save();

  addHistoryRecord(
    req.currentUser.uid,
    "return",
    "returned an application",
    req.params.id
  );

  res.status(200).send({ message: "application returned successfully" });
});

export const updateFeedback = asyncHandler(async (req, res, next) => {
  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { $push: { feedback: { message: req.body.feedback, date: Date.now() } } },
    { safe: true, upsert: true, new: true }
  )
    .populate("user_id", "-_id -__v -password -isActive -createdAt -updatedAt")
    .populate(
      "assignedEmployee",
      "-_id -__v -password -isActive -createdAt -updatedAt -phone"
    );

  addHistoryRecord(
    req.currentUser.uid,
    "updated feedback",
    `updated feedback: ${req.body.feedback}`,
    req.params.id
  );

  sendNotification(
    application.user_id._id,
    `New feedback on your ${application.type} application`,
    `New feedback on your ${application.type} application`,
    application.type,
    application._id
  );

  res.status(200).send({ application });
});

export const updateStatus = asyncHandler(async (req, res, next) => {
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
    application.user_id._id,
    `New status on your ${application.type} application`,
    `New status on your ${application.type} application`,
    application.type,
    application._id
  );

  res.status(200).send({ message: "application updated successfully" });
});
