import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { categoryService } from "../../services/category.service";
import { productService } from "../../services/product.service";
import { CATEGORIES } from "../../utils/constants";
import Loader from "../components/common/Loader";
import ProductGrid from "../components/product/ProductGrid";

const CategoryPage = () => {
  const { slug } = useParams();
  const fallback = useMemo(
    () => CATEGORIES.find((item) => item.slug === slug),
    [slug],
  );
  const [category, setCategory] = useState(fallback);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerLoaded, setBannerLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([
      categoryService.getBySlug(slug),
      productService.getAll({ category: slug }),
    ])
      .then(([categoryResult, productResult]) => {
        setCategory(categoryResult.value?.data?.data?.category ?? fallback);
        setProducts(productResult.value?.data?.data?.products ?? []);
      })
      .finally(() => setLoading(false));
  }, [slug, fallback]);

  return (
    <div>
      <section className="relative flex min-h-[320px] items-end bg-[#171310] text-white sm:min-h-[380px]">
        {category?.banner_url && (
          <img
            src={category.banner_url}
            alt={category.name}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setBannerLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${bannerLoaded ? "opacity-55" : "opacity-0"}`}
          />
        )}
        <div className="page-shell relative py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-light)]">
            Collection
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-6xl">
            {category?.name ?? "Category"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
            {category?.heroSubtitle ??
              category?.tagline ??
              "Browse WoodIt products and unlock details with your phone number."}
          </p>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-14">
        <div className="page-shell grid gap-5 md:grid-cols-[0.7fr_1fr] md:items-start">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
              Collection Intro
            </p>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-[var(--color-text)] sm:text-4xl">
              {category?.introHeading ?? category?.name}
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--color-text-muted)]">
            {category?.introText ??
              "Explore thoughtfully designed furniture collections crafted for global spaces and modern interiors."}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="page-shell">
          {loading ? (
            <Loader />
          ) : products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="rounded-sm border border-dashed border-[var(--color-border)] bg-white p-10 text-center text-sm text-[var(--color-text-muted)]">
              Products for this category will appear here.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
