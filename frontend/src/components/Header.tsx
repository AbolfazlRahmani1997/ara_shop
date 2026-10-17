"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { navItems } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

export function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuId = useId();
  const router = useRouter();
  const { itemCount } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center gap-3 px-4 sm:h-[78px] sm:gap-5 sm:px-6 lg:px-8">
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-ink transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link
          href="/"
          className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          <span className="block text-[23px] font-extrabold leading-none tracking-tight text-ink sm:text-[27px]">
            آرا
          </span>
          <span className="mt-0.5 block text-center text-[8px] font-bold tracking-[0.35em] text-ink/55">
            ARA
          </span>
        </Link>

        <nav
          className="mr-2 hidden items-center gap-6 text-sm text-ink/80 lg:flex"
          aria-label="منوی اصلی"
        >
          {navItems.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="rounded-md transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form
          onSubmit={submitSearch}
          className="mx-auto hidden min-w-0 flex-1 max-w-xl xl:block"
        >
          <label className="relative block">
            <span className="sr-only">جستجو</span>
            <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="جستجوی محصول، برند یا نیاز پوستی..."
              className="h-11 w-full rounded-full border border-line bg-cream/70 pr-10 pl-4 text-sm text-ink placeholder:text-muted outline-none transition focus:border-brand-muted focus:bg-white focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </form>

        <div className="ms-auto flex items-center gap-1 sm:gap-2">
          <Link
            href="/search"
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-xl text-ink transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:inline-flex xl:hidden"
            aria-label="جستجو"
          >
            <Search className="size-5" />
          </Link>

          <Link
            href="/wishlist"
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-xl text-ink transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:inline-flex"
            aria-label="علاقه‌مندی‌ها"
          >
            <Heart className="size-5" />
          </Link>

          <Link
            href="/cart"
            className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-ink transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            aria-label="سبد خرید"
          >
            <ShoppingBag className="size-5" />
            {itemCount > 0 ? (
              <span className="absolute top-1 left-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                {itemCount > 9 ? "۹+" : itemCount}
              </span>
            ) : null}
          </Link>

          <Link href="/login" className="hidden sm:inline-flex">
            <Button variant="secondary" size="sm" className="rounded-full">
              <UserRound className="size-4" />
              ورود / ثبت‌نام
            </Button>
          </Link>
        </div>
      </div>

      {open ? (
        <div
          id={menuId}
          className="border-t border-line bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="منوی موبایل"
        >
          <div className="mx-auto max-w-[1360px] space-y-4 px-4 py-5 sm:px-6">
            <form onSubmit={submitSearch}>
              <label className="relative block">
                <span className="sr-only">جستجو</span>
                <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="جستجوی محصول، برند یا نیاز پوستی..."
                  className="h-12 w-full rounded-full border border-line bg-cream/70 pr-10 pl-4 text-sm outline-none focus:border-brand-muted focus:ring-2 focus:ring-brand/20"
                />
              </label>
            </form>

            <nav className="flex flex-col gap-1" aria-label="منوی موبایل">
              {navItems.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-base text-ink transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="grid gap-2 pt-1">
              <Link href="/wishlist" onClick={() => setOpen(false)}>
                <Button variant="secondary" fullWidth>
                  <Heart className="size-4" />
                  علاقه‌مندی‌ها
                </Button>
              </Link>
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button fullWidth>
                  <UserRound className="size-4" />
                  ورود / ثبت‌نام
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
