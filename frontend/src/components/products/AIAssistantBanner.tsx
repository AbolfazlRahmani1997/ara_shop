import Link from "next/link";
import { Sparkles } from "lucide-react";

export function AIAssistantBanner() {
  return (
    <section className="mt-10 overflow-hidden rounded-[24px] border border-[#f0ddd8] bg-[linear-gradient(100deg,#f8e7e5,#fff9f7)] sm:mt-12">
      <div className="grid items-center gap-6 px-5 py-6 sm:grid-cols-[1fr_160px] sm:gap-8 sm:px-8 sm:py-8">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-brand">
            مشاوره زیبایی آرا
          </p>
          <h2 className="mt-2 text-xl font-extrabold text-ink sm:text-2xl">
            روتین پوستی متناسب با نیاز شما
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-7 text-muted-strong">
            با هوش مصنوعی آرا، بهترین محصولات را برای نوع پوست خود پیدا کنید.
          </p>
          <Link
            href="/ai-assistant"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-5 text-sm font-medium text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            شروع مشاوره رایگان
            <Sparkles className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mx-auto hidden w-[120px] sm:block">
          <div className="h-[180px] rounded-[22px] border-8 border-ink bg-white p-2 shadow-[0_12px_28px_rgba(0,0,0,0.1)] motion-safe:rotate-[-4deg]">
            <div className="rounded-xl bg-[#f9ecea] p-2.5 text-[10px] leading-5 text-ink">
              نوع پوستت چیه؟
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="rounded-full bg-brand px-2 py-0.5 text-white">
                  چرب
                </span>
                <span className="rounded-full bg-white px-2 py-0.5">خشک</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
