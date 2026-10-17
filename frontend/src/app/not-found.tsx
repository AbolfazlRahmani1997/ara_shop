import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-xs font-extrabold tracking-[0.16em] text-brand">404</p>
      <h1 className="mt-3 text-3xl font-extrabold text-ink">صفحه پیدا نشد</h1>
      <p className="mt-3 text-sm text-muted">
        این مسیر وجود ندارد یا جابه‌جا شده است.
      </p>
      <Link href="/" className="mt-6 inline-block">
        <Button>بازگشت به خانه</Button>
      </Link>
    </div>
  );
}
