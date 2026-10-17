import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyProducts({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-14 text-center">
      <PackageSearch className="mx-auto size-10 text-muted" aria-hidden />
      <h2 className="mt-4 text-lg font-extrabold text-ink">محصولی پیدا نشد</h2>
      <p className="mt-2 text-sm leading-7 text-muted">
        فیلترهای خود را تغییر دهید یا همه فیلترها را پاک کنید.
      </p>
      <Button className="mt-5" onClick={onClear}>
        پاک کردن فیلترها
      </Button>
    </div>
  );
}
