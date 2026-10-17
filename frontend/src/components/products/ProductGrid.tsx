import type { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";

type ProductGridProps = {
  products: Product[];
  layout: "grid" | "list";
};

export function ProductGrid({ products, layout }: ProductGridProps) {
  if (layout === "list") {
    return (
      <div className="space-y-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} layout="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
