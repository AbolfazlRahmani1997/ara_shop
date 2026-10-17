"use client";

import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { sortOptions } from "@/data/filters";
import { toPersianDigits } from "@/lib/format";
import type { ProductSort } from "@/types";

type ProductToolbarProps = {
  total: number;
  sort: ProductSort;
  layout: "grid" | "list";
  activeFilterCount: number;
  onSortChange: (sort: ProductSort) => void;
  onLayoutChange: (layout: "grid" | "list") => void;
  onOpenFilters: () => void;
};

export function ProductToolbar({
  total,
  sort,
  layout,
  activeFilterCount,
  onSortChange,
  onLayoutChange,
  onOpenFilters,
}: ProductToolbarProps) {
  return (
    <div className="mb-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink">
          {toPersianDigits(total)} محصول
        </p>

        <div className="hidden items-center gap-2 md:flex">
          <div className="inline-flex rounded-xl border border-line bg-white p-1">
            <button
              type="button"
              className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg ${layout === "grid" ? "bg-blush text-brand" : "text-muted"}`}
              aria-label="نمایش شبکه‌ای"
              aria-pressed={layout === "grid"}
              onClick={() => onLayoutChange("grid")}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              type="button"
              className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg ${layout === "list" ? "bg-blush text-brand" : "text-muted"}`}
              aria-label="نمایش لیستی"
              aria-pressed={layout === "list"}
              onClick={() => onLayoutChange("list")}
            >
              <List className="size-4" />
            </button>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted">مرتب‌سازی</span>
            <select
              value={sort}
              onChange={(event) =>
                onSortChange(event.target.value as ProductSort)
              }
              className="min-h-11 rounded-xl border border-line bg-white px-3 outline-none focus:ring-2 focus:ring-brand/30"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 md:hidden">
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-white text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          <SlidersHorizontal className="size-4" />
          فیلترها
          {activeFilterCount > 0 ? (
            <span className="rounded-full bg-brand px-1.5 text-[10px] font-bold text-white">
              {toPersianDigits(activeFilterCount)}
            </span>
          ) : null}
        </button>
        <label className="relative">
          <span className="sr-only">مرتب‌سازی</span>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as ProductSort)}
            className="min-h-11 w-full appearance-none rounded-xl border border-line bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
