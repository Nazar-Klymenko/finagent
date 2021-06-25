import express from "express";
const router = express.Router();

import { verifyAccessTokenFirebaseAdmin } from "middleware/auth.js";
import { verifyAdmin, verifySupervisor } from "middleware/admin.js";

import {
  getAllApplications,
  getTakenApplications,
  getAllApplicationsForUser,
  getSpecificApplication,
  getMyApplications,
  assignApplication,
  returnApplication,
  returnApplicationToPool,
  updateFeedback,
  updateStatus,
} from "controllers/adminPanel/applicationActions.js";

router
  .route("/show/all")
  .get(verifyAccessTokenFirebaseAdmin, verifyAdmin, getAllApplications);
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
  .post(verifyAccessTokenFirebaseAdmin, verifyAdmin, returnApplication);
router
  .route("/return_pool/:id")
  .post(
    verifyAccessTokenFirebaseAdmin,
    verifySupervisor,
    returnApplicationToPool
  );
router
  .route("/feedback/:id")
  .post(verifyAccessTokenFirebaseAdmin, verifyAdmin, updateFeedback);
router
  .route("/status/:id")
  .post(verifyAccessTokenFirebaseAdmin, verifyAdmin, updateStatus);

export default router;
