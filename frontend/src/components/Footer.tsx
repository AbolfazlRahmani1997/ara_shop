"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Headphones,
  Leaf,
  ShieldCheck,
  Truck,
} from "lucide-react";

const benefits = [
  {
    icon: Headphones,
    title: "مشاوره تخصصی",
    description: "راهنمایی زیبایی متناسب با پوست و نیاز تو",
  },
  {
    icon: Leaf,
    title: "محصولات اصل",
    description: "تضمین اصالت کالا از برندهای معتبر",
  },
  {
    icon: Truck,
    title: "ارسال سریع",
    description: "تحویل به‌موقع به سراسر ایران",
  },
];

const footerGroups = [
  {
    id: "shop",
    title: "فروشگاه",
    links: [
      { label: "محصولات", href: "/products" },
      { label: "برندها", href: "/brands" },
      { label: "روتین پوستی", href: "/ai-assistant" },
      { label: "مجله زیبایی", href: "/magazine" },
    ],
  },
  {
    id: "support",
    title: "پشتیبانی",
    links: [
      { label: "سوالات متداول", href: "/about#faq" },
      { label: "پیگیری سفارش", href: "/profile" },
      { label: "تماس با ما", href: "/about#contact" },
    ],
  },
  {
    id: "legal",
    title: "قوانین",
    links: [
      { label: "حریم خصوصی", href: "/about#privacy" },
      { label: "شرایط استفاده", href: "/about#terms" },
      { label: "ضمانت اصالت", href: "/about#authenticity" },
    ],
  },
];

export function Footer() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <footer className="mt-auto border-t border-line bg-white">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <ul className="grid gap-0 border-b border-line py-2 sm:grid-cols-3 sm:gap-6 sm:py-8">
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <li
              key={title}
              className={[
                "flex items-start gap-3 py-5",
                index < benefits.length - 1
                  ? "border-b border-line sm:border-b-0 sm:border-e sm:pe-6"
                  : "",
              ].join(" ")}
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-blush text-brand">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-bold text-ink">{title}</p>
                <p className="mt-1 text-sm leading-7 text-muted">{description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="py-6 sm:py-10">
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-2xl font-extrabold text-ink">آرا</p>
              <p className="mt-1 text-sm text-muted">زیبایی، متناسب با تو</p>
            </div>
            <p className="inline-flex items-center gap-2 text-sm text-muted">
              <ShieldCheck className="size-4 text-brand" aria-hidden />
              خرید امن با ضمانت اصالت کالا
            </p>
          </div>

          <div className="sm:hidden">
            {footerGroups.map((group) => {
              const isOpen = openGroup === group.id;
              return (
                <div key={group.id} className="border-b border-line">
                  <button
                    type="button"
                    className="flex min-h-12 w-full items-center justify-between py-3 text-sm font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenGroup((current) =>
                        current === group.id ? null : group.id,
                      )
                    }
                  >
                    {group.title}
                    <ChevronDown
                      className={`size-4 transition ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {isOpen ? (
                    <ul className="space-y-2 pb-4">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="inline-flex min-h-11 items-center text-sm text-muted transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="hidden gap-10 sm:grid sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.id}>
                <p className="text-sm font-bold text-ink">{group.title}</p>
                <ul className="mt-4 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-line py-6 text-center text-xs text-muted sm:text-sm">
          © آرا — زیبایی، متناسب با تو
        </div>
      </div>
    </footer>
  );
}
