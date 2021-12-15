import express from "express";
const router = express.Router();

import { signUp, fetchUser } from "controllers/admin/auth";
import { verifyAccessTokenFirebaseAdmin } from "middleware/auth";

router.route("/signup").post(signUp);
router.route("/current").get(verifyAccessTokenFirebaseAdmin, fetchUser);

export default router;
