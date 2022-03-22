import express, { Router } from "express";
const router: Router = express.Router();

import { signUp, signUpFacebook, verifyEmail } from "controllers/frontend/auth";

import { verifyAccessTokenFirebase, isEmailVerified } from "middleware/auth";
import {
  deleteUser,
  getSettings,
  updateSettings,
} from "controllers/frontend/settings";

import {
  getAllNotifications,
  getSpecificNotification,
} from "controllers/frontend/notifications";

import {
  insuranceBorderSubmit,
  insuranceEstateSubmit,
  insuranceHealthSubmit,
  insuranceSpecialistSubmit,
  insuranceTransportSubmit,
  insuranceTravelSubmit,
  loanCashSubmit,
  loanMortgageSubmit,
} from "controllers/frontend/submit";

import { ticketSubmit } from "controllers/frontend/ticket";

import {
  getAllAplications,
  getSpecificApplication,
  archiveApplication,
} from "controllers/frontend/applicationsActions";

router.route("/auth/signup").post(signUp);
router.route("/auth/signup_facebook").post(signUpFacebook);
router.route("/auth/verify_email").post(verifyEmail);

router.route("/submit/ticket").post(ticketSubmit);

router
  .route("/settings")
  .get(verifyAccessTokenFirebase, isEmailVerified, getSettings)
  .put(verifyAccessTokenFirebase, isEmailVerified, updateSettings)
  .delete(verifyAccessTokenFirebase, isEmailVerified, deleteUser);

router
  .route("/notifications/")
  .get(verifyAccessTokenFirebase, isEmailVerified, getAllNotifications);
router
  .route("/notifications/:id")
  .get(verifyAccessTokenFirebase, isEmailVerified, getSpecificNotification);

router
  .route("/submit/insraunce-border")
  .post(verifyAccessTokenFirebase, isEmailVerified, insuranceBorderSubmit);
router
  .route("/submit/insraunce-estate")
  .post(verifyAccessTokenFirebase, isEmailVerified, insuranceEstateSubmit);
router
  .route("/submit/insraunce-health")
  .post(verifyAccessTokenFirebase, isEmailVerified, insuranceHealthSubmit);
router
  .route("/submit/insraunce-specialist")
  .post(verifyAccessTokenFirebase, isEmailVerified, insuranceSpecialistSubmit);
router
  .route("/submit/insraunce-transport")
  .post(verifyAccessTokenFirebase, isEmailVerified, insuranceTransportSubmit);
router
  .route("/submit/insraunce-travel")
  .post(verifyAccessTokenFirebase, isEmailVerified, insuranceTravelSubmit);
router
  .route("/submit/loan-cash")
  .post(verifyAccessTokenFirebase, isEmailVerified, loanCashSubmit);
router
  .route("/submit/loan-mortgage")
  .post(verifyAccessTokenFirebase, isEmailVerified, loanMortgageSubmit);

router
  .route("/applications/specific/:id")
  .get(verifyAccessTokenFirebase, isEmailVerified, getSpecificApplication)
  .put(verifyAccessTokenFirebase, isEmailVerified, archiveApplication);

router
  .route("/applications/:category")
  .get(verifyAccessTokenFirebase, isEmailVerified, getAllAplications);

export default router;
