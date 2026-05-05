import crypto from "crypto";
import { supabaseAdmin } from "../config/supabase.js";
import { sendSuccess, sendError } from "../utils/response.js";

const OTP_EXPIRY = 10 * 60 * 1000; // 10 minutes

// POST /api/auth/send-otp
export const sendOTP = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return sendError(res, "Phone number is required", 400);
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return sendError(res, "Invalid phone number", 400);
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY);

    // Store OTP in database
    const { error } = await supabaseAdmin
      .from("otp_verifications")
      .upsert(
        { phone, otp, expires_at: expiresAt.toISOString(), verified: false },
        { onConflict: "phone" },
      );

    if (error) {
      return sendError(res, "Failed to send OTP", 400);
    }

    // In production, integrate with SMS service (Twilio, AWS SNS, etc.)
    // For now, we log it (frontend should show a test OTP message in development)
    console.log(`[DEV] OTP for ${phone}: ${otp}`);

    return sendSuccess(
      res,
      { message: "OTP sent to phone number" },
      "OTP sent",
      200,
    );
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/verify-otp
export const verifyOTP = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return sendError(res, "Phone and OTP are required", 400);
    }

    const { data, error } = await supabaseAdmin
      .from("otp_verifications")
      .select("*")
      .eq("phone", phone)
      .single();

    if (error || !data) {
      return sendError(res, "Invalid phone number", 404);
    }

    // Check if OTP expired
    if (new Date() > new Date(data.expires_at)) {
      return sendError(res, "OTP has expired", 400);
    }

    // Check if OTP matches
    if (data.otp !== otp.toString()) {
      return sendError(res, "Invalid OTP", 400);
    }

    // Mark as verified
    const { error: updateError } = await supabaseAdmin
      .from("otp_verifications")
      .update({ verified: true })
      .eq("phone", phone);

    if (updateError) {
      return sendError(res, "Verification failed", 400);
    }

    // Generate a temporary token for inquiry access (valid for 1 day)
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await supabaseAdmin
      .from("phone_tokens")
      .upsert(
        { phone, token, expires_at: tokenExpiry.toISOString() },
        { onConflict: "phone" },
      );

    return sendSuccess(res, { phone, token }, "Phone verified successfully");
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/verify-token  [for checking if token is valid]
export const verifyPhoneToken = async (req, res, next) => {
  try {
    const { phone, token } = req.body;

    if (!phone || !token) {
      return sendError(res, "Phone and token are required", 400);
    }

    const { data, error } = await supabaseAdmin
      .from("phone_tokens")
      .select("*")
      .eq("phone", phone)
      .eq("token", token)
      .single();

    if (error || !data) {
      return sendError(res, "Invalid or expired token", 401);
    }

    if (new Date() > new Date(data.expires_at)) {
      return sendError(res, "Token expired", 401);
    }

    return sendSuccess(res, { valid: true }, "Token valid");
  } catch (err) {
    next(err);
  }
};
