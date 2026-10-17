import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/data/articles";
import { Button } from "@/components/ui/Button";
import { toPersianDigits } from "@/lib/format";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return {
    title: article?.title ?? "مقاله",
    description: article?.excerpt,
  };
}

export default async function MagazineArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/magazine" className="hover:text-brand">
          مجله زیبایی
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{article.category}</span>
      </nav>

      <div
        className={`mb-8 flex h-48 items-end rounded-[24px] p-6 text-sm font-bold text-ink/70 ${article.coverTone}`}
      >
        {article.category}
      </div>

      <p className="text-xs text-muted">
        {toPersianDigits(article.readMinutes)} دقیقه مطالعه
      </p>
      <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
        {article.title}
      </h1>
      <p className="mt-5 text-base leading-9 text-muted-strong">
        {article.excerpt}
      </p>

      <div className="prose-ara mt-8 space-y-4 text-sm leading-8 text-ink sm:text-base sm:leading-9">
        <p>
          در آرا باور داریم زیبایی شخصی است. این مطلب یک راهنمای کلی برای شروع
          بهتر انتخاب محصول است و جایگزین تشخیص پوستی تخصصی نیست.
        </p>
        <p>
          اگر نمی‌دانی از کجا شروع کنی، دستیار زیبایی آرا با چند سؤال ساده
          پیشنهادهای متناسب با نوع پوست، بودجه و اولویت‌هایت را آماده می‌کند.
        </p>
        <p>
          برای نتیجه بهتر، روتین را ساده نگه دار: پاک‌سازی، آبرسانی، ضدآفتاب در
          روز و یک محصول فعال در شب.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/ai-assistant">
          <Button>شروع مشاوره رایگان</Button>
        </Link>
        <Link href="/products">
          <Button variant="secondary">مشاهده محصولات</Button>
        </Link>
      </div>
    </article>
  );
}
