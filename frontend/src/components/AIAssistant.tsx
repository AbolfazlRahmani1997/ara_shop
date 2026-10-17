import Link from "next/link";
import { Sparkles } from "lucide-react";

const skinTypes = ["چرب", "خشک", "مختلط", "حساس"] as const;

export function AIAssistant() {
  return (
    <section
      id="ai-assistant"
      className="mx-auto max-w-[1360px] px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-[70px]"
      aria-labelledby="ai-heading"
    >
      <div className="grid items-center gap-8 rounded-[26px] bg-[linear-gradient(100deg,#f8e7e5,#fff9f7)] px-5 py-8 sm:gap-10 sm:px-10 sm:py-12 lg:grid-cols-[280px_1fr] lg:gap-[70px] lg:px-[7%] lg:py-14">
        <div className="mx-auto w-[135px] sm:w-[175px]">
          <div className="relative h-[230px] rounded-[28px] border-8 border-ink bg-white px-2.5 pt-14 pb-2.5 shadow-[0_20px_45px_rgba(0,0,0,0.12)] motion-safe:rotate-[-5deg] sm:h-[310px] sm:pt-[70px]">
            <div className="absolute top-3 left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-ink/80" />
            <div className="rounded-2xl bg-[#f9ecea] p-3.5 text-[11px] leading-7 text-ink">
              <p>سلام! نوع پوستت چیه؟</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {skinTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-full bg-white px-2.5 py-1 text-[10px] text-ink/70"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center lg:text-right">
          <p className="text-xs font-extrabold tracking-[0.18em] text-brand">
            AI POWERED
          </p>
          <h2
            id="ai-heading"
            className="mt-3 text-[28px] font-extrabold text-ink sm:text-[42px]"
          >
            دستیار زیبایی آرا
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-8 text-muted-strong sm:text-[17px] sm:leading-9 lg:mx-0">
            با چند سؤال ساده، نوع پوست، نیازهای زیبایی و بودجه‌ات را بررسی می‌کنیم
            و محصولات مناسب را پیشنهاد می‌دهیم.
          </p>

          <div className="mt-6 flex justify-center lg:justify-start">
            <Link
              href="/ai-assistant"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-medium text-white shadow-[0_10px_28px_rgba(208,68,99,0.22)] transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2"
            >
              شروع مشاوره رایگان
              <Sparkles className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
