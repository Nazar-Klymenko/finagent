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
import serveDocument from "controllers/serveDocument";
import express from "express";
import { verifyAdmin, verifySupervisor } from "middleware/admin";
import { verifyAccessTokenFirebaseAdmin } from "middleware/auth";
import { verifyAccessTokenFirebaseQueryAdmin } from "middleware/auth";
import { accessToImage } from "middleware/imageAcess";

const router = express.Router();

router
  .route("/show/:status")
  .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getAllApplications);
// router
//   .route("/show/archived")
//   .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getArchivedApplications);
// router
//   .route("/show/taken")
//   .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getTakenApplications);

// router
//   .route("/show/my")
//   .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getMyApplications);

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
  .route("/files/:id/:type/:filename")
  .get(verifyAccessTokenFirebaseAdmin, accessToImage, serveDocument);

export default router;
