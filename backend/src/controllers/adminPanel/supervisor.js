import Admin from "models/admin.js";
import createError from "http-errors";
import asyncHandler from "helpers/asyncHandler.js";
import { auth } from "app";

export const allOperators = asyncHandler(async (req, res) => {
  const admin = await Admin.find({ isActive: true, role: "admin" });

  if (!admin) {
    throw createError.Unauthorized();
  }
  res.send(admin);
});

export const awaitingOperators = asyncHandler(async (req, res) => {
  const admin = await Admin.find({ isActive: false, role: "admin" });

  if (!admin) {
    throw createError.Unauthorized();
  }
  res.send(admin);
});

export const GrantAdministatorRole = async (req, res, next) => {
  const user = await auth.getUserByEmail(req.body.email);

  if (user.customClaims && user.customClaims.moderator === true) return;

  auth.setCustomerClaims(user.uid, { moderator: true });
  res.send("success");
};
