import { useState } from "react";
import { MessageCircle, X, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { inquiryService } from "../../../services/inquiry.service";
import { WHATSAPP_LINK } from "../../../utils/constants";
import { isValidPhone } from "../../../utils/validators";
import Button from "./Button";

const PhoneGate = ({ product, onClose }) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("phone"); // 'phone' | 'unlocked'
  const [productData, setProductData] = useState(product);

  const handleUnlock = async () => {
    if (!isValidPhone(phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      const inquiryRes = await inquiryService.create({
        phone,
        product_id: product.id,
      });

      setProductData(inquiryRes.data.data.product);
      setStep("unlocked");
      toast.success("Product details unlocked.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not unlock product");
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
              {step === "unlocked" ? "Product Details" : "Share Contact & Unlock"}
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
                Share your phone number to unlock product details and create an
                inquiry with WoodIt.
              </p>
            </div>

            <p className="text-sm leading-6 text-[var(--color-text-muted)]">
              Our team may use this number only to follow up about this product
              inquiry.
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
                onKeyDown={(event) => event.key === "Enter" && handleUnlock()}
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--color-text-muted)]">
              Your phone number is used only for inquiry and follow-up
              communication.
            </p>
            <Button
              onClick={handleUnlock}
              loading={loading}
              className="mt-6 w-full"
            >
              Unlock Details
            </Button>
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
