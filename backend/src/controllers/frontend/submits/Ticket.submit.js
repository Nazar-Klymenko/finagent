import asyncHandler from "@helpers/asyncHandler.js";
import Ticket from "@models/ticket.js";

export const TicketSubmit = asyncHandler(async (req, res) => {
  const { fullName, email, message } = req.body;

  const ticketObj = await new Ticket({ fullName, email, message });
  await ticketObj.save();

  res.status(200).send({
    message: "ticket submitted",
  });
});
