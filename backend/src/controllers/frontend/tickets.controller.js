import asyncHandler from "helpers/asyncHandler.js";
import { PaginationHelper } from "helpers/paginationHelper";
import Ticket from "models/ticket.js";

export const TicketsGetAll = asyncHandler(async (req, res) => {
  let { page, size } = req.query;

  const { skip, limit } = PaginationHelper(page, size);

  const tickets = await Ticket.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  let maximumPages = await Ticket.find().countDocuments();
  maximumPages = Math.ceil(maximumPages / size);

  res.status(200).send({ tickets, maximumPages });
});

export const TicketDeleteOne = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await Ticket.findByIdAndRemove(id);

  res.status(200).send({ message: "success" });
});

export const TicketsPost = asyncHandler(async (req, res) => {
  const { fullName, email, message } = req.body;

  await new Ticket({ fullName, email, message }).save();

  res.status(200).send({
    message: "ticket submitted",
  });
});
