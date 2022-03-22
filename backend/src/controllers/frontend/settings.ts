import createError from "http-errors";
import { asyncHandler } from "helpers/asyncHandler";
import User from "models/user";
import Application from "models/application";
import { Request, Response } from "express";

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.currentUser.uid);
  await Application.updateMany(
    { user_id: req.currentUser.uid },
    { $set: { archived: true } }
  );

  res.status(200).send({ message: "user deleted successfully" });
});

export const getSettings = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.currentUser.uid);

  if (!user) {
    throw new createError.Unauthorized();
  }
  res.send({
    fullName: user.fullName,
    phone: user.phone,
  });
});

export const updateSettings = asyncHandler(
  async (req: Request, res: Response) => {
    const { fullName, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.currentUser.uid,
      {
        fullName: fullName,
        phone: phone,
      },
      {
        new: true,
      }
    );

    if (!user) throw new createError.Unauthorized("Wrong user");

    res.status(200).send({
      user,
    });
  }
);
