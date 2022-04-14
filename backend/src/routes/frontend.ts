import express, { Router } from "express";
const router: Router = express.Router();

import { signUp, signUpFacebook } from "controllers/frontend/auth";

import { verifyAccessTokenFirebase } from "middleware/auth";
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

router.route("/submit/ticket").post(ticketSubmit);

router
  .route("/settings")
  .get(verifyAccessTokenFirebase, getSettings)
  .put(verifyAccessTokenFirebase, updateSettings)
  .delete(verifyAccessTokenFirebase, deleteUser);

router
  .route("/notifications/")
  .get(verifyAccessTokenFirebase, getAllNotifications);
router
  .route("/notifications/:id")
  .get(verifyAccessTokenFirebase, getSpecificNotification);

router
  .route("/submit/insraunce-border")
  .post(verifyAccessTokenFirebase, insuranceBorderSubmit);
router
  .route("/submit/insraunce-estate")
  .post(verifyAccessTokenFirebase, insuranceEstateSubmit);
router
  .route("/submit/insraunce-health")
  .post(verifyAccessTokenFirebase, insuranceHealthSubmit);
router
  .route("/submit/insraunce-specialist")
  .post(verifyAccessTokenFirebase, insuranceSpecialistSubmit);
router
  .route("/submit/insraunce-transport")
  .post(verifyAccessTokenFirebase, insuranceTransportSubmit);
router
  .route("/submit/insraunce-travel")
  .post(verifyAccessTokenFirebase, insuranceTravelSubmit);
router
  .route("/submit/loan-cash")
  .post(verifyAccessTokenFirebase, loanCashSubmit);
router
  .route("/submit/loan-mortgage")
  .post(verifyAccessTokenFirebase, loanMortgageSubmit);

router
  .route("/applications/specific/:id")
  .get(verifyAccessTokenFirebase, getSpecificApplication)
  .put(verifyAccessTokenFirebase, archiveApplication);

router
  .route("/applications/:category")
  .get(verifyAccessTokenFirebase, getAllAplications);

export default router;
