import { asyncHandler } from "helpers/asyncHandler";
import { pagination } from "helpers/pagination";
import Ticket from "models/ticket";

export const getAllTickets = asyncHandler(async (req, res) => {
  let { page, size } = req.query;

  const { skip, limit } = pagination(page, size);

  const tickets = await Ticket.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  let maximumPages = await Ticket.find().countDocuments();
  maximumPages = Math.ceil(maximumPages / size);

  res.status(200).send({ tickets, maximumPages });
});

export const deleteTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tickets = await Ticket.findByIdAndRemove(id);

  res.status(200).send({ message: "success" });
});
