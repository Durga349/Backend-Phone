import { Router } from "express";
import userValidator from "../validators/user.validator.js";
import { sendOtp, verifyOtp } from "../controllers/user.controller.js";

const router = Router();
router.route("/send-otp").post(userValidator, sendOtp);
router.route("/verify-otp").post(userValidator, verifyOtp);

export default router;
