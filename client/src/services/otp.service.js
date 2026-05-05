import api from "./api";

export const otpService = {
  sendOTP: (phone) => api.post("/otp/send-otp", { phone }),
  verifyOTP: (phone, otp) => api.post("/otp/verify-otp", { phone, otp }),
  verifyToken: (phone, token) =>
    api.post("/otp/verify-token", { phone, token }),
};
