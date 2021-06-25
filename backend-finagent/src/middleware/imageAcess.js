import createError from "http-errors";
import Application from "../models/application.js";

export const accessToImage = async (req, res, next) => {
  try {
    const userId = req.currentUser.uid;

    const app = await Application.findById(req.params.id)
      .populate("user_id", "-__v -password -isActive -createdAt -updatedAt")
      .populate(
        "assignedEmployee",
        "-__v -password -isActive -createdAt -updatedAt"
      );
    if (!app) throw createError.Forbidden();

    if (app.user_id._id != userId) {
      if (app.assignedEmployee._id != userId) {
        throw createError.Forbidden();
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
