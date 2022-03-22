import { asyncHandler } from "helpers/asyncHandler";
import Ticket from "models/ticket";
import { Request, Response } from "express";

export const ticketSubmit = asyncHandler(
  async (req: Request, res: Response) => {
    const { fullName, email, message } = req.body;

    const ticketObj = await new Ticket({ fullName, email, message });
    await ticketObj.save();

    res.status(200).send({
      message: "ticket submitted",
    });
  }
);
