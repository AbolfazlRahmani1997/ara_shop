"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (items.length === 0 && !submitted) {
    return (
      <div className="mx-auto max-w-[720px] px-4 py-16 text-center">
        <p className="text-xl font-extrabold text-ink">سبدی برای پرداخت نیست</p>
        <Link href="/products" className="mt-4 inline-block">
          <Button>بازگشت به فروشگاه</Button>
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-[720px] px-4 py-16 text-center">
        <p className="text-xs font-extrabold tracking-[0.16em] text-brand">
          SUCCESS
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-ink">
          سفارشت ثبت شد
        </h1>
        <p className="mt-3 text-sm leading-8 text-muted-strong">
          این نسخه دمو است؛ اتصال درگاه پرداخت واقعی به‌زودی اضافه می‌شود.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/products">
            <Button>ادامه خرید</Button>
          </Link>
          <Link href="/profile">
            <Button variant="secondary">پیگیری سفارش</Button>
          </Link>
        </div>
      </div>
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    // TODO: integrate checkout / payment API
    await new Promise((resolve) => setTimeout(resolve, 700));
    clear();
    setSubmitted(true);
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <PageHeader
        eyebrow="CHECKOUT"
        title="تکمیل سفارش"
        description="اطلاعات ارسال را وارد کن تا سفارشت ثبت شود."
      />

      <form
        onSubmit={onSubmit}
        className="grid gap-8 lg:grid-cols-[1fr_320px]"
      >
        <div className="space-y-4 rounded-2xl border border-line bg-white p-5 sm:p-6">
          <Field label="نام و نام خانوادگی" name="name" required />
          <Field label="شماره موبایل" name="phone" type="tel" required />
          <Field label="استان / شهر" name="city" required />
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-ink">آدرس</span>
            <textarea
              name="address"
              required
              rows={4}
              className="w-full rounded-xl border border-line bg-cream/40 px-3 py-3 text-sm outline-none focus:border-brand-muted focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <Field label="کد پستی" name="postal" />
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-white p-5">
          <h2 className="text-lg font-extrabold">خلاصه پرداخت</h2>
          <p className="mt-4 flex justify-between text-sm">
            <span className="text-muted">مبلغ سفارش</span>
            <span className="font-bold">{formatPrice(subtotal)}</span>
          </p>
          <p className="mt-2 flex justify-between text-sm">
            <span className="text-muted">ارسال</span>
            <span className="font-bold text-[#4E8A68]">رایگان</span>
          </p>
          <Button fullWidth size="lg" className="mt-5" disabled={loading}>
            {loading ? "در حال ثبت..." : "ثبت سفارش"}
          </Button>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="h-12 w-full rounded-xl border border-line bg-cream/40 px-3 text-sm outline-none focus:border-brand-muted focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}
