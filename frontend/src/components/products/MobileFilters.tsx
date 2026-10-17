"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductFilters } from "@/components/products/ProductFilters";
import type { ListingFilters } from "@/hooks/useProductFilters";
import { toPersianDigits } from "@/lib/format";

type MobileFiltersProps = {
  open: boolean;
  onClose: () => void;
  filters: ListingFilters;
  brandCounts: Map<string, number>;
  defaults: { min: number; max: number };
  resultCount: number;
  onChange: (
    patch: Partial<ListingFilters>,
    options?: { resetPage?: boolean },
  ) => void;
  onClear: () => void;
};

export function MobileFilters({
  open,
  onClose,
  filters,
  brandCounts,
  defaults,
  resultCount,
  onChange,
  onClear,
}: MobileFiltersProps) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="فیلترها">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="بستن فیلترها"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-[24px] bg-cream shadow-2xl motion-safe:animate-[toastIn_250ms_ease-out]">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="text-base font-extrabold text-ink">فیلترها</h2>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            aria-label="بستن"
            onClick={onClose}
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <ProductFilters
            filters={filters}
            brandCounts={brandCounts}
            defaults={defaults}
            onChange={onChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-line bg-white px-4 py-3">
          <Button variant="secondary" className="min-h-11" onClick={onClear}>
            پاک کردن همه
          </Button>
          <Button className="min-h-11" onClick={onClose}>
            نمایش {toPersianDigits(resultCount)} محصول
          </Button>
        </div>
      </div>
    </div>
  );
}
