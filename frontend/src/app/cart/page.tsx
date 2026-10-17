"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import { formatPrice, toPersianDigits } from "@/lib/format";

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem, clear } = useCart();

  const lines = items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean) as Array<{
    productId: string;
    quantity: number;
    product: NonNullable<ReturnType<typeof getProductById>>;
  }>;

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <PageHeader
        eyebrow="CART"
        title="سبد خرید"
        description="محصولات انتخابی‌ات را قبل از پرداخت مرور کن."
        actions={
          lines.length > 0 ? (
            <Button variant="ghost" onClick={clear}>
              خالی کردن سبد
            </Button>
          ) : null
        }
      />

      {lines.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <p className="font-bold text-ink">سبد خرید خالی است</p>
          <Link href="/products" className="mt-4 inline-block">
            <Button>مشاهده محصولات</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="space-y-4">
            {lines.map(({ product, quantity, productId }) => (
              <li
                key={productId}
                className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 sm:flex-row sm:items-center"
              >
                <div className="flex h-24 w-full items-center justify-center rounded-xl bg-[#f7f1ee] text-xs font-extrabold text-muted sm:w-28">
                  {product.imageLabel}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted">{product.brand}</p>
                  <Link
                    href={product.href}
                    className="font-bold text-ink hover:text-brand"
                  >
                    {product.title}
                  </Link>
                  <p className="mt-1 text-sm font-extrabold text-brand">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center rounded-xl border border-line">
                    <button
                      type="button"
                      className="inline-flex min-h-11 min-w-11 items-center justify-center"
                      aria-label="کاهش"
                      onClick={() => setQuantity(productId, quantity - 1)}
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-bold">
                      {toPersianDigits(quantity)}
                    </span>
                    <button
                      type="button"
                      className="inline-flex min-h-11 min-w-11 items-center justify-center"
                      aria-label="افزایش"
                      onClick={() => setQuantity(productId, quantity + 1)}
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-muted hover:bg-cream hover:text-brand"
                    aria-label="حذف"
                    onClick={() => removeItem(productId)}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border border-line bg-white p-5">
            <h2 className="text-lg font-extrabold text-ink">خلاصه سفارش</h2>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted">جمع جزء</span>
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted">هزینه ارسال</span>
              <span className="font-bold text-success">رایگان</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="font-bold">مبلغ قابل پرداخت</span>
              <span className="text-lg font-extrabold text-brand">
                {formatPrice(subtotal)}
              </span>
            </div>
            <Link href="/checkout" className="mt-5 block">
              <Button fullWidth size="lg">
                ادامه خرید
              </Button>
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
