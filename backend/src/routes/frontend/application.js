import {
  getPreviewApplications,
  getSpecificApplication,
  getQuantityApplications,
  archiveApplication,
} from "controllers/frontend/applicationsActions";
import InsuranceBorderSubmit from "controllers/frontend/submits/InsuranceBorder.submit.js";
// import InsuranceCarOCSubmit from "controllers/frontend/submits/InsuranceCarOC.submit.js";
import InsuranceEstateSubmit from "controllers/frontend/submits/InsuranceEstate.submit.js";
import InsuranceHealthMedicalSubmit from "controllers/frontend/submits/InsuranceHealthMedical.submit.js";
import InsuranceHealthSpecialistSubmit from "controllers/frontend/submits/InsuranceHealthSpecialist.submit.js";
import InsuranceTravelSubmit from "controllers/frontend/submits/InsuranceTravel.submit.js";
import LoanCashSubmit from "controllers/frontend/submits/LoanCash.submit.js";
import LoanMortgageSubmit from "controllers/frontend/submits/LoanMortgage.submit.js";
import { TicketSubmit } from "controllers/frontend/submits/Ticket.submit.js";
import serveDocument from "controllers/serveDocument";
import express from "express";
import { verifyAccessTokenFirebase, isEmailVerified } from "middleware/auth.js";
import { accessToImage } from "middleware/imageAcess";

const router = express.Router();

router
  .route("/show/:category/:status")
  .get(verifyAccessTokenFirebase, isEmailVerified, getPreviewApplications);

router
  .route("/count/:category/quantity")
  .get(verifyAccessTokenFirebase, isEmailVerified, getQuantityApplications);

router
  .route("/:id")
  .get(verifyAccessTokenFirebase, isEmailVerified, getSpecificApplication)
  .put(verifyAccessTokenFirebase, isEmailVerified, archiveApplication);

// router
//   .route("/submit/insurance_car_oc")
//   .post(verifyAccessTokenFirebase, isEmailVerified, InsuranceCarOCSubmit);
router
  .route("/submit/insurance_border")
  .post(verifyAccessTokenFirebase, isEmailVerified, InsuranceBorderSubmit);
router
  .route("/submit/insurance_health_medical")
  .post(
    verifyAccessTokenFirebase,
    isEmailVerified,
    InsuranceHealthMedicalSubmit
  );
router
  .route("/submit/insurance_health_specialist")
  .post(
    verifyAccessTokenFirebase,
    isEmailVerified,
    InsuranceHealthSpecialistSubmit
  );
router
  .route("/submit/insurance_travel")
  .post(verifyAccessTokenFirebase, isEmailVerified, InsuranceTravelSubmit);
router
  .route("/submit/insurance_estate")
  .post(verifyAccessTokenFirebase, isEmailVerified, InsuranceEstateSubmit);
router
  .route("/submit/loan_cash")
  .post(verifyAccessTokenFirebase, isEmailVerified, LoanCashSubmit);
router
  .route("/submit/loan_mortgage")
  .post(verifyAccessTokenFirebase, isEmailVerified, LoanMortgageSubmit);

router.route("/submit/ticket").post(TicketSubmit);

router
  .route("/files/:id/:type/:filename")
  .get(verifyAccessTokenFirebase, accessToImage, serveDocument);

export default router;
