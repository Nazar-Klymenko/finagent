import express from "express";
const router = express.Router();

import { verifyAccessTokenFirebaseAdmin } from "middleware/auth";
import { verifyAdmin, verifySupervisor } from "middleware/admin";

import { verifyAccessTokenFirebaseQueryAdmin } from "middleware/auth";
import { accessToImageAdmin } from "middleware/imageAcess";
import serveDocument from "controllers/serveDocument";

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
} from "controllers/admin/applicationActions.js";

router
  .route("/show/all")
  .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getAllApplications);
router
  .route("/show/archived")
  .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getArchivedApplications);
router
  .route("/show/taken")
  .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getTakenApplications);

router
  .route("/show/my")
  .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getMyApplications);

router
  .route("/:id")
  .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getSpecificApplication);
router
  .route("/user/:id")
  .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getAllApplicationsForUser);

router
  .route("/assign/:id")
  .post(verifyAccessTokenFirebaseAdmin, verifyAdmin, assignApplication);
router
  .route("/return/:id")
  .post(
    verifyAccessTokenFirebaseAdmin,
    verifyAdmin,
    verifySupervisor,
    returnApplication
  );

router
  .route("/feedback/:id")
  .post(verifyAccessTokenFirebaseAdmin, verifyAdmin, updateFeedback);
router
  .route("/attach/:id")
  .post(verifyAccessTokenFirebaseAdmin, verifyAdmin, attachDocumentsAdmin);
router
  .route("/status/:id")
  .post(verifyAccessTokenFirebaseAdmin, verifyAdmin, updateStatus);
router
  .route("/archive/:id")
  .post(verifyAccessTokenFirebaseAdmin, verifyAdmin, putApplicationInArchive);

router
  .route("/files/:idtoken/:id/:type/:filename")
  .get(verifyAccessTokenFirebaseQueryAdmin, accessToImageAdmin, serveDocument);

export default router;
