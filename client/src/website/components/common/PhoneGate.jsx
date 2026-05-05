import { useState } from "react";
import { MessageCircle, X, AlertCircle, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { otpService } from "../../../services/otp.service";
import { inquiryService } from "../../../services/inquiry.service";
import { WHATSAPP_LINK } from "../../../utils/constants";
import { isValidPhone } from "../../../utils/validators";
import Button from "./Button";

const PhoneGate = ({ product, onClose }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("phone"); // 'phone' | 'otp' | 'unlocked'
  const [productData, setProductData] = useState(product);
  const [resendTimer, setResendTimer] = useState(0);

  const handleSendOTP = async () => {
    if (!isValidPhone(phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      await otpService.sendOTP(phone);
      setStep("otp");
      toast.success("OTP sent to your phone number");

      // Start resend timer (30 seconds)
      setResendTimer(30);
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await otpService.verifyOTP(phone, otp);
      const verifiedToken = res.data.data.token;

      // Now create the inquiry with the token
      const inquiryRes = await inquiryService.create({
        phone,
        product_id: product.id,
        token: verifiedToken,
      });

      setProductData(inquiryRes.data.data.product);
      setStep("unlocked");
      toast.success("Phone verified! Product details unlocked.");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
      if (err.response?.status === 401) {
        setStep("phone");
        setOtp("");
      }
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = `Hello, I am interested in ${productData?.name || product.name}. My phone number is +91${phone}.`;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/55 px-0 sm:items-center sm:px-4">
      <div className="max-h-[92svh] w-full overflow-y-auto rounded-t-lg bg-white shadow-2xl sm:mx-auto sm:max-w-2xl sm:rounded-md">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-border)] bg-white px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
              {step === "unlocked" ? "Product Details" : "Verify & Unlock"}
            </p>
            <h3 className="mt-1 font-serif text-xl font-semibold text-[var(--color-text)]">
              {product.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 items-center justify-center rounded-sm hover:bg-[var(--color-background)]"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {step === "phone" && (
          <div className="p-5 sm:p-6">
            <div className="rounded-sm bg-blue-50 p-4 flex gap-3 mb-4">
              <AlertCircle
                size={20}
                className="text-blue-600 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-blue-800">
                We'll send a one-time password (OTP) to verify your phone
                number.
              </p>
            </div>

            <p className="text-sm leading-6 text-[var(--color-text-muted)]">
              Enter your phone number to view full product details and create an
              inquiry with WoodIt.
            </p>
            <div className="mt-6 flex gap-2">
              <span className="flex min-h-12 items-center rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] px-3 text-sm text-[var(--color-text-muted)]">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value.replace(/\D/g, ""))
                }
                placeholder="10-digit mobile number"
                className="min-h-12 min-w-0 flex-1 rounded-sm border border-[var(--color-border)] px-4 text-sm outline-none transition-colors focus:border-[var(--color-primary)]"
                onKeyDown={(event) => event.key === "Enter" && handleSendOTP()}
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--color-text-muted)]">
              Your phone number is used only for inquiry and follow-up
              communication.
            </p>
            <Button
              onClick={handleSendOTP}
              loading={loading}
              className="mt-6 w-full"
            >
              Send OTP
            </Button>
          </div>
        )}

        {step === "otp" && (
          <div className="p-5 sm:p-6">
            <div className="rounded-sm bg-green-50 p-4 flex gap-3 mb-4">
              <CheckCircle
                size={20}
                className="text-green-600 flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="text-sm font-semibold text-green-800">
                  OTP sent!
                </p>
                <p className="text-sm text-green-700">
                  Check your SMS for the verification code.
                </p>
              </div>
            </div>

            <p className="text-sm text-[var(--color-text-muted)]">
              Enter the 6-digit code sent to{" "}
              <span className="font-semibold">+91{phone}</span>
            </p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(event) =>
                setOtp(event.target.value.replace(/\D/g, ""))
              }
              placeholder="000000"
              className="mt-4 w-full min-h-12 rounded-sm border border-[var(--color-border)] px-4 text-center text-2xl font-mono tracking-widest outline-none transition-colors focus:border-[var(--color-primary)]"
              onKeyDown={(event) => event.key === "Enter" && handleVerifyOTP()}
            />
            <p className="mt-4 text-center text-xs text-[var(--color-text-muted)]">
              {resendTimer > 0 ? (
                `Resend available in ${resendTimer}s`
              ) : (
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="text-[var(--color-primary)] hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button
                onClick={handleVerifyOTP}
                loading={loading}
                className="w-full"
              >
                Verify OTP
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setStep("phone");
                  setPhone("");
                  setOtp("");
                }}
              >
                Use Different Number
              </Button>
            </div>
          </div>
        )}

        {step === "unlocked" && (
          <div className="grid gap-5 p-5 sm:grid-cols-[0.95fr_1.05fr] sm:p-6">
            <div className="overflow-hidden rounded-md bg-[var(--color-background)]">
              {productData?.images?.[0] ? (
                <img
                  src={productData.images[0]}
                  alt={productData.name}
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center text-sm font-semibold text-[var(--color-accent)]">
                  WoodIt
                </div>
              )}
            </div>
            <div>
              <p className="text-sm leading-7 text-[var(--color-text-muted)]">
                {productData?.description ||
                  "Full product information is available through the WoodIt team."}
              </p>
              {productData?.material && (
                <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                  <span className="font-semibold text-[var(--color-text)]">
                    Material:
                  </span>{" "}
                  {productData.material}
                </p>
              )}
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={WHATSAPP_LINK(whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className="w-full bg-[var(--color-accent)] hover:bg-[#26594c]">
                    <MessageCircle size={18} />
                    Contact on WhatsApp
                  </Button>
                </a>
                <Button variant="outline" className="w-full" onClick={onClose}>
                  Continue Browsing
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneGate;
