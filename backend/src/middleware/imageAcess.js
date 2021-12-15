import createError from "http-errors";
import Application from "../models/application.js";

export const accessToImage = async (req, res, next) => {
  try {
    const userId = req.currentUser.uid;

    const app = await Application.findById(req.params.id)
      .populate("user")
      .populate("employee");
    if (!app) throw createError.Forbidden();

    if (app.user_id != userId) {
      if (app.employee_id != userId) {
        throw createError.Forbidden();
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const accessToImageAdmin = async (req, res, next) => {
  try {
    const userId = req.currentUser.uid;

    const app = await Application.findById(req.params.id).populate(
      "employee",
      "-__v -password -isActive -createdAt -updatedAt"
    );
    if (!app) throw createError.Forbidden();

    if (app.employee_id != userId) {
      throw createError.Forbidden();
    }

    next();
  } catch (error) {
    next(error);
  }
};
