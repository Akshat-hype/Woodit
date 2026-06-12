import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../../utils/constants';
import theChairGallery from '../../../assets/images/the-chair-gallery.webp';
import urbanMetalSeating from '../../../assets/images/urban-metal-seating.webp';
import theHighSeatCollection from '../../../assets/images/the-high-seat-collection.webp';
import signatureSeating from '../../../assets/images/signature-seating.webp';
import diningAndLivingEnsembles from '../../../assets/images/dining-and-living-ensembles.webp';
import signatureBedroomSets from '../../../assets/images/signature-bedroom-sets.webp';
import openAirCollection from '../../../assets/images/open-air-collection.webp';
import cabinetsAndSideTables from '../../../assets/images/cabinets-and-side-tables.webp';

const categoryImages = [theChairGallery, urbanMetalSeating, theHighSeatCollection, signatureSeating, diningAndLivingEnsembles, signatureBedroomSets, openAirCollection, cabinetsAndSideTables];

const Categories = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="page-shell">
        <div className="mb-10 grid gap-4 md:grid-cols-[1fr_360px] md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">Collections</p>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--color-text)] sm:text-5xl">
              Browse by Category
            </h2>
          </div>
          <p className="text-sm leading-6 text-[var(--color-text-muted)]">
            Furniture collections organized for hospitality buyers, interior projects, and custom residential spaces.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat, index) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-background)] transition hover:-translate-y-1 hover:border-[var(--color-primary)]/40 hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#ddd2c3]">
                <img
                  src={categoryImages[index]}
                  alt={cat.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-base font-semibold leading-snug text-[var(--color-text)]">{cat.name}</h3>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--color-text-muted)]">{cat.tagline}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-primary-dark)]">
                  Explore <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
