"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { searchProducts } from "@/data/products";
import { Button } from "@/components/ui/Button";

export function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initial = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initial);

  const results = useMemo(() => searchProducts(initial), [initial]);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <PageHeader
        eyebrow="SEARCH"
        title="جستجو"
        description="محصول، برند یا نیاز پوستی‌ات را پیدا کن."
      />

      <form onSubmit={onSubmit} className="mb-8">
        <label className="relative block max-w-2xl">
          <span className="sr-only">عبارت جستجو</span>
          <Search className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="مثلاً نیاسینامید، ضدآفتاب، CeraVe..."
            className="h-14 w-full rounded-2xl border border-line bg-white pr-12 pl-4 text-base outline-none focus:border-brand-muted focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <Button type="submit" className="mt-3">
          جستجو
        </Button>
      </form>

      {initial ? (
        <p className="mb-5 text-sm text-muted">
          نتیجه برای «{initial}»: {results.length} محصول
        </p>
      ) : (
        <p className="mb-5 text-sm text-muted">همه محصولات</p>
      )}

      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <p className="font-bold text-ink">نتیجه‌ای پیدا نشد</p>
          <Link href="/products" className="mt-3 inline-block text-brand">
            مشاهده همه محصولات
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
