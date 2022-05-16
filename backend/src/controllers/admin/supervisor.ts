import User from "models/user";
import createError from "http-errors";
import { asyncHandler } from "helpers/asyncHandler";
import { Request, Response } from "express";
import { pagination } from "helpers/pagination";

export const getAllOperators = asyncHandler(
  async (req: Request, res: Response) => {
    let { page = "1" as string, size = "4" as string } = req.query as any;

    const { skip, limit } = pagination(page, size);

    let filters = { isApproved: true, isAdmin: true, isRejected: false };
    const operators = await User.find({ filters })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    if (!operators) {
      throw new createError.Unauthorized();
    }
    let maximumPages = await User.find(filters).countDocuments();
    maximumPages = Math.ceil(maximumPages / +size);

    let data = { operators, maximumPages };
    res.send(data);
  }
);

export const getAwaitingOperators = asyncHandler(
  async (req: Request, res: Response) => {
    const admin = await User.find({ isApproved: false, isRejected: false });

    if (!admin) {
      throw new createError.Unauthorized();
    }
    res.send(admin);
  }
);

export const grantAdministatorRole = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const admin = await User.findByIdAndUpdate(id, {
      isApproved: true,
      isAdmin: true,
      isAwaitingApproval: false,
    });

    res.status(200).send("success");
  }
);
export const declineAdministator = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const admin = await User.findByIdAndUpdate(id, {
      isApproved: false,
      isAdmin: false,
      isAwaitingApproval: false,
      isRejected: true,
    });
    res.status(200).send("success");
  }
);
