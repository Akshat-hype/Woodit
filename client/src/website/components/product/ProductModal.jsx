import { useState, useEffect } from "react";
import Button from "../common/Button";
import { savePhone, getPhone } from "../../../utils/phoneStorage";
import { saveInquiry } from "../../../utils/inquiryStorage";

export default function ProductModal({ product, category, onClose }) {
  const [phone, setPhone] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const savedPhone = getPhone();
    if (savedPhone) {
      setPhone(savedPhone);
      setUnlocked(true);
    }
  }, []);

  if (!product) return null;

  const handleContinue = () => {
    savePhone(phone);
    setUnlocked(true);
  };

  const handleInquiry = () => {
    saveInquiry({
      phone,
      productName: product.name,
      category,
      timestamp: new Date().toISOString(),
    });

    console.log("Inquiry saved");

    window.open("https://wa.me/91XXXXXXXXXX", "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-[var(--wood-base)] p-6 md:p-8 mx-4">
        {!unlocked ? (
          <>
            <h2 className="mb-4 text-2xl font-semibold">
              View Product Details
            </h2>

            <p className="mb-6 text-sm opacity-70">
              Please enter your phone number to continue.
            </p>

            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mb-6 w-full rounded-xl bg-[var(--wood-surface)]/10 px-4 py-3 outline-none"
            />

            <Button
              onClick={handleContinue}
              disabled={phone.length < 10}
              className="w-full"
            >
              Continue
            </Button>
          </>
        ) : (
          <>
            <h2 className="mb-2 text-2xl font-semibold">
              {product.name}
            </h2>

            <p className="mb-6 opacity-70">
              {product.description}
            </p>

            <Button className="w-full" onClick={handleInquiry}>
              Contact on WhatsApp
            </Button>
          </>
        )}

        <button
          onClick={onClose}
          className="mt-6 block w-full text-sm opacity-60 hover:opacity-100"
        >
          Close
        </button>
      </div>
    </div>
  );
}
