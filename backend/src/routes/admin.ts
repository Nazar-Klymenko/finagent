import express, { Router } from "express";
const router: Router = express.Router();

import { signUp, getUser } from "controllers/admin/auth";
import {
  getAllAplications,
  assignApplication,
} from "controllers/admin/applicationActions";

import { verifyAccessTokenFirebase, verifyAdmin } from "middleware/auth";

router.route("/auth/signup").post(signUp);
router.route("/auth/user").get(verifyAccessTokenFirebase, getUser);

router
  .route("/applications")
  .get(verifyAccessTokenFirebase, verifyAdmin, getAllAplications);
router
  .route("/applications/assign/:id")
  .post(verifyAccessTokenFirebase, verifyAdmin, assignApplication);

export default router;
