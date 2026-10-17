"use client";

import { skincareSubcategories } from "@/data/filters";
import { toPersianDigits } from "@/lib/format";

type CategoryQuickFiltersProps = {
  active?: string;
  counts: Map<string, number>;
  onSelect: (subcategory: string) => void;
  visible?: boolean;
};

export function CategoryQuickFilters({
  active = "",
  counts,
  onSelect,
  visible = true,
}: CategoryQuickFiltersProps) {
  if (!visible) return null;

  return (
    <div className="mb-5 flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mb-6 sm:gap-3 [&::-webkit-scrollbar]:hidden">
      <QuickChip
        label="همه"
        active={!active}
        count={[...counts.values()].reduce((a, b) => a + b, 0)}
        onClick={() => onSelect("")}
      />
      {skincareSubcategories.map((item) => (
        <QuickChip
          key={item.id}
          label={item.title}
          active={active === item.id}
          count={counts.get(item.id) ?? 0}
          onClick={() => onSelect(item.id)}
        />
      ))}
    </div>
  );
}

function QuickChip({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "min-h-11 shrink-0 rounded-2xl border px-3.5 text-sm transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
        active
          ? "border-brand bg-[#F9DDE5] text-brand-dark"
          : "border-line bg-white text-ink hover:border-brand/30",
      ].join(" ")}
    >
      <span className="font-bold">{label}</span>
      <span className="mr-1.5 text-xs text-muted">
        ({toPersianDigits(count)})
      </span>
    </button>
  );
}
