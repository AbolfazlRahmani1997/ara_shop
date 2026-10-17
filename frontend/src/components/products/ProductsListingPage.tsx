"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { CatalogBreadcrumb } from "@/components/products/CatalogBreadcrumb";
import { CategoryHero } from "@/components/products/CategoryHero";
import { CategoryQuickFilters } from "@/components/products/CategoryQuickFilters";
import { ProductFilters } from "@/components/products/ProductFilters";
import { MobileFilters } from "@/components/products/MobileFilters";
import { ProductToolbar } from "@/components/products/ProductToolbar";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductGridSkeleton } from "@/components/products/ProductCardSkeleton";
import { Pagination } from "@/components/products/Pagination";
import { EmptyProducts } from "@/components/products/EmptyProducts";
import { AIAssistantBanner } from "@/components/products/AIAssistantBanner";
import { useProductFilters } from "@/hooks/useProductFilters";
import {
  getBrandCounts,
  getSubcategoryCounts,
  queryProducts,
} from "@/services/products";
import type { ProductQueryResult, ProductSort } from "@/types";

const PAGE_SIZE = 12;

export function ProductsListingPage() {
  const { filters, setFilters, clearFilters, activeFilterCount, defaults } =
    useProductFilters();
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const deferredFilters = useDeferredValue(filters);
  const loading = deferredFilters !== filters;

  const result = useMemo<ProductQueryResult>(() => {
    return queryProducts({
      page: deferredFilters.page,
      limit: PAGE_SIZE,
      category: deferredFilters.category || undefined,
      subcategory: deferredFilters.subcategory || undefined,
      brand: deferredFilters.brand.join(",") || undefined,
      skinType: deferredFilters.skinType.join(",") || undefined,
      feature: deferredFilters.feature.join(",") || undefined,
      minPrice: deferredFilters.minPrice,
      maxPrice: deferredFilters.maxPrice,
      sort: deferredFilters.sort,
    });
  }, [deferredFilters]);

  const brandCounts = useMemo(
    () => getBrandCounts(filters.category || undefined),
    [filters.category],
  );
  const subcategoryCounts = useMemo(
    () => getSubcategoryCounts(filters.category || "skincare"),
    [filters.category],
  );

  const items = result.items;
  const total = result.total;
  const totalPages = result.totalPages;
  const showSkincareChips =
    !filters.category || filters.category === "skincare";

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 sm:py-7 lg:px-10">
      <CatalogBreadcrumb category={filters.category} />
      <CategoryHero category={filters.category} />

      <CategoryQuickFilters
        visible={showSkincareChips}
        active={filters.subcategory}
        counts={subcategoryCounts}
        onSelect={(subcategory) => setFilters({ subcategory })}
      />

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
        <div className="hidden lg:block">
          <ProductFilters
            filters={filters}
            brandCounts={brandCounts}
            defaults={defaults}
            onChange={setFilters}
          />
        </div>

        <div className="min-w-0">
          <ProductToolbar
            total={total}
            sort={filters.sort}
            layout={layout}
            activeFilterCount={activeFilterCount}
            onSortChange={(sort: ProductSort) => setFilters({ sort })}
            onLayoutChange={setLayout}
            onOpenFilters={() => setMobileFiltersOpen(true)}
          />

          {loading ? <ProductGridSkeleton count={8} /> : null}

          {!loading && items.length === 0 ? (
            <EmptyProducts onClear={clearFilters} />
          ) : null}

          {!loading && items.length > 0 ? (
            <>
              <ProductGrid products={items} layout={layout} />
              <Pagination
                page={filters.page}
                totalPages={totalPages}
                onChange={(page) => setFilters({ page }, { resetPage: false })}
              />
            </>
          ) : null}
        </div>
      </div>

      <AIAssistantBanner />

      <MobileFilters
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        brandCounts={brandCounts}
        defaults={defaults}
        resultCount={total}
        onChange={setFilters}
        onClear={clearFilters}
      />
    </div>
  );
}
