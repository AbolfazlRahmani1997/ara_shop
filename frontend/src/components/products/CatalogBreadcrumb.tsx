import Link from "next/link";
import { categoryHeroCopy } from "@/data/filters";

type BreadcrumbProps = {
  category?: string;
};

export function CatalogBreadcrumb({ category }: BreadcrumbProps) {
  const label =
    category && categoryHeroCopy[category]
      ? categoryHeroCopy[category].title
      : null;

  return (
    <nav
      aria-label="مسیر صفحه"
      className="mb-4 text-xs text-muted sm:mb-5 sm:text-sm"
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-brand">
            خانه
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li>
          <Link href="/products" className="hover:text-brand">
            محصولات
          </Link>
        </li>
        {label ? (
          <>
            <li aria-hidden>/</li>
            <li className="text-ink">{label}</li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}
