import express from "express";
const router = express.Router();

import {
  signUp,
  signUpFacebook,
  verifyEmail,
} from "controllers/frontend/auth.js";
import { verifyAccessTokenFirebase, isEmailVerified } from "middleware/auth.js";
import {
  deleteUser,
  getSettings,
  updateSettings,
} from "controllers/frontend/settings.js";

import {
  getAllNotifications,
  getSpecificNotification,
} from "controllers/frontend/notifications.js";

import insuranceBorderSubmit from "controllers/frontend/submits/insuranceBorder.js";
import insuranceEstateSubmit from "controllers/frontend/submits/insuranceEstate.js";
import insuranceHealthSubmit from "controllers/frontend/submits/insuranceHealth.js";
import insuranceSpecialistSubmit from "controllers/frontend/submits/insuranceSpecialist.js";
import insuranceTransportSubmit from "controllers/frontend/submits/insuranceTransport.js";
import insuranceTravelSubmit from "controllers/frontend/submits/insuranceTravel.js";
import loanCashSubmit from "controllers/frontend/submits/loanCash.js";
import loanMortgageSubmit from "controllers/frontend/submits/loanMortgage.js";
import { ticketSubmit } from "controllers/frontend/submits/ticket.js";

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
