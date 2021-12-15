import {
  getAllNotifications,
  getNewNotifications,
  getSpecificNotification,
} from "@controllers/frontend/notifications.js";
import {
  deleteUser,
  getSettings,
  updateSettings,
} from "@controllers/frontend/settings.js";
import {
  verifyAccessTokenFirebase,
  isEmailVerified,
} from "@middleware/auth.js";
import express from "express";

const router = express.Router();

router
  .route("/settings")
  .get(verifyAccessTokenFirebase, isEmailVerified, getSettings);
router
  .route("/settings/update")
  .post(verifyAccessTokenFirebase, isEmailVerified, updateSettings);

router
  .route("/settings/delete_user")
  .delete(verifyAccessTokenFirebase, isEmailVerified, deleteUser);

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
