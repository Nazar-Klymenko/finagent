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
  deleteAdmin,
  getSettingsAdmin,
  updateSettings,
} from "controllers/admin/settings.js";

import { getHistory, getHistoryAll } from "controllers/admin/history.js";

router
  .route("/clients/show")
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
  .route("/history/my-history")
  .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getHistory);
router
  .route("/history/all")
  .get(verifyAccessTokenFirebaseAdmin, verifySupervisor, getHistoryAll);

export default router;
