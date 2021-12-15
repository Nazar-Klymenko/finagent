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
} from "@controllers/admin/applicationActions.js";
import serveDocument from "@controllers/serveDocument";
import { verifyAdmin, verifySupervisor } from "@middleware/admin";
import { verifyAccessTokenFirebaseAdmin } from "@middleware/auth";
import { verifyAccessTokenFirebaseQueryAdmin } from "@middleware/auth";
import { accessToImage } from "@middleware/imageAcess";
import express from "express";

const router = express.Router();

export default router;
