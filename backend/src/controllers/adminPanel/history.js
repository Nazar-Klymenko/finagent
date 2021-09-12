import asyncHandler from "helpers/asyncHandler.js";

import History from "models/history.js";

export const getAllHistory = asyncHandler(async (req, res, next) => {
  const HistoryList = await History.find()
    .populate("employee", "-_id -__v -password -isActive -createdAt -updatedAt")
    .populate("application", "_id");
  res.send({
    HistoryList,
  });
});

export const getHistory = asyncHandler(async (req, res, next) => {
  let { page, size } = req.query;
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 20;
  }

  const skip = (page - 1) * size;
  const limit = parseInt(size);

  const HistoryList = await History.find({
    employee_id: req.currentUser.uid,
  })
    .limit(limit)
    .skip(skip)
    .populate("employee", "name surname");
  res.send({
    HistoryList,
  });
});
