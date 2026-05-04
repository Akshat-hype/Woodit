import { useState } from 'react';
import { X } from 'lucide-react';
import { inquiryService } from '../../../services/inquiry.service';
import { isValidPhone } from '../../../utils/validators';
import Button from './Button';
import toast from 'react-hot-toast';

const PhoneGate = ({ product, onClose }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [productData, setProductData] = useState(null);

  const handleSubmit = async () => {
    if (!isValidPhone(phone)) {
      toast.error('Enter a valid 10-digit phone number');
      return;
    }

    try {
      setLoading(true);
      const res = await inquiryService.create({ phone, product_id: product.id });
      setProductData(res.data.data.product);
      setUnlocked(true);
      toast.success('Product details unlocked!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-sm w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
          <h3 className="font-serif text-lg font-semibold text-[var(--color-text)]">
            {unlocked ? product.name : 'View Product Details'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-[var(--color-background)] rounded">
            <X size={18} />
          </button>
        </div>

        {!unlocked ? (
          /* Phone Entry */
          <div className="p-6">
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              Enter your phone number to view product details. We'll reach out if you're interested.
            </p>
            <div className="flex gap-2 mb-2">
              <span className="flex items-center px-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-sm text-sm text-[var(--color-text-muted)]">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit mobile number"
                className="flex-1 px-4 py-3 border border-[var(--color-border)] rounded-sm text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              />
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mb-6">
              Your number is used only for inquiry purposes.
            </p>
            <Button onClick={handleSubmit} loading={loading} className="w-full">
              View Product
            </Button>
          </div>
        ) : (
          /* Product Details */
          <div className="p-6">
            {productData?.images?.length > 0 && (
              <img
                src={productData.images[0]}
                alt={productData.name}
                className="w-full aspect-video object-cover rounded-sm mb-4"
              />
            )}
            {productData?.description && (
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3">
                {productData.description}
              </p>
            )}
            {productData?.material && (
              <p className="text-xs text-[var(--color-text-muted)]">
                <span className="font-medium text-[var(--color-text)]">Material:</span> {productData.material}
              </p>
            )}
            <div className="flex gap-3 mt-6">
              <Button className="flex-1">Enquire Now</Button>
              <Button variant="outline" className="flex-1">
                WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneGate;