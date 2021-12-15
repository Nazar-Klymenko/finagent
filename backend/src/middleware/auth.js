import CreateError from "http-errors";

import { auth, adminAuth } from "services/firebase";

let verifiedEmail;

export const verifyAccessTokenFirebase = async (req, res, next) => {
  if (!req.headers.authorization) return next(CreateError.Unauthorized());
  const header = req.headers.authorization;
  if (
    header !== "Bearer null" &&
    req.headers?.authorization?.startsWith("Bearer ")
  ) {
    const idToken = req.headers.authorization.split("Bearer ")[1];
    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      //
      verifiedEmail = decodedToken.email_verified;

      if (decodedToken.firebase?.sign_in_provider === "facebook.com") {
        verifiedEmail = true;
      }
      req["currentUser"] = decodedToken;
    } catch (err) {
      next(err);
    }
  }
  next();
};
export const verifyAccessTokenFirebaseQuery = async (req, res, next) => {
  if (!req.params.idtoken) return next(CreateError.Unauthorized());
  const header = req.params.idtoken;

  try {
    const decodedToken = await auth.verifyIdToken(header);
    //
    verifiedEmail = decodedToken.email_verified;

    if (decodedToken.firebase?.sign_in_provider === "facebook.com") {
      verifiedEmail = true;
    }
    req["currentUser"] = decodedToken;
  } catch (err) {
    next(err);
  }
  next();
};
export const verifyAccessTokenFirebaseQueryAdmin = async (req, res, next) => {
  if (!req.params.idtoken) return next(CreateError.Unauthorized());
  const header = req.params.idtoken;

  try {
    const decodedToken = await adminAuth.verifyIdToken(header);
    //
    verifiedEmail = decodedToken.email_verified;

    if (decodedToken.firebase?.sign_in_provider === "facebook.com") {
      verifiedEmail = true;
    }
    req["currentUser"] = decodedToken;
  } catch (err) {
    next(err);
  }
  next();
};

export const verifyAccessTokenFirebaseAdmin = async (req, res, next) => {
  if (!req.headers.authorization) return next(CreateError.Unauthorized());

  const header = req.headers.authorization;
  if (
    header !== "Bearer null" &&
    req.headers?.authorization?.startsWith("Bearer ")
  ) {
    const idToken = req.headers.authorization.split("Bearer ")[1];
    try {
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      req["currentUser"] = decodedToken;
    } catch (err) {
      next(err);
    }
  }
  next();
};

export const isEmailVerified = async (req, res, next) => {
  if (!verifiedEmail) return next(CreateError.Unauthorized());
  next();
};
