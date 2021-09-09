import express from "express";
const router = express.Router();

import { verifyAccessTokenFirebase, isEmailVerified } from "middleware/auth.js";

import {
  changeEmail,
  changePassword,
  deleteUser,
  getSettings,
  updateSettings,
} from "controllers/frontend/settings.js";

import {
  getAllNotifications,
  getNewNotifications,
  getSpecificNotification,
} from "controllers/frontend/notifications.js";

router
  .route("/settings")
  .get(verifyAccessTokenFirebase, isEmailVerified, getSettings);
router
  .route("/settings/update")
  .post(verifyAccessTokenFirebase, isEmailVerified, updateSettings);
router
  .route("/settings/change_email")
  .post(verifyAccessTokenFirebase, isEmailVerified, changeEmail);
router
  .route("/settings/change_password")
  .post(verifyAccessTokenFirebase, isEmailVerified, changePassword);
router
  .route("/settings/delete_user")
  .post(verifyAccessTokenFirebase, isEmailVerified, deleteUser);

router
  .route("/notifications/")
  .get(verifyAccessTokenFirebase, isEmailVerified, getAllNotifications);
router
  .route("/notifications/new")
  .get(verifyAccessTokenFirebase, isEmailVerified, getNewNotifications);
router
  .route("/notifications/:id")
  .get(verifyAccessTokenFirebase, isEmailVerified, getSpecificNotification);

export default router;

/*

/

/auth/signup
/auth/login
/auth/logout
/auth/refresh_token
/auth/confirm/:token

/settings
/settings/update
/settings/change_email
/settings/change_email/:token

*/
