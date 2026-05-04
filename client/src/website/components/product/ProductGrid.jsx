import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onProductClick }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
}
