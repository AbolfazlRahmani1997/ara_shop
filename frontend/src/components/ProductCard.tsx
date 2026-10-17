"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, formatRating, toPersianDigits } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/context/ToastContext";

type ProductCardProps = {
  product: Product;
  layout?: "grid" | "list";
};

export function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  function handleAdd() {
    if (!product.inStock) return;
    addItem(product.id);
    showToast("محصول به سبد خرید اضافه شد");
  }

  const isList = layout === "list";

  return (
    <article
      className={[
        "group flex overflow-hidden rounded-[16px] border border-[#EDE5E3] bg-white transition duration-200 ease-out sm:rounded-[20px]",
        "hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-[0_10px_24px_rgba(25,23,23,0.06)]",
        "focus-within:ring-2 focus-within:ring-brand/30",
        isList ? "flex-row gap-3 p-3 sm:gap-4 sm:p-4" : "flex-col p-2.5 sm:p-3",
      ].join(" ")}
    >
      <div
        className={[
          "relative overflow-hidden rounded-[14px] bg-[#FBF8F6]",
          isList
            ? "h-28 w-28 shrink-0 sm:h-36 sm:w-36"
            : "aspect-square w-full",
        ].join(" ")}
      >
        <Link href={product.href} className="block size-full">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.title}
              className="size-full object-cover transition duration-200 group-hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <div className="flex size-full items-center justify-center px-3 text-center text-[11px] font-extrabold tracking-wide text-muted sm:text-sm">
              {product.imageLabel}
            </div>
          )}
        </Link>

        <button
          type="button"
          className="absolute top-2 left-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/95 text-ink shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          aria-label={
            wishlisted
              ? `حذف ${product.title} از علاقه‌مندی‌ها`
              : `افزودن ${product.title} به علاقه‌مندی‌ها`
          }
          aria-pressed={wishlisted}
          onClick={() => toggle(product.id)}
        >
          <Heart
            className={`size-4 transition ${wishlisted ? "fill-brand text-brand" : ""}`}
          />
        </button>

        {product.discount ? (
          <span className="absolute top-2 right-2 rounded-full bg-brand px-2 py-1 text-[10px] font-bold text-white">
            ٪{toPersianDigits(product.discount)}-
          </span>
        ) : null}

        {!product.inStock ? (
          <span className="absolute bottom-2 right-2 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-bold text-white">
            ناموجود
          </span>
        ) : null}
      </div>

      <div className={`flex min-w-0 flex-1 flex-col ${isList ? "gap-1.5" : "mt-3 gap-1"}`}>
        <p className="text-[11px] font-medium text-muted sm:text-xs">
          {product.brand}
        </p>
        <h3 className="line-clamp-2 text-sm font-bold leading-6 text-ink sm:text-[15px]">
          <Link
            href={product.href}
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            {product.title}
          </Link>
        </h3>

        <p className="inline-flex items-center gap-1 text-xs text-muted">
          <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
          <span>{formatRating(product.rating)}</span>
          <span>({toPersianDigits(product.reviewCount)})</span>
        </p>

        <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-1">
          <p className="text-sm font-extrabold text-brand sm:text-base">
            {formatPrice(product.price)}
          </p>
          {product.compareAtPrice ? (
            <p className="text-xs text-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </p>
          ) : null}
        </div>

        <Button
          size="sm"
          className="mt-2 w-full text-xs sm:text-sm"
          disabled={!product.inStock}
          onClick={handleAdd}
        >
          <ShoppingBag className="size-4" aria-hidden />
          {product.inStock ? "افزودن به سبد" : "ناموجود"}
        </Button>
      </div>
    </article>
  );
}
