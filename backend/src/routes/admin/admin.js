import {
  getAllApplications,
  getTakenApplications,
  getAllApplicationsForUser,
  getSpecificApplication,
  getMyApplications,
  assignApplication,
  returnApplication,
  updateFeedback,
  updateStatus,
  putApplicationInArchive,
  attachDocumentsAdmin,
  getArchivedApplications,
} from "@controllers/admin/applicationActions.js";
import { allUsers, SpecificUser } from "@controllers/admin/client";
import { getHistory, getHistoryAll } from "@controllers/admin/history.js";
import {
  deleteAdmin,
  getSettingsAdmin,
  updateSettings,
} from "@controllers/admin/settings.js";
import {
  allOperators,
  awaitingOperators,
  grantAdministatorRole,
  declineAdministator,
} from "@controllers/admin/supervisor";
import { getAllTickets, deleteTicket } from "@controllers/admin/tickets.js";
import serveDocument from "@controllers/serveDocument";
import { verifyAdmin as VA, verifySupervisor as VS } from "@middleware/admin";
import { verifyAdmin, verifySupervisor } from "@middleware/admin";
import { verifyAccessTokenFirebaseAdmin as VAF } from "@middleware/auth";
import { verifyAccessTokenFirebaseAdmin } from "@middleware/auth";
import { verifyAccessTokenFirebaseQueryAdmin } from "@middleware/auth";
import { accessToImage } from "@middleware/imageAcess";
import express from "express";

const router = express.Router();

router.route("/clients/show").get(VAF, VA, allUsers);
router.route("/clients/:id").get(VAF, VA, SpecificUser);

router.route("/operators").get(VAF, VS, allOperators);
router.route("/operators/awaiting").get(VAF, VS, awaitingOperators);

router.route("/operators/accept/:id").post(VAF, VS, grantAdministatorRole);
router.route("/operators/decline/:id").post(VAF, VS, declineAdministator);

router
  .route("/settings")
  .get(VAF, VA, getSettingsAdmin)
  .put(VAF, VA, updateSettings)
  .delete(VAF, VA, deleteAdmin);

router.route("/history/my-history").get(VAF, VA, getHistory);
router.route("/history/all").get(VAF, VS, getHistoryAll);

router.route("/tickets").get(VAF, VA, getAllTickets);
router.route("/tickets/:id").delete(VAF, VA, deleteTicket);

router.route("/show/:status").get(VAF, VA, getAllApplications);
// router
//   .route("/show/archived")
//   .get(VAF, VA, getArchivedApplications);
// router
//   .route("/show/taken")
//   .get(VAF, VA, getTakenApplications);

// router
//   .route("/show/my")
//   .get(VAF, VA, getMyApplications);

router.route("/:id").get(VAF, VA, getSpecificApplication);
router.route("/user/:id").get(VAF, VA, getAllApplicationsForUser);

router.route("/assign/:id").post(VAF, VA, assignApplication);
router.route("/return/:id").post(VAF, VA, verifySupervisor, returnApplication);

router.route("/feedback/:id").post(VAF, VA, updateFeedback);
router.route("/attach/:id").post(VAF, VA, attachDocumentsAdmin);
router.route("/status/:id").post(VAF, VA, updateStatus);
router.route("/archive/:id").post(VAF, VA, putApplicationInArchive);

router
  .route("/files/:id/:type/:filename")
  .get(VAF, accessToImage, serveDocument);

export default router;
