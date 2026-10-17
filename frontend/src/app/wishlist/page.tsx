"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { useWishlist } from "@/hooks/useWishlist";
import { getProductById } from "@/data/products";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const wishlist = ids
    .map((id) => getProductById(id))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <PageHeader
        eyebrow="WISHLIST"
        title="علاقه‌مندی‌ها"
        description="محصولاتی که برای بعد ذخیره کردی."
        actions={
          <Link href="/products">
            <Button variant="secondary">مشاهده فروشگاه</Button>
          </Link>
        }
      />

      {wishlist.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <p className="font-bold text-ink">هنوز چیزی ذخیره نکردی</p>
          <Link href="/products" className="mt-4 inline-block text-brand">
            رفتن به محصولات
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product) =>
            product ? (
              <ProductCard key={product.id} product={product} />
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
