import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsListingPage } from "@/components/products/ProductsListingPage";
import { ProductGridSkeleton } from "@/components/products/ProductCardSkeleton";

export const metadata: Metadata = {
  title: "محصولات",
  description: "فروشگاه محصولات زیبایی آرا — فیلتر، مرتب‌سازی و پیشنهاد هوشمند.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
          <ProductGridSkeleton count={8} />
        </div>
      }
    >
      <ProductsListingPage />
    </Suspense>
  );
}
