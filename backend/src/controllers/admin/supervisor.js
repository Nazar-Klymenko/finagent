import Admin from "models/admin.js";
import createError from "http-errors";
import asyncHandler from "helpers/asyncHandler.js";

export const allOperators = asyncHandler(async (req, res) => {
  const admin = await Admin.find({ isApproved: true, role: "admin" });

  if (!admin) {
    throw createError.Unauthorized();
  }
  res.send(admin);
});

export const awaitingOperators = asyncHandler(async (req, res) => {
  const admin = await Admin.find({ isApproved: false, role: "admin" });

  if (!admin) {
    throw createError.Unauthorized();
  }
  res.send(admin);
});

export const grantAdministatorRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const admin = await Admin.findByIdAndUpdate(id, { isApproved: true });

  res.status(200).send("success");
});

export const declineAdministator = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const admin = await Admin.findByIdAndRemove(id);

  res.status(200).send("success");
});
