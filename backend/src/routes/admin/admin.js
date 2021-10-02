import express from "express";
const router = express.Router();

import { verifyAccessTokenFirebaseAdmin } from "middleware/auth";
import { verifyAdmin, verifySupervisor } from "middleware/admin";

import {
  allOperators,
  awaitingOperators,
  grantAdministatorRole,
  declineAdministator,
} from "controllers/admin/supervisor";

import { allUsers, SpecificUser } from "controllers/admin/client";

import {
  changePassword,
  deleteAdmin,
  getSettingsAdmin,
  updateSettings,
} from "controllers/admin/settings.js";

import { getHistory, getAllHistory } from "controllers/admin/history.js";

router
  .route("/clients")
  .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, allUsers);
router
  .route("/clients/:id")
  .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, SpecificUser);

router
  .route("/operators")
  .get(verifyAccessTokenFirebaseAdmin, verifySupervisor, allOperators);
router
  .route("/operators/awaiting")
  .get(verifyAccessTokenFirebaseAdmin, verifySupervisor, awaitingOperators);

router
  .route("/operators/accept/:id")
  .post(
    verifyAccessTokenFirebaseAdmin,
    verifySupervisor,
    grantAdministatorRole
  );
router
  .route("/operators/decline/:id")
  .post(verifyAccessTokenFirebaseAdmin, verifySupervisor, declineAdministator);

router
  .route("/settings")
  .get(
    verifyAccessTokenFirebaseAdmin,

    verifyAdmin,
    getSettingsAdmin
  )
  .put(verifyAccessTokenFirebaseAdmin, verifyAdmin, updateSettings)
  .delete(verifyAccessTokenFirebaseAdmin, verifyAdmin, deleteAdmin);

router
  .route("/settings/change_password")
  .put(verifyAccessTokenFirebaseAdmin, verifyAdmin, changePassword);

router
  .route("/history")
  .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getHistory);
router
  .route("/history/all")
  .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getAllHistory);

export default router;
