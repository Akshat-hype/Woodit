import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, COLLECTIONS_COPY } from '../../utils/constants';
import chairImage from '../../assets/images/categories-accent-chair.webp';
import sofaImage from '../../assets/images/categories-lounge-sofa-set.webp';
import stoolImage from '../../assets/images/categories-folding-butterfly-chair.webp';
import bedImage from '../../assets/images/categories-heritage-canopy-bed.webp';
import cabinetImage from '../../assets/images/categories-cabinet-chest-of-drawers.webp';
import outdoorImage from '../../assets/images/categories-handwoven-rope-lounge-chair.webp';

const categoryImages = [chairImage, sofaImage, stoolImage, bedImage, outdoorImage, cabinetImage, chairImage, cabinetImage];

const Categories = () => (
  <main>
    <section className="bg-[#171310] py-16 text-white sm:py-20">
      <div className="page-shell text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-light)]">Collections</p>
        <h1 className="font-serif text-5xl font-semibold leading-tight sm:text-6xl">{COLLECTIONS_COPY.title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70">{COLLECTIONS_COPY.supportingLine}</p>
      </div>
    </section>

    <section className="py-12 sm:py-16">
      <div className="page-shell">
        <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="shrink-0 rounded-sm border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-text)]"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category, index) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="group overflow-hidden rounded-md border border-[var(--color-border)] bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img src={categoryImages[index]} alt={category.name} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-5">
                <h2 className="text-base font-semibold text-[var(--color-text)]">{category.name}</h2>
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-[var(--color-text-muted)]">{category.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-primary-dark)]">
                  View Collection <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default Categories;
