"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { toPersianDigits } from "@/lib/format";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPages(page, totalPages);

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-1.5"
      aria-label="صفحه‌بندی"
    >
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-line bg-white disabled:opacity-40"
        aria-label="صفحه قبل"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        <ChevronRight className="size-4" />
      </button>

      <div className="hidden items-center gap-1.5 sm:flex">
        {pages.map((item, index) =>
          item === "..." ? (
            <span key={`dots-${index}`} className="px-2 text-muted">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-current={item === page ? "page" : undefined}
              className={[
                "inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-sm font-bold transition",
                item === page
                  ? "bg-brand text-white"
                  : "border border-line bg-white text-ink hover:border-brand/30",
              ].join(" ")}
              onClick={() => onChange(item)}
            >
              {toPersianDigits(item)}
            </button>
          ),
        )}
      </div>

      <p className="min-w-16 text-center text-sm font-medium text-ink sm:hidden">
        {toPersianDigits(page)} / {toPersianDigits(totalPages)}
      </p>

      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-line bg-white disabled:opacity-40"
        aria-label="صفحه بعد"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        <ChevronLeft className="size-4" />
      </button>
    </nav>
  );
}

function buildPages(page: number, totalPages: number): Array<number | "..."> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (page <= 3) return [1, 2, 3, 4, "...", totalPages];
  if (page >= totalPages - 2) {
    return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "...", page - 1, page, page + 1, "...", totalPages];
}
