import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "حساب کاربری",
};

const links = [
  { href: "/cart", label: "سبد خرید" },
  { href: "/wishlist", label: "علاقه‌مندی‌ها" },
  { href: "/ai-assistant", label: "مشاوره زیبایی" },
  { href: "/products", label: "ادامه خرید" },
];

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <PageHeader
        eyebrow="PROFILE"
        title="حساب کاربری"
        description="این نسخه دمو است؛ پروفایل واقعی بعد از اتصال احراز هویت فعال می‌شود."
      />

      <div className="rounded-2xl border border-line bg-white p-6">
        <p className="text-lg font-extrabold text-ink">کاربر آرا</p>
        <p className="mt-1 text-sm text-muted">hello@ara.beauty</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="secondary" fullWidth>
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-cream p-4">
          <p className="text-sm font-bold text-ink">سفارش‌های اخیر</p>
          <p className="mt-2 text-sm text-muted">
            هنوز سفارشی ثبت نشده. از فروشگاه شروع کن.
          </p>
        </div>
      </div>
    </div>
  );
}
