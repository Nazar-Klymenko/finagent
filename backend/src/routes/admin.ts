import express, { Router } from "express";
const router: Router = express.Router();

import { signUp, getUser } from "controllers/admin/auth";
import {
  getAllAplications,
  assignApplication,
  getSpecificApplication,
  getAllAplicationsForAdmin,
  updateStatus,
  returnApplication,
  archiveApplication,
} from "controllers/admin/applicationActions";

import { getAllClients } from "controllers/admin/clients";
import {
  verifyAccessTokenFirebase,
  verifyAdmin,
  verifySupervisor,
} from "middleware/auth";

router.route("/auth/signup").post(signUp);
router.route("/auth/user").get(verifyAccessTokenFirebase, getUser);

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

export default router;
