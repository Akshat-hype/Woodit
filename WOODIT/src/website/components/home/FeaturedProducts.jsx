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

  if (loading) {
    return (
      <section className="bg-[var(--color-background)] py-16">
        <Loader />
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="bg-[var(--color-background)] py-16 sm:py-20">
      <div className="page-shell">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">Handpicked</p>
            <h2 className="font-serif text-4xl font-semibold text-[var(--color-text)]">Featured Products</h2>
          </div>
          <Link
            to="/category/chair-gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary-dark)]"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
