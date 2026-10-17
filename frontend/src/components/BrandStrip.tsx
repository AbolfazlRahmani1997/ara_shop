import Link from "next/link";
import { brands } from "@/data/brands";
import { BrandLogo } from "@/components/BrandLogo";

export function BrandStrip() {
  return (
    <section
      id="brands"
      className="mx-auto max-w-[1360px] px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-[65px]"
      aria-labelledby="brands-heading"
    >
      <div className="mb-6 flex items-end justify-between gap-3 sm:mb-8">
        <h2
          id="brands-heading"
          className="text-xl font-extrabold text-ink sm:text-2xl"
        >
          برندهای معتبر و محبوب
        </h2>
        <Link
          href="/brands"
          className="text-sm font-medium text-brand transition hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          مشاهده همه
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/products?brand=${brand.id}`}
            className="flex h-[88px] min-w-[132px] shrink-0 items-center justify-center rounded-2xl border border-line bg-white px-4 py-3 transition hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-[0_10px_24px_rgba(25,23,23,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:min-w-0"
            title={brand.name}
          >
            <BrandLogo brand={brand} className="max-h-10 max-w-full" />
          </Link>
        ))}
      </div>
    </section>
  );
}
