"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Leaf,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import type { Product } from "@/types";
import { products } from "@/data/products";
import { formatPrice, formatRating, toPersianDigits } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const related = useMemo(
    () =>
      products
        .filter(
          (item) => item.category === product.category && item.id !== product.id,
        )
        .slice(0, 4),
    [product],
  );

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <nav className="mb-6 text-sm text-muted" aria-label="مسیر صفحه">
        <Link href="/" className="hover:text-brand">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-brand">
          محصولات
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative overflow-hidden rounded-[24px] bg-[#FBF8F6]">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.title}
              className="aspect-square w-full object-cover sm:min-h-[480px]"
            />
          ) : (
            <div className="flex min-h-[320px] items-center justify-center text-2xl font-extrabold tracking-wide text-muted sm:min-h-[480px]">
              {product.imageLabel}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-muted">{product.brand}</p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            {product.title}
          </h1>

          <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted">
            <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
            {formatRating(product.rating)}
            <span>({toPersianDigits(product.reviewCount)} نظر)</span>
          </p>

          <div className="mt-5 flex items-baseline gap-3">
            <p className="text-2xl font-extrabold text-brand">
              {formatPrice(product.price)}
            </p>
            {product.compareAtPrice ? (
              <p className="text-sm text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            ) : null}
          </div>

          <p className="mt-5 text-sm leading-8 text-muted-strong sm:text-base sm:leading-9">
            {product.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blush px-3 py-1 text-xs font-medium text-brand-dark"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-xl border border-line bg-white">
              <button
                type="button"
                className="inline-flex min-h-12 min-w-12 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                aria-label="کاهش تعداد"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                <Minus className="size-4" />
              </button>
              <span className="min-w-10 text-center font-bold">
                {toPersianDigits(quantity)}
              </span>
              <button
                type="button"
                className="inline-flex min-h-12 min-w-12 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                aria-label="افزایش تعداد"
                onClick={() => setQuantity((value) => value + 1)}
              >
                <Plus className="size-4" />
              </button>
            </div>

            <Button
              size="lg"
              disabled={!product.inStock}
              onClick={() => addItem(product.id, quantity)}
              className="flex-1 sm:flex-none"
            >
              <ShoppingBag className="size-4" />
              {product.inStock ? "افزودن به سبد" : "ناموجود"}
            </Button>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Leaf, text: "ضمانت اصالت" },
              { icon: Truck, text: "ارسال سریع" },
              { icon: ShieldCheck, text: "پرداخت امن" },
            ].map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-3 text-sm"
              >
                <Icon className="size-4 text-brand" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="text-lg font-extrabold text-ink">مزایا</h2>
          <ul className="mt-4 space-y-2 text-sm leading-8 text-muted-strong">
            {product.benefits.map((benefit) => (
              <li key={benefit}>• {benefit}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="text-lg font-extrabold text-ink">ترکیبات کلیدی</h2>
          <ul className="mt-4 space-y-2 text-sm leading-8 text-muted-strong">
            {product.ingredients.map((ingredient) => (
              <li key={ingredient}>• {ingredient}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">
            این اطلاعات جنبه آموزشی دارد و جایگزین تشخیص پزشکی نیست.
          </p>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-extrabold text-ink">محصولات مرتبط</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="sticky bottom-0 z-20 -mx-4 mt-10 border-t border-line bg-white/95 px-4 py-3 backdrop-blur sm:hidden">
        <Button
          fullWidth
          size="lg"
          disabled={!product.inStock}
          onClick={() => addItem(product.id, quantity)}
        >
          <ShoppingBag className="size-4" />
          {product.inStock
            ? `افزودن · ${formatPrice(product.price)}`
            : "ناموجود"}
        </Button>
      </div>
    </div>
  );
}
