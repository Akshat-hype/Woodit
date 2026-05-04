import { useState } from 'react';
import { Eye } from 'lucide-react';
import PhoneGate from '../common/PhoneGate';

const ProductCard = ({ product }) => {
  const [showGate, setShowGate] = useState(false);

  const image = product.images?.[0] || null;

  return (
    <>
      <div
        className="group bg-white border border-[var(--color-border)] rounded-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
        onClick={() => setShowGate(true)}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-background)]">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl">🪑</span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3">
              <Eye size={18} className="text-[var(--color-text)]" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-medium text-[var(--color-text)] text-sm mb-1 truncate">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
          <div className="mt-4 flex items-center gap-1 text-[var(--color-primary)] text-xs font-medium">
            <Eye size={12} />
            <span>View Details</span>
          </div>
        </div>
      </div>

      {showGate && (
        <PhoneGate
          product={product}
          onClose={() => setShowGate(false)}
        />
      )}
    </>
  );
};

export default ProductCard;