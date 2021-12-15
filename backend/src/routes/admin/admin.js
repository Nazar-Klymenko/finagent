import { allUsers, SpecificUser } from "controllers/admin/client";
import { getHistory, getHistoryAll } from "controllers/admin/history.js";
import {
  deleteAdmin,
  getSettingsAdmin,
  updateSettings,
} from "controllers/admin/settings.js";
import {
  allOperators,
  awaitingOperators,
  grantAdministatorRole,
  declineAdministator,
} from "controllers/admin/supervisor";
import { getAllTickets, deleteTicket } from "controllers/admin/tickets.js";
import express from "express";
import { verifyAdmin, verifySupervisor } from "middleware/admin";
import { verifyAccessTokenFirebaseAdmin } from "middleware/auth";

const router = express.Router();

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

router
  .route("/tickets")
  .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getAllTickets);
router
  .route("/tickets/:id")
  .delete(verifyAccessTokenFirebaseAdmin, verifyAdmin, deleteTicket);

export default router;
