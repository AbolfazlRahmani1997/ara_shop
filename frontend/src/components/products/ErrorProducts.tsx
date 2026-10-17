import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ErrorProducts({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-line bg-white px-6 py-14 text-center">
      <AlertCircle className="mx-auto size-10 text-brand" aria-hidden />
      <h2 className="mt-4 text-lg font-extrabold text-ink">مشکلی پیش آمده</h2>
      <p className="mt-2 text-sm leading-7 text-muted">
        دریافت محصولات با مشکل مواجه شد.
      </p>
      <Button className="mt-5" onClick={onRetry}>
        تلاش مجدد
      </Button>
    </div>
  );
}
