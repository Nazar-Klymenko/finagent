import express from "express";
const router = express.Router();

import {
  signUp,
  signUpFacebook,
  verifyEmail,
} from "controllers/frontend/auth.js";

router.route("/signup").post(signUp);
router.route("/signup_facebook").post(signUpFacebook);
router.route("/verify_email").post(verifyEmail);

export default router;
