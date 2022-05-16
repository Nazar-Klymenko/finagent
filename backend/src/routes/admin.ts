import express, { Router } from "express";
const router: Router = express.Router();

import { signUp, getUser, requestAdmin } from "controllers/admin/auth";
import {
  getAllAplications,
  assignApplication,
  getSpecificApplication,
  getAllAplicationsForAdmin,
  updateStatus,
  returnApplication,
  archiveApplication,
  postAttachments,
} from "controllers/admin/applicationActions";

import { getAllClients } from "controllers/admin/clients";
import {
  getAllOperators,
  getAwaitingOperators,
  grantAdministatorRole,
  declineAdministator,
} from "controllers/admin/supervisor";
import {
  verifyAccessTokenFirebase,
  verifyAdmin,
  verifySupervisor,
} from "middleware/auth";

router.route("/auth/signup").post(signUp);
router.route("/auth/user").get(verifyAccessTokenFirebase, getUser);
router
  .route("/auth/request-admin")
  .get(verifyAccessTokenFirebase, requestAdmin);

router
  .route("/clients")
  .get(verifyAccessTokenFirebase, verifyAdmin, getAllClients);

router
  .route("/applications")
  .get(verifyAccessTokenFirebase, verifyAdmin, getAllAplications);
router
  .route("/applications/my")
  .get(verifyAccessTokenFirebase, verifyAdmin, getAllAplicationsForAdmin);
router
  .route("/applications/specific/:id")
  .get(verifyAccessTokenFirebase, verifyAdmin, getSpecificApplication);
router
  .route("/applications/assign/:id")
  .put(verifyAccessTokenFirebase, verifyAdmin, assignApplication);
router
  .route("/applications/return/:id")
  .put(
    verifyAccessTokenFirebase,
    verifyAdmin,
    verifySupervisor,
    returnApplication
  );
router
  .route("/applications/archive/:id")
  .put(
    verifyAccessTokenFirebase,
    verifyAdmin,
    verifySupervisor,
    archiveApplication
  );
router
  .route("/applications/status/:id")
  .put(verifyAccessTokenFirebase, verifyAdmin, updateStatus);
router
  .route("/applications/attachments/:id")
  .post(verifyAccessTokenFirebase, verifyAdmin, postAttachments);

router
  .route("/operators")
  .get(
    verifyAccessTokenFirebase,
    verifyAdmin,
    verifySupervisor,
    getAllOperators
  );
router
  .route("/operators/awaiting")
  .get(
    verifyAccessTokenFirebase,
    verifyAdmin,
    verifySupervisor,
    getAwaitingOperators
  );
router
  .route("/operators/accept/:id")
  .put(
    verifyAccessTokenFirebase,
    verifyAdmin,
    verifySupervisor,
    grantAdministatorRole
  );
router
  .route("/operators/reject/:id")
  .put(
    verifyAccessTokenFirebase,
    verifyAdmin,
    verifySupervisor,
    declineAdministator
  );

export default router;
