import Application from "models/application";
import User from "models/application";
import { asyncHandler } from "helpers/asyncHandler";
import { Request, Response } from "express";
import createError from "http-errors";
import { pagination } from "helpers/pagination";

export const getAllAplications = asyncHandler(
  async (req: Request, res: Response) => {
    let { category } = req.params;
    let { page = "1" as string, size = "4" as string } = req.query as any;

    const { skip, limit } = pagination(page, size);

    let filters = {
      user_id: req.currentUser.uid,
      category: category,
      archived: false,
    };

    if (category === "archive") {
      //@ts-ignore
      delete filters.category;
      filters.archived = true;
    }
    let applications = await Application.find(
      filters,
      "_id user_id user status type category createdAt updatedAt"
    )
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    let maximumPages = await Application.find(filters).countDocuments();
    maximumPages = Math.ceil(maximumPages / +size);

    let data = { applications, maximumPages };
    res.send(data);
  }
);

export const getSpecificApplication = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await Application.findOne({
      _id: req.params.id,
      user_id: req.currentUser.uid,
    }).populate("user");

    if (!data) {
      throw new createError.Forbidden();
    } else if (data.length === 0) {
      throw new createError.Forbidden();
    }
    res.send(data);
  }
);

export const archiveApplication = asyncHandler(
  async (req: Request, res: Response) => {
    const applicationObj = await Application.findOne({
      _id: req.params.id,
      user_id: req.currentUser.uid,
    });

    applicationObj.archived = true;
    await applicationObj.save();
    res.status(200).send({ message: "application updated successfully" });
  }
);
