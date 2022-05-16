import createError from "http-errors";
import User from "models/user";

import { auth } from "services/firebase";

export const verifyAccessTokenFirebase = async (req, res, next) => {
  if (!req.headers.authorization) return next(createError.Unauthorized());
  const header = req.headers.authorization;
  if (
    header !== "Bearer null" &&
    req.headers?.authorization?.startsWith("Bearer ")
  ) {
    const idToken = req.headers.authorization.split("Bearer ")[1];
    try {
      const decodedToken = await auth.verifyIdToken(idToken);

      if (
        !decodedToken.email_verified &&
        decodedToken.firebase?.sign_in_provider !== "facebook.com"
      ) {
        // throw new createError.Unauthorized();
      }

      req["currentUser"] = decodedToken;
    } catch (err) {
      next(err);
    }
  }
  next();
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const admin = await User.findById(req.currentUser.uid);
    if (admin.isAdmin && admin.isApproved) {
      next();
    } else {
      throw new createError.Forbidden();
    }
  } catch (error) {
    next(error);
  }
};

export const verifySupervisor = async (req, res, next) => {
  try {
    const admin = await User.findById(req.currentUser.uid);

    if (admin.isSupervisor && admin.isApproved) {
      req.isSupervisor = true;
      next();
    } else {
      throw new createError.Forbidden();
    }
  } catch (error) {
    next(error);
  }
};
