import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../../utils/constants';

const Categories = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--color-primary)]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-primary)] font-medium">
              Collections
            </span>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[var(--color-text)]">
              Browse by Category
            </h2>
            <p className="hidden md:block text-sm text-[var(--color-text-muted)] max-w-xs text-right leading-relaxed">
              Explore thoughtfully designed furniture collections crafted for global spaces.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group relative bg-[var(--color-background)] border border-[var(--color-border)] rounded-sm p-6 hover:bg-white hover:border-[var(--color-primary)]/40 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-3xl mb-5">{cat.icon}</div>

              {/* Name */}
              <h3 className="font-medium text-[var(--color-text)] text-sm leading-snug mb-2">
                {cat.name}
              </h3>

              {/* Tagline */}
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2 mb-4">
                {cat.tagline}
              </p>

              {/* Explore */}
              <div className="flex items-center gap-1 text-[var(--color-primary)] text-xs font-medium translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                <span>Explore</span>
                <ArrowRight size={11} />
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300 rounded-b-sm" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;