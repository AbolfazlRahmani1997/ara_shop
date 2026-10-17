"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProductSort } from "@/types";

export type ListingFilters = {
  category: string;
  subcategory: string;
  brand: string[];
  skinType: string[];
  feature: string[];
  minPrice: number;
  maxPrice: number;
  sort: ProductSort;
  page: number;
};

const DEFAULT_MIN = 100_000;
const DEFAULT_MAX = 3_000_000;

function parseList(value: string | null) {
  return value ? value.split(",").filter(Boolean) : [];
}

export function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo<ListingFilters>(() => {
    return {
      category: searchParams.get("category") ?? "",
      subcategory: searchParams.get("subcategory") ?? "",
      brand: parseList(searchParams.get("brand")),
      skinType: parseList(searchParams.get("skinType")),
      feature: parseList(searchParams.get("feature")),
      minPrice: Number(searchParams.get("minPrice") ?? DEFAULT_MIN),
      maxPrice: Number(searchParams.get("maxPrice") ?? DEFAULT_MAX),
      sort: (searchParams.get("sort") as ProductSort) || "popular",
      page: Math.max(1, Number(searchParams.get("page") ?? 1)),
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (patch: Partial<ListingFilters>, options?: { resetPage?: boolean }) => {
      const next = new URLSearchParams(searchParams.toString());
      const merged: ListingFilters = {
        ...filters,
        ...patch,
        page:
          options?.resetPage === false
            ? (patch.page ?? filters.page)
            : (patch.page ?? 1),
      };

      const entries: Array<[string, string | undefined]> = [
        ["category", merged.category || undefined],
        ["subcategory", merged.subcategory || undefined],
        ["brand", merged.brand.length ? merged.brand.join(",") : undefined],
        [
          "skinType",
          merged.skinType.length ? merged.skinType.join(",") : undefined,
        ],
        [
          "feature",
          merged.feature.length ? merged.feature.join(",") : undefined,
        ],
        [
          "minPrice",
          merged.minPrice !== DEFAULT_MIN ? String(merged.minPrice) : undefined,
        ],
        [
          "maxPrice",
          merged.maxPrice !== DEFAULT_MAX ? String(merged.maxPrice) : undefined,
        ],
        ["sort", merged.sort !== "popular" ? merged.sort : undefined],
        ["page", merged.page > 1 ? String(merged.page) : undefined],
      ];

      for (const [key] of entries) next.delete(key);
      for (const [key, value] of entries) {
        if (value) next.set(key, value);
      }

      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [filters, pathname, router, searchParams],
  );

  const clearFilters = useCallback(() => {
    const category = filters.category;
    const next = new URLSearchParams();
    if (category) next.set("category", category);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [filters.category, pathname, router]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.subcategory) count += 1;
    count += filters.brand.length;
    count += filters.skinType.length;
    count += filters.feature.length;
    if (filters.minPrice !== DEFAULT_MIN) count += 1;
    if (filters.maxPrice !== DEFAULT_MAX) count += 1;
    return count;
  }, [filters]);

  return {
    filters,
    setFilters,
    clearFilters,
    activeFilterCount,
    defaults: { min: DEFAULT_MIN, max: DEFAULT_MAX },
  };
}
