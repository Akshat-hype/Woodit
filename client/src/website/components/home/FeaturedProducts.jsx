import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useFetch from '../../../hooks/useFetch';
import { productService } from '../../../services/product.service';
import ProductCard from '../product/ProductCard';
import Loader from '../common/Loader';

const FeaturedProducts = () => {
  const { data, loading } = useFetch(
    () => productService.getAll({ featured: true }),
    []
  );

  const products = data?.products || [];

  if (loading) return <Loader />;
  if (!products.length) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-px bg-[var(--color-primary)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">Handpicked</span>
            </div>
            <h2 className="font-serif text-4xl font-semibold text-[var(--color-text)]">
              Featured Products
            </h2>
          </div>
          <Link
            to="/category/chair-gallery"
            className="hidden md:flex items-center gap-2 text-sm text-[var(--color-primary)] font-medium hover:gap-3 transition-all"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;