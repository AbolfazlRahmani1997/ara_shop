import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { BrandLogo } from "@/components/BrandLogo";
import { brands } from "@/data/brands";
import { products } from "@/data/products";
import { toPersianDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "برندها",
};

export default function BrandsPage() {
  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <PageHeader
        eyebrow="BRANDS"
        title="برندهای آرا"
        description="برندهای معتبر مراقبت پوست، آرایش و عطر با ضمانت اصالت."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => {
          const count = products.filter((p) => p.brandId === brand.id).length;
          return (
            <Link
              key={brand.id}
              href={`/products?brand=${brand.id}`}
              className="rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(25,23,23,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              <div className="mb-4 flex h-16 items-center justify-center rounded-xl bg-[#FBF8F6] px-4">
                <BrandLogo brand={brand} className="max-h-10 max-w-[180px]" />
              </div>
              <p className="text-lg font-extrabold text-ink">{brand.name}</p>
              <p className="mt-1 text-xs text-muted">{brand.country}</p>
              <p className="mt-3 text-sm leading-7 text-muted-strong">
                {brand.description}
              </p>
              <p className="mt-4 text-sm font-medium text-brand">
                {toPersianDigits(count)} محصول
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
