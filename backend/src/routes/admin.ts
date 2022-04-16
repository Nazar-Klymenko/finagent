import express, { Router } from "express";
const router: Router = express.Router();

import { signUp, getUser } from "controllers/admin/auth";
import {
  getAllAplications,
  assignApplication,
  getSpecificApplication,
  getAllAplicationsForAdmin,
  updateStatus,
} from "controllers/admin/applicationActions";

import { verifyAccessTokenFirebase, verifyAdmin } from "middleware/auth";

router.route("/auth/signup").post(signUp);
router.route("/auth/user").get(verifyAccessTokenFirebase, getUser);

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
  .post(verifyAccessTokenFirebase, verifyAdmin, assignApplication);
router
  .route("/applications/status/:id")
  .post(verifyAccessTokenFirebase, verifyAdmin, updateStatus);

export default router;
