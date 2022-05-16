import User from "models/user";
import createError from "http-errors";
import { asyncHandler } from "helpers/asyncHandler";
import { pagination } from "helpers/pagination";
import { Request, Response } from "express";

export const getAllClients = asyncHandler(
  async (req: Request, res: Response) => {
    let { page = "1" as string, size = "4" as string } = req.query as any;

    const { skip, limit } = pagination(page, size);

    let filters = {
      isAdmin: false,
    };

    let clients = await User.find(
      filters,
      "_id isApproved fullName email phone provider language createdAt updatedAt"
    )
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    let maximumPages = await User.find(filters).countDocuments();
    maximumPages = Math.ceil(maximumPages / +size);

    let data = { clients, maximumPages };
    res.send(data);
  }
);
