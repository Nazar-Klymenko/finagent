import {
  signUp,
  signUpFacebook,
  verifyEmail,
} from "@controllers/frontend/auth.js";
import express from "express";

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signup_facebook").post(signUpFacebook);
router.route("/verify_email").post(verifyEmail);

export default router;
