import { signUp, fetchUser } from "@controllers/admin/auth";
import { verifyAccessTokenFirebaseAdmin } from "@middleware/auth";
import express from "express";

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/current").get(verifyAccessTokenFirebaseAdmin, fetchUser);

export default router;
