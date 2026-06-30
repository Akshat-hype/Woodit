import { useState } from 'react';
import { Eye } from 'lucide-react';
import PhoneGate from '../common/PhoneGate';

const ProductCard = ({ product }) => {
  const [showGate, setShowGate] = useState(false);
  const image = product.images?.[0] || null;

  return (
    <>
      <button
        type="button"
        className="group w-full overflow-hidden rounded-md border border-[var(--color-border)] bg-white text-left transition hover:-translate-y-1 hover:shadow-xl"
        onClick={() => setShowGate(true)}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#ddd2c3]">
          {image ? (
            <img
              src={image}
              alt={product.name}
              width="662"
              height="497"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[var(--color-accent-soft)] text-sm font-semibold text-[var(--color-accent)]">
              WoodIt
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-white">
              <Eye size={14} />
              View details
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="truncate text-sm font-semibold text-[var(--color-text)]">{product.name}</h3>
          {product.description && (
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--color-text-muted)]">{product.description}</p>
          )}
          {product.material && (
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-primary-dark)]">{product.material}</p>
          )}
        </div>
      </button>

      {showGate && <PhoneGate product={product} onClose={() => setShowGate(false)} />}
    </>
  );
};

export default ProductCard;
