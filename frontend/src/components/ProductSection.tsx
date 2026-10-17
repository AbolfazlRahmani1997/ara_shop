import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function ProductSection() {
  const featured = products.slice(0, 4);

  return (
    <section
      id="products"
      className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-[70px]"
      aria-labelledby="products-heading"
    >
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <h2
            id="products-heading"
            className="text-2xl font-extrabold text-ink sm:text-[32px]"
          >
            محصولات پیشنهادی
          </h2>
          <p className="mt-1 text-sm text-muted sm:text-base">
            منتخب آرا بر اساس نیازهای شما
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex min-h-11 items-center gap-1 text-xs font-medium text-brand transition hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:text-sm"
        >
          مشاهده همه
          <ArrowLeft className="size-4" aria-hidden />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 lg:gap-[18px]">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
