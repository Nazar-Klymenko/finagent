import express from "express";
const router = express.Router();

import {
  signUp,
  signUpFacebook,
  verifyEmail,
} from "controllers/frontend/auth.js";
import { verifyAccessTokenFirebase, isEmailVerified } from "middleware/auth.js";
import {
  deleteUser,
  getSettings,
  updateSettings,
} from "controllers/frontend/settings.js";

import {
  getAllNotifications,
  getSpecificNotification,
} from "controllers/frontend/notifications.js";

import insuranceTransportSubmit from "controllers/frontend/submits/insuranceTransportSubmit.js";

import {
  getAllAplications,
  getSpecificApplication,
} from "controllers/frontend/applicationsActions";

router.route("/auth/signup").post(signUp);
router.route("/auth/signup_facebook").post(signUpFacebook);
router.route("/auth/verify_email").post(verifyEmail);

router
  .route("/settings")
  .get(verifyAccessTokenFirebase, isEmailVerified, getSettings)
  .put(verifyAccessTokenFirebase, isEmailVerified, updateSettings)
  .delete(verifyAccessTokenFirebase, isEmailVerified, deleteUser);

router
  .route("/notifications/")
  .get(verifyAccessTokenFirebase, isEmailVerified, getAllNotifications);
router
  .route("/notifications/:id")
  .get(verifyAccessTokenFirebase, isEmailVerified, getSpecificNotification);

router
  .route("/submit/insraunce-transport")
  .post(verifyAccessTokenFirebase, isEmailVerified, insuranceTransportSubmit);

router
  .route("/applications/specific/:id")
  .get(verifyAccessTokenFirebase, isEmailVerified, getSpecificApplication);

router
  .route("/applications/:category")
  .get(verifyAccessTokenFirebase, isEmailVerified, getAllAplications);

export default router;
