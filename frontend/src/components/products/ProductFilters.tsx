"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { brands } from "@/data/brands";
import {
  featureOptions,
  skinTypeOptions,
  skincareSubcategories,
} from "@/data/filters";
import { formatPrice, toPersianDigits } from "@/lib/format";
import type { ListingFilters } from "@/hooks/useProductFilters";
import { BrandLogo } from "@/components/BrandLogo";

type ProductFiltersProps = {
  filters: ListingFilters;
  brandCounts: Map<string, number>;
  defaults: { min: number; max: number };
  onChange: (
    patch: Partial<ListingFilters>,
    options?: { resetPage?: boolean },
  ) => void;
};

export function ProductFilters({
  filters,
  brandCounts,
  defaults,
  onChange,
}: ProductFiltersProps) {
  function toggleList(
    key: "brand" | "skinType" | "feature",
    value: string,
  ) {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    onChange({ [key]: next });
  }

  const showSkincareSubs =
    !filters.category || filters.category === "skincare";

  return (
    <aside className="space-y-3">
      {showSkincareSubs ? (
        <FilterSection title="دسته‌بندی" defaultOpen>
          <div className="space-y-1">
            {skincareSubcategories.map((item) => (
              <label
                key={item.id}
                className="flex min-h-11 cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="radio"
                  name="subcategory"
                  checked={filters.subcategory === item.id}
                  onChange={() => onChange({ subcategory: item.id })}
                  className="size-4 accent-brand"
                />
                <span>{item.title}</span>
              </label>
            ))}
            <button
              type="button"
              className="mt-1 text-xs text-brand"
              onClick={() => onChange({ subcategory: "" })}
            >
              پاک کردن دسته
            </button>
          </div>
        </FilterSection>
      ) : null}

      <FilterSection title="برند" defaultOpen>
        <div className="space-y-1">
          {brands
            .filter((brand) => (brandCounts.get(brand.id) ?? 0) > 0)
            .map((brand) => (
              <label
                key={brand.id}
                className="flex min-h-11 cursor-pointer items-center justify-between gap-2 text-sm"
              >
                <span className="inline-flex min-w-0 items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.brand.includes(brand.id)}
                    onChange={() => toggleList("brand", brand.id)}
                    className="size-4 shrink-0 rounded accent-brand"
                  />
                  <BrandLogo
                    brand={brand}
                    className="h-5 max-w-[72px] opacity-90"
                  />
                  <span className="truncate">{brand.name}</span>
                </span>
                <span className="text-xs text-muted">
                  ({toPersianDigits(brandCounts.get(brand.id) ?? 0)})
                </span>
              </label>
            ))}
        </div>
      </FilterSection>

      <FilterSection title="محدوده قیمت" defaultOpen>
        <div className="space-y-3 pt-1">
          <div className="flex justify-between text-xs text-muted">
            <span>از {formatPrice(filters.minPrice)}</span>
            <span>تا {formatPrice(filters.maxPrice)}</span>
          </div>
          <label className="block text-xs text-muted">
            حداقل
            <input
              type="range"
              min={defaults.min}
              max={defaults.max}
              step={50_000}
              value={filters.minPrice}
              onChange={(event) =>
                onChange({
                  minPrice: Math.min(
                    Number(event.target.value),
                    filters.maxPrice,
                  ),
                })
              }
              className="mt-2 w-full accent-brand"
            />
          </label>
          <label className="block text-xs text-muted">
            حداکثر
            <input
              type="range"
              min={defaults.min}
              max={defaults.max}
              step={50_000}
              value={filters.maxPrice}
              onChange={(event) =>
                onChange({
                  maxPrice: Math.max(
                    Number(event.target.value),
                    filters.minPrice,
                  ),
                })
              }
              className="mt-2 w-full accent-brand"
            />
          </label>
        </div>
      </FilterSection>

      <FilterSection title="نوع پوست" defaultOpen>
        <div className="space-y-1">
          {skinTypeOptions.map((item) => (
            <label
              key={item.id}
              className="flex min-h-11 cursor-pointer items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={filters.skinType.includes(item.id)}
                onChange={() => toggleList("skinType", item.id)}
                className="size-4 rounded accent-brand"
              />
              {item.label}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="ویژگی‌ها" defaultOpen>
        <div className="space-y-1">
          {featureOptions.map((item) => (
            <label
              key={item.id}
              className="flex min-h-11 cursor-pointer items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={filters.feature.includes(item.id)}
                onChange={() => toggleList("feature", item.id)}
                className="size-4 rounded accent-brand"
              />
              {item.label}
            </label>
          ))}
        </div>
      </FilterSection>
    </aside>
  );
}

function FilterSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-line bg-white">
      <button
        type="button"
        className="flex min-h-12 w-full items-center justify-between px-4 text-sm font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {title}
        <ChevronDown
          className={`size-4 transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? <div className="border-t border-line px-4 py-3">{children}</div> : null}
    </div>
  );
}
