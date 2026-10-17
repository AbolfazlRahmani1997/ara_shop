import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { articles } from "@/data/articles";
import { toPersianDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "مجله زیبایی",
};

export default function MagazinePage() {
  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <PageHeader
        eyebrow="MAGAZINE"
        title="مجله زیبایی آرا"
        description="راهنماها و ایده‌هایی برای روتین پوستی، آرایش و انتخاب محصول."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/magazine/${article.slug}`}
            className="overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(25,23,23,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <div
              className={`flex h-40 items-end p-5 text-sm font-bold text-ink/70 ${article.coverTone}`}
            >
              {article.category}
            </div>
            <div className="p-5">
              <h2 className="text-lg font-extrabold leading-8 text-ink">
                {article.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-strong">
                {article.excerpt}
              </p>
              <p className="mt-4 text-xs text-muted">
                {toPersianDigits(article.readMinutes)} دقیقه مطالعه
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
