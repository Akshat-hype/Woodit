import ProductCard from "../components/product/ProductCard";

const categories = [
  { name: "Almera", path: "/almera" },
  { name: "Chairs & Sofa", path: "/chairs-sofa" },
  { name: "Beds & Bed Sets", path: "/beds" },
  { name: "Beach / Bar", path: "/beach-bar" },
  { name: "Complete Room", path: "/complete-room" },
  { name: "Miscellaneous", path: "/miscellaneous" },
];

const showcasedProducts = [
  {
    id: 1,
    name: "Oak Lounge Chair",
    shortDesc: "Handcrafted solid oak",
  },
  {
    id: 2,
    name: "Luxury Wooden Bed",
    shortDesc: "Strength meets elegance",
  },
  {
    id: 3,
    name: "Bar Stool Set",
    shortDesc: "Designed for hospitality",
  },
];

export default function Categories() {
  return (
    <>
      {/* =========================
          HERO WITH CATEGORIES
         ========================= */}
      <section className="relative overflow-hidden">
        {/* surface layer */}
        <div className="absolute inset-0 bg-[var(--wood-surface)]/20" />

        <div className="relative z-10 px-12 py-32 text-center">
          <h1 className="text-3xl md:text-5xl font-semibold">

            Our Categories
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg opacity-70">
            Explore our handcrafted wooden furniture collections designed
            for homes, hotels, and premium interiors.
          </p>

          {/* CATEGORY BUTTONS */}
          <div className="mt-10 flex gap-3 overflow-x-auto px-1 justify-start md:justify-center">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={cat.path}
                className="whitespace-nowrap rounded-full bg-[var(--wood-base)] px-5 py-2.5 text-sm font-medium transition hover:bg-[var(--wood-surface)]/30"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          SHOWCASED FURNITURE
         ========================= */}
      <section className="px-12 py-28">
        <h2 className="mb-16 text-center text-3xl font-semibold">
          Showcased Furniture
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {showcasedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => {}}
            />
          ))}
        </div>
      </section>
    </>
  );
}
