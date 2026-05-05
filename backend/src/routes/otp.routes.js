import { Router } from "express";
import {
  sendOTP,
  verifyOTP,
  verifyPhoneToken,
} from "../controllers/otp.controller.js";

const router = Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/verify-token", verifyPhoneToken);

export default router;
