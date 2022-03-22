import { asyncHandler } from "helpers/asyncHandler";
import History from "models/history";
import { pagination } from "helpers/pagination";

export const getHistory = asyncHandler(async (req, res) => {
  let { page, size } = req.query;
  let { limit, skip } = pagination(page, size);
  let query = { employee_id: req.currentUser.uid };

  const history = await History.find(query)
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 })
    .populate("employee", "name surname");

  let maximumPages = await History.find(query).countDocuments();
  maximumPages = Math.ceil(maximumPages / size);
  res.send({
    history,
    maximumPages,
  });
});

export const getHistoryAll = asyncHandler(async (req, res) => {
  let { page, size } = req.query;
  let { limit, skip } = pagination(page, size);
  let query = {};

  const history = await History.find(query)
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 })
    .populate("employee", "name surname");

  let maximumPages = await History.find(query).countDocuments();
  maximumPages = Math.ceil(maximumPages / size);

  res.send({
    history,
    maximumPages,
  });
});
